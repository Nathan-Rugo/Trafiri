// Simple server to handle user registration, login, password reset, and contact form submission
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const caPath = path.join(__dirname, 'ca.pem');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: fs.existsSync(caPath) ? { ca: fs.readFileSync(caPath) } : false,
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('MySQL connected...');
});

app.post('/register', async (req, res) => {
    // Register user on the platform and send a confirmation email to the user
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Check if email already exists in database
        const sql1 = 'SELECT * FROM users WHERE email = ?';
        db.query(sql1, [email], (err, results) => {
            if (err) {
                console.error('Error checking user:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            // If email exists, return an error message
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            // Insert user into database if email does not exist
            const sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
            db.query(sql, [firstName, lastName, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
                res.json({ message: 'You are Registered. Check email' });

                // Send a thank you email to the user who registered on the platform
                const transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                // Send email to user confirming registration
                transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Thank you for registering!',
                    text: `Dear ${firstName}${lastName},\n\nThank you for registering on our platform. We're excited to have you with us.\n\nBest regards,\nYour Team`
                }, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });
            });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint to fetch places
app.get('/places', (req, res) => {
    // Fetch places from the database based on the activity selected by the user 
    const { activity } = req.query;
    let query = 'SELECT * FROM places WHERE placeActivities LIKE ? OR placesDesc LIKE ?';
    const params = [`%${activity}%`, `%${activity}%`];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching the places');
        } else {
            res.status(200).json(results);
        }
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are provided in the request
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ success: false, error: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
        // Check if password is correct
        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        // Update last login time for user in database
        const updateSql = 'UPDATE users SET last_login = NOW() WHERE email = ?';
        db.query(updateSql, [email], (err) => {
            if (err) {
                console.error('Error updating last login:', err);
                return res.status(500).json({ success: false, error: 'Server error' });
            }

            res.json({ success: true, message: 'User logged in', user });
        });
    });
});


app.post('/contact/send', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!email || !name || !subject || !message) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    // Send email
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // Send email to support team
    try {
        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        });
        // Send confirmation email to user who contacted support
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting us!',
            text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message:\n\n${subject}\n\n${message}\n\nWe will get back to you shortly.\n\nBest regards,\nYour Support Team`
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
    }
});

app.post('/reset', async (req, res) => {
    // Reset password for user
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Update password in database
        const sql = 'UPDATE users SET password = ? WHERE email = ?';
        db.query(sql, [hashedPassword, email], (err, result) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Email not found' });
            }
            
            res.json({ message: 'Password reset successful' });

            // Send confirmation email
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                },
                debug: true, // show debug output
                logger: true // log information in console
            });
            // Send email to user confirming new password
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset Successful',
                text: `Dear user,\n\nYour password has been successfully reset. You can now log in with your new password.\n\nBest regards,\nYour Team`
            }, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        });

    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/review', (req, res) => {
    const { name, email, destination, rating, review } = req.body;

    const query = 'UPDATE places SET placeReviewScore = ?, placesReview = ?, reviewerName = ?, reviewerEmail = ? WHERE placeName = ?';
    db.query(query, [rating, review, name, email, destination], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving the review');
        } else {
            res.status(200).send('Review saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


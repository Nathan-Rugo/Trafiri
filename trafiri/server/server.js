const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'c0l@nd3r',
    database: 'db_trafiri'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('MySQL connected...');
});

// Endpoint to register a new user
app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [firstName, lastName, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ message: 'User registered' });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint to authenticate user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Retrieve user from database based on email
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ success: false, error: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        res.json({ success: true, message: 'User logged in' });
    });
});

// Endpoint to handle contact form submissions
app.post('/contact/send', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate email and other fields here
    if (!email || !name || !subject || !message) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Create a nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'infotrafiri@gmail.com',
            pass: 'czxa krwv gyve gvpa'
        },
        tls: {
            rejectUnauthorized: false // Add this option to allow insecure TLS connections
        }
    });

    try {
        // Send email to your support team
        await transporter.sendMail({
            from: email,
            to: 'infotrafiri@gmail.com',
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        });

        // Send thank you email to the user
        await transporter.sendMail({
            from: 'infotrafiri@gmail.com',
            to: email,
            subject: 'Thank you for contacting us!',
            text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message:\n\n${subject}\n\n${message}\n\nWe will get back to you shortly.\n\nBest regards,\n\nYour Support Team`
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

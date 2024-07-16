import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [responseClass, setResponseClass] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make sure your server endpoint matches the URL here
            const response = await axios.post('http://localhost:3001/contact/send', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other required headers here
                }
            });

            if (response.data.success) {
                setResponseMessage('Message sent successfully!');
                setResponseClass('success');
            } else {
                setResponseMessage('Failed to send message.');
                setResponseClass('error');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setResponseMessage('Failed to send message.');
            setResponseClass('error');
        }
    };

    return (
        <div>
            <section className="contact">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you! Please fill out the form below to get in touch with us.</p>
                {responseMessage && (
                    <div className={`message ${responseClass}`}>
                        {responseMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </section>
        </div>
    );
};

export default Contact;

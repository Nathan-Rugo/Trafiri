import React, { useState } from "react";
import axios from "axios";
import arrowIcon from "../assets/Arrow icon.jpeg"; // Adjust the path as per your project structure

const Review = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [destination, setDestination] = useState('');
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/review', {
                name,
                email,
                destination,
                rating,
                review
            });
            if (response.status === 200) {
                alert("Review submitted successfully!");
                // Clear form fields after successful submission
                setName('');
                setEmail('');
                setDestination('');
                setRating(5);
                setReview('');
            }
        } catch (error) {
            console.error("There was an error submitting the review!", error);
            alert("Error submitting review. Please try again.");
        }
    };

    return (
        <div className="review container">
            <div className="fields">
                <form onSubmit={handleSubmit} className="review-left">
                    <div className="review-left-title">
                        <h2>Give your review</h2>
                        <hr />
                    </div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="review-inputs" required />
                    
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="review-inputs" required />

                    <label htmlFor="destination">Destination</label>
                    <input type="text" id="destination" name="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Place you visited" className="review-inputs" required />
                    
                    <label htmlFor="rating">Rating</label>
                    <select id="rating" name="rating" value={rating} onChange={(e) => setRating(e.target.value)} className="review-inputs" required>
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Poor</option>
                    </select>
                    
                    <label htmlFor="review">Review</label>
                    <textarea name="review" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write your review here" className="review-inputs" required></textarea>
                    
                    <button type="submit" className="submit-button">
                        Submit <img src={arrowIcon} alt="An arrow icon" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Review;

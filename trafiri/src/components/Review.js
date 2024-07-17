// Review component to take review from the user and submit it to the server for storage and display on the website
import React from "react";
import arrowIcon from "../assets/Arrow icon.jpeg"; // Adjust the path as per your project structure

const Review = () => {
    return (
        <div className="review container">
            <div className="fields">
                <form action="" method="post" className="review-left">
                    <div className="review-left-title">
                        <h2>Give your review</h2>
                        <hr />
                    </div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="Your name" className="review-inputs" required />
                    
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Your email" className="review-inputs" required />

                    <label htmlFor="destination">Destination</label>
                    <input type="text" id="destination" name="destination" placeholder="Place you visited" className="review-inputs" required />
                    
                    <label htmlFor="rating">Rating</label>
                    <select id="rating" name="rating" className="review-inputs" required>
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Poor</option>
                    </select>
                    
                    <label htmlFor="review">Review</label>
                    <textarea placeholder="Write your review here" className="review-inputs" required></textarea>
                    
                    <button type="submit" className="submit-button">
                        Submit <img src={arrowIcon} alt="An arrow icon" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Review;

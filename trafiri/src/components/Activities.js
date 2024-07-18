// Activities component to display the activities available for users to explore in the application and the places associated with each activity.
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Golf from '../assets/golf.jpeg';
import Cycling from '../assets/cycling.jpeg';
import Climbing from '../assets/Mountain Climbing.jpg';
import History from '../assets/history.jpg';
import AnimalSiteSeeing from '../assets/animalsiteseeing.jpg';
import NatureTrail from '../assets/olooluaNatureTrail.jpeg';
import Swimming from '../assets/swimming.jpg';
import Hiking from '../assets/Hiking.jpg';
import Picnicking from '../assets/Picnicking.jpg';

const Activities = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [places, setPlaces] = useState([]);
    const placesRef = useRef(null);

    const activities = [
        { name: 'Swimming', image: Swimming },
        { name: 'Hiking', image: Hiking },
        { name: 'Picnicking', image: Picnicking },
        { name: 'Trail Running', image: NatureTrail },
        { name: 'Animal Watching', image: AnimalSiteSeeing },
        { name: 'History and Culture Learning', image: History },
        { name: 'Mountain Climbing', image: Climbing },
        { name: 'Cycling', image: Cycling },
        { name: 'Golfing', image: Golf }
    ];

    const handleActivityClick = async (activityName) => {
        try {
            const response = await axios.get(`http://localhost:3001/places?activity=${activityName}`);
            setPlaces(response.data);
            setSelectedActivity(activityName);

            // Scroll to the places container
            if (placesRef.current) {
                placesRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };

    return (
        // Display the activities and places associated with each activity on the page.
        // When a card is clicked the places associated with the activity are displayed above the activities grid.
        <div className="activities-container">
            <h2 className="title">Activities</h2>
            {selectedActivity && (
                <div className="selected-places" ref={placesRef}>
                    <h2>Places for {selectedActivity}</h2>
                    <div className="places-grid">
                        {places.map(place => (
                            <div key={place.placeName} className="places-card">
                                <img src={require(`../assets/${place.image_url}`)} alt={place.placeName} />
                                <h3>{place.placeName}</h3>
                                <p>{place.placePrice}</p>
                                <p>Activities: {place.placeActivities}</p>
                                <p>Description: {place.placesDesc}</p>
                                {place.placesReview && (
                                    <div className="review-section">
                                        <h4>Reviews:</h4>
                                        <p>{place.placesReview}</p>
                                        <small>Reviewer: {place.reviewerName} ({place.reviewerEmail})</small>
                                        <p>Rating: {place.placeReviewScore}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="activities-grid">
                {activities.map(activity => (
                    <div key={activity.name} className="card" onClick={() => handleActivityClick(activity.name)}>
                        <img src={activity.image} alt={activity.name} />
                        <h1>{activity.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Activities;

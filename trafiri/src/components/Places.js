import React, { useState, useEffect } from "react";
import axios from "axios";

const Places = () => {
  const [places, setPlaces] = useState([]);
  const activityName = ''; // to make sure all places are fetched

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/places?activity=${activityName}`);
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching the places data!", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <section className="container">
      {places.map((place) => (
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
    </section>
  );
};

export default Places;

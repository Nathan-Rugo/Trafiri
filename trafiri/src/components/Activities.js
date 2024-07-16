import React from 'react';
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
    return (
        <div className="activities-container">
            <h2 className="title">Activities</h2>
            <div className="activities-grid">
                <div className="card">
                    <img src={Swimming} alt="Swimming" />
                    <h1>Swimming</h1>
                </div>
                <div className="card">
                    <img src={Hiking} alt="Hiking" />
                    <h1>Hiking</h1>
                </div>
                <div className="card">
                    <img src={Picnicking} alt="Picnicking" />
                    <h1>Picnicking</h1>
                </div>
                <div className="card">
                    <img src={NatureTrail} alt="Trail Running" />
                    <h1>Trail Running</h1>
                </div>
                <div className="card">
                    <img src={AnimalSiteSeeing} alt="Animal Watching" />
                    <h1>Animal Watching</h1>
                </div>
                <div className="card">
                    <img src={History} alt="History and Culture Learning" />
                    <h1>History and Culture Learning</h1>
                </div>
                <div className="card">
                    <img src={Climbing} alt="Mountain Climbing" />
                    <h1>Mountain Climbing</h1>
                </div>
                <div className="card">
                    <img src={Cycling} alt="Cycling" />
                    <h1>Cycling</h1>
                </div>
                <div className="card">
                    <img src={Golf} alt="Golfing" />
                    <h1>Golfing</h1>
                </div>
            </div>
        </div>
    );
};

export default Activities;

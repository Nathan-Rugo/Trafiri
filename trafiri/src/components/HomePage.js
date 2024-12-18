// Home Page Component in React Application with Trafiri Branding and Images of Popular Destinations and Activities in Kenya 
import React from 'react';
import VideoBackground from '../assets/video.mp4';
import Karura from '../assets/karura.jpeg';
import NationalPark from '../assets/nnp.jpg';
import NatureTrail from '../assets/olooluaNatureTrail.jpeg';
import Swimming from '../assets/swimming.jpg';
import Hiking from '../assets/Hiking.jpg';
import Picnicking from '../assets/Picnicking.jpg';


const HomePage = () => {
    return (
        // Home page with video background and featured destinations and activities
        <div>                
            <section className="welcome">  
                <video autoPlay muted loop playsInline className="video">
                    <source src={VideoBackground} type='video/mp4' />
                </video>
                <h1>Welcome to Trafiri</h1>
                <p>Discover Hidden Gems in Kenya <span className='Emojis'>🌍🇰🇪</span></p>
                <p>Karibu na ugundue uzuri wa Kenya na Trafiri! <span className='Emojis'>🦁🌄</span></p>            
            </section>

            <section className="featured">
                <h2>Featured Destinations</h2>
                <div className="home-card">
                    <img src={Karura} alt="karura waterfall" />
                    <h3>Karura Forest <br /> Entry from ksh.100 <br /> Activities: Picknicking, Bike riding </h3>
                </div>

                <div className="home-card">
                    <img src={NationalPark} alt="Nairobi national park" />
                    <h3>Nairobi National Park <br /> Entry from ksh.500 <br /> Activities: Animal Watching and Safaris</h3>
                </div>
                
                <div className="home-card">
                    <img src={NatureTrail} alt="oloolua Nature Trail" />
                    <h3>Oloolua Nature Trail <br /> Entry from ksh.700 <br /> Activities: Trail Running, Picnicking, Animal Watching</h3>
                </div>
                
                <div>
                    <a href="/places"><button className='toplaces'>See All</button></a>
                    <br></br>
                </div>
                
                <h2>Popular Activities</h2>
                <div className="home-card">
                    <img src={Swimming} alt="a man swimming" />
                    <h3>Swimming</h3>
                </div>
            
                <div className="home-card">
                    <img src={Hiking} alt="men hiking" />
                    <h3>Hiking</h3>
                </div>
            
                <div className="home-card">
                    <img src={Picnicking} alt="a picnic table"/>
                    <h3>Picnicking</h3>
                </div>
                <div>
                <a href="/activities"><button className='toactivities'>See All</button></a> 
                </div>
            </section>
        </div>
    );
};

export default HomePage;

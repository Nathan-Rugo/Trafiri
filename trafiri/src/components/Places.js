// Places component to display a list of places to visit in Kenya with images and brief descriptions of each place
import React from "react";
import karuraImage from "../assets/karura.jpeg";
import nnpImage from "../assets/nnp.jpg";
import olooluaImage from "../assets/olooluaNatureTrail.jpeg";
import tsavoImage from "../assets/tsavo.jpeg";
import museumImage from "../assets/museum.jpeg";
import nyaliImage from "../assets/nyali.jpg";
import archivesImage from "../assets/archives.jpg";
import sheldrickImage from "../assets/sheldrick.jpeg";
import ngongImage from "../assets/ngong.jpg";
import railwayClubImage from "../assets/railwayClub.jpg";
import bomasOfKenyaImage from "../assets/bomasOfKenya.jpg";
import barclaysPoolImage from "../assets/barclaysPool.jpg";
import giraffeCenterImage from "../assets/girrafe-center.jpg";
import mountKenyaImage from "../assets/mountKenya.jpeg";
import vipingoRidgeImage from "../assets/vipingoRidge.jpeg";

const HomePage = () => {
  return (
    <section className="container">
      <div className="places-card">
        <img src={karuraImage} alt="karura waterfall" />
        <h3>
          Karura Forest <br /> Entry from ksh. <br /> Activities: Picknicking,
          Bike riding{" "}
        </h3>
      </div>

      <div className="places-card">
        <img src={nnpImage} alt="Nairobi national park" />
        <h3>
          Nairobi National Park <br /> Entry from ksh. <br /> Activities: Animal
          Watching and Safaris
        </h3>
      </div>

      <div className="places-card">
        <img src={olooluaImage} alt="oloolua Nature Trail" />
        <h3>
          Oloolua Nature Trail <br /> Entry from ksh. <br /> Activities: Nature
          walks, picnics, site-seeing
        </h3>
      </div>

      <div className="places-card">
        <img src={tsavoImage} alt="Tsavo" />
        <h3>
          Tsavo National Park <br /> Entry from ksh. <br /> Activities: Animal
          Watching and Safaris
        </h3>
      </div>

      <div className="places-card">
        <img src={museumImage} alt="Nairobi Museum" />
        <h3>
          Nairobi National Museum <br /> Entry from ksh. <br /> Activities:
          History learning
        </h3>
      </div>

      <div className="places-card">
        <img src={nyaliImage} alt="Nyali Beach" />
        <h3>
          Nyali Beach <br /> Entry:free <br /> Activities: Sunbathing, swimming
          and picnicking.
        </h3>
      </div>

      <div className="places-card">
        <img src={archivesImage} alt="national archives" />
        <h3>
          Nairobi National Archives <br /> Entry:free <br /> Activities:History
          and Culture
        </h3>
      </div>

      <div className="places-card">
        <img src={sheldrickImage} alt="a feeding elephant" />
        <h3>
          Sheldrick Wildlife Trust <br /> Entry:free <br /> Activities:Feeding
          Elephants, Seeing various wildlife
        </h3>
      </div>

      <div className="places-card">
        <img src={ngongImage} alt="ngong hills" />
        <h3>
          Ngong Hills <br /> Entry:ksh.400 <br /> Activities:Hiking
        </h3>
      </div>

      <div className="places-card">
        <img src={railwayClubImage} alt="old trains" />
        <h3>
          Railway Golf Club <br /> Entry:ksh.1000 <br /> Activities:Golfing
        </h3>
      </div>

      <div className="places-card">
        <img src={bomasOfKenyaImage} alt="traditional huts" />
        <h3>
          Bomas Of Kenya <br /> Entry:ksh.400 <br /> Activities:Culture and
          History learning, Traditional dance and music
        </h3>
      </div>

      <div className="places-card">
        <img src={barclaysPoolImage} alt="Barclays Pool" />
        <h3>
          Barclays Swimming Pool <br /> Entry:ksh.300 <br /> Activities:Swimming
        </h3>
      </div>

      <div className="places-card">
        <img src={giraffeCenterImage} alt="a feeding girraffe" />
        <h3>
          Giraffe Center <br /> Entry:ksh.600 <br /> Activities:Animal Watching
          and Feeding
        </h3>
      </div>

      <div className="places-card">
        <img src={mountKenyaImage} alt="Mount Kenya" />
        <h3>
          Mount Kenya <br /> Entry:ksh.1000 <br /> Activities:Mountain Climbing
        </h3>
      </div>

      <div className="places-card">
        <img src={vipingoRidgeImage} alt="Green field" />
        <h3>
          Vipingo Golfing Ridge <br /> Entry:ksh.1000 <br /> Activities:Golfing
        </h3>
      </div>
    </section>
  );
};

export default HomePage;

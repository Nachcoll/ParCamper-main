import React from 'react';
const compass = require('../Pages/images/clarity_compass-solid.png');

interface PanToArgs {
  lat: number;
  lng: number;
}

const FindMe = ({ panTo }: {panTo: (arg0: PanToArgs) => void}) => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src={compass} alt="submit button" className="findme-icon"></img>
    </button>
  );
};

export default FindMe;

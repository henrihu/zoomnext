import React from 'react';
import GoogleMapReact, { marker } from 'google-map-react';
import { Tag } from 'antd';
import { useThemeToken } from 'src/utils/common';

const AnyReactComponent = ({ text }) => {
  const token = useThemeToken();
  return (
    <div>
      <Tag
        color="red"
        className="rounded-lg font-bold text-lg"
        style={{
          backgroundColor: token.colorBgContainer,
          color: token.colorPrimary,
        }}
      >
        {text}
      </Tag>
    </div>
  );
};

export default ({
  defaultCenter = {
    lat: 40.756795,
    lng: -73.954298,
  },
  defaultZoom = 10,
  origin,
  destination,
  markers = [],
}) => {
  const apiIsLoaded = (map, maps) => {
    if (origin && destination) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  console.log('makres', markers);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyDENhFGFVKG1zYscVGqQ-SEU0bg3v36y-c' }}
      defaultCenter={defaultCenter}
      defaultZoom={defaultZoom}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
    >
      {markers &&
        markers.length > 0 &&
        markers.map((m, index) => <AnyReactComponent {...m} key={index} />)}
    </GoogleMapReact>
  );
};

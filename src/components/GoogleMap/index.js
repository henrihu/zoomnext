import React from 'react';
import GoogleMapReact from 'google-map-react';
import { EnvironmentFilled } from '@ant-design/icons';
import { Tag } from 'antd';
import { useThemeToken } from 'src/utils/common';

const Marker = ({ text }) => {
  const token = useThemeToken();
  return (
    <div
      style={{ width: 200, left: -100 }}
      className="flex justify-center absolute bottom-0"
    >
      <div className="flex flex-col items-center gap-1">
        <Tag
          color="red"
          className="rounded-lg font-bold"
          style={{
            backgroundColor: token.colorPrimaryBg,
            color: token.colorPrimary,
          }}
        >
          {text}
        </Tag>
        <EnvironmentFilled
          className="font-bold"
          style={{ color: token.colorPrimary }}
        />
      </div>
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
  const token = useThemeToken();
  const apiIsLoaded = (map, maps) => {
    if (origin && destination) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsRenderer.setOptions({
        markerOptions: {
          color: '#ffffff00',
        },
        polylineOptions: { strokeColor: token.colorPrimary, strokeWeight: 4 },
      });
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
        markers.map((m, index) => <Marker {...m} key={index} />)}
    </GoogleMapReact>
  );
};

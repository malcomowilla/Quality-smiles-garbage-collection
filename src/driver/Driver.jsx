import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { encode } from 'open-location-code';
import AccessDenied from '../access_denied/AccessDenied'



const Driver = () => {
  const [peopleLocations, setPeopleLocations] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [driverPosition, setDriverPosition] = useState({ lat: 0, lng: 0 });
  const [plusCode, setPlusCode] = useState('');

  useEffect(() => {
    const watchPositions = [];

    // Watch driver's position
    const driverWatchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const plusCode = encode(latitude, longitude);
        setPlusCode(plusCode);
        console.log(`Captured Plus Code: ${plusCode}`);

        console.log(`Driver position: ${latitude}, ${longitude}`);
        setDriverPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error watching driver position: ', error);
      }
    );
    watchPositions.push({ watchId: driverWatchId });

    // Watch multiple people's positions
    const peopleToWatch = ['person1', 'person2', 'person3']; // Example list of people to track

    peopleToWatch.forEach((person) => {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Position update for ${person}: ${latitude}, ${longitude}`);
          setPeopleLocations((prevLocations) => [
            ...prevLocations,
            { person, latitude, longitude },
          ]);
        },
        (error) => {
          console.error(`Error watching position for ${person}: `, error);
        }
      );
      watchPositions.push({ person, watchId });
    });

    // Cleanup: Stop watching positions when component unmounts
    return () => {
      watchPositions.forEach(({ watchId }) => {
        navigator.geolocation.clearWatch(watchId);
      });
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleRouteCalculation = (destination) => {
    // Example destination - you can change this to any location you need
    const destinationLocation = { lat: destination.latitude, lng: destination.longitude };

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: driverPosition,
        destination: destinationLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  return (
    <APIProvider apiKey={import.meta.env.GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width: '100vw', height: '100vh' }}
        center={driverPosition}
        zoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {/* Render markers for each person's location */}
        {peopleLocations.map(({ person, latitude, longitude }, index) => (
          <Marker key={index} longitude={longitude} latitude={latitude}>
            <div style={{ color: 'red', fontSize: 20 }}>{person}</div>
          </Marker>
        ))}
        {/* Render route */}
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              suppressMarkers: true,
              polylineOptions: { strokeColor: '#FF0000', strokeWeight: 5 },
            }}
          />
        )}
      </Map>
      <div>
        {/* Button to calculate route to a specific customer's location */}
        {peopleLocations.map(({ person, latitude, longitude }, index) => (
          <button key={index} onClick={() => handleRouteCalculation({ latitude, longitude })}>
            Route to {person}
          </button>
        ))}
      </div>
    </APIProvider>
  );
};

export default Driver;

import React, { useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  InfoWindow
} from '@react-google-maps/api';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const TurnByTurnNavigation = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [nextManeuver, setNextManeuver] = useState(null);
  const watchIdRef = useRef(null);
  const mapRef = useRef(null);

  const mapContainerStyle = {
    width: '100%',
    height: '100vh'
  };

  // Start watching user's position with high accuracy
  const startNavigation = () => {
    if (!destination) {
      setError('Please select a destination first');
      return;
    }

    setIsNavigating(true);
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentPosition(newPosition);
          updateNavigation(newPosition);
        },
        (error) => {
          setError('Error getting location: ' + error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Stop navigation
  const stopNavigation = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    setIsNavigating(false);
    setDirections(null);
    setNextManeuver(null);
  };

  // Update navigation based on current position
  const updateNavigation = (position) => {
    if (!destination || !isNavigating) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: position,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          // Update next maneuver
          if (result.routes[0]?.legs[0]?.steps[currentStep]) {
            setNextManeuver({
              instruction: result.routes[0].legs[0].steps[currentStep].instructions,
              distance: result.routes[0].legs[0].steps[currentStep].distance.text,
              duration: result.routes[0].legs[0].steps[currentStep].duration.text
            });
          }
        }
      }
    );
  };

  // Handle map click to set destination
  const handleMapClick = (event) => {
    if (!isNavigating) {
      setDestination({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', position: 'relative' }}>
      <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_MAPS_TEST_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={currentPosition || { lat: -1.2921, lng: 36.8219 }}
          onClick={handleMapClick}
          ref={mapRef}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {currentPosition && (
            <Marker
              position={currentPosition}
              icon={{
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 6,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeWeight: 2,
                rotation: 0 // You can update this based on device orientation
              }}
            />
          )}

          {destination && !isNavigating && (
            <Marker
              position={destination}
              label="D"
            />
          )}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#4285F4',
                  strokeWeight: 5
                }
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      {/* Navigation Controls */}
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: 400,
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {nextManeuver && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Next Turn
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: nextManeuver.instruction }}
            />
            <Typography variant="body2" color="textSecondary">
              {nextManeuver.distance} • {nextManeuver.duration}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<MyLocationIcon />}
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.panTo(currentPosition);
              }
            }}
          >
            Center
          </Button>

          {!isNavigating ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<NavigationIcon />}
              onClick={startNavigation}
              disabled={!destination}
            >
              Start Navigation
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={stopNavigation}
            >
              Stop Navigation
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default TurnByTurnNavigation;

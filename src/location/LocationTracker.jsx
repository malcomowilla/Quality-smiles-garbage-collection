import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box, Paper, Typography, List, ListItem, ListItemText, Drawer, useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';

const LocationTracker = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [center, setCenter] = useState({ lat: -1.2921, lng: 36.8219 }); // Default to Nairobi
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  const mapContainerStyle = {
    width: '100%',
    height: '100vh'
  };

  const drawerWidth = 300;

  useEffect(() => {
    // Fetch customers data
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    if (customer.latitude && customer.longitude) {
      setCenter({ lat: parseFloat(customer.latitude), lng: parseFloat(customer.longitude) });
    }
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'relative',
          height: '100vh',
        },
      }}
    >
      <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        Customers
      </Typography>
      <List sx={{ overflow: 'auto' }}>
        {customers.map((customer) => (
          <ListItem
            button
            key={customer.id}
            onClick={() => handleCustomerSelect(customer)}
            selected={selectedCustomer?.id === customer.id}
          >
            <ListItemText
              primary={customer.name}
              secondary={customer.address}
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: selectedCustomer?.id === customer.id ? 'bold' : 'normal',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Paper elevation={3}>
          {drawer}
        </Paper>
      )}
      
      <Box sx={{ flexGrow: 1, height: '100vh' }}>
        <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_MAPS_TEST_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
          >
            {customers.map((customer) => (
              customer.latitude && customer.longitude && (
                <Marker
                  key={customer.id}
                  position={{
                    lat: parseFloat(customer.latitude),
                    lng: parseFloat(customer.longitude)
                  }}
                  onClick={() => handleCustomerSelect(customer)}
                />
              )
            ))}
          </GoogleMap>
        </LoadScript>
      </Box>
    </Box>
  );
};

export default LocationTracker;

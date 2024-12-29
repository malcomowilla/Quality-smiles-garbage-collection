import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Paper,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
  SwipeableDrawer,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ChevronRight as ChevronRightIcon,
  Folder as FolderIcon
} from '@mui/icons-material';

const MobileExample = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Native-like App Bar */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Native-like UI
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ flex: 1, py: 2, overflow: 'auto' }}>
        {/* Search Bar */}
        <Paper
          elevation={1}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            borderRadius: isMobile ? 28 : 4
          }}
        >
          <IconButton sx={{ p: '10px' }}>
            <SearchIcon />
          </IconButton>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Search..."
            InputProps={{ disableUnderline: true }}
          />
        </Paper>

        {/* Cards */}
        <Card sx={{ mb: 2, borderRadius: isMobile ? 2 : 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Native-like Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This card uses mobile-optimized styling with proper spacing and touch targets.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: isMobile ? 28 : 4,
                  textTransform: 'none',
                  flex: 1
                }}
                onClick={() => setSnackbarOpen(true)}
              >
                Primary Action
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: isMobile ? 28 : 4,
                  textTransform: 'none',
                  flex: 1
                }}
              >
                Secondary
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* List Items */}
        <Paper sx={{ borderRadius: isMobile ? 2 : 1 }}>
          <List>
            {['Item 1', 'Item 2', 'Item 3'].map((text, index) => (
              <ListItem
                key={text}
                button
                sx={{
                  '&:active': {
                    backgroundColor: theme.palette.action.selected
                  }
                }}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={text}
                  secondary="Tap feedback and proper spacing"
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <ChevronRightIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>

      {/* Native-like Drawer */}
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableBackdropTransition={!isMobile}
        disableDiscovery={!isMobile}
        sx={{
          '& .MuiDrawer-paper': {
            width: isMobile ? '85%' : 280,
            borderRadius: isMobile ? '0 16px 16px 0' : 0
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Menu</Typography>
        </Box>
        <List>
          {['Profile', 'Settings', 'Help'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>

      {/* Native-like Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message="This is a native-like notification"
        action={
          <Button 
            color="secondary" 
            size="small"
            onClick={() => setSnackbarOpen(false)}
          >
            Dismiss
          </Button>
        }
      />
    </Box>
  );
};

export default MobileExample;

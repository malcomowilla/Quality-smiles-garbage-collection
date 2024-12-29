import { ListItemIcon } from '@mui/material';

import React from 'react';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentIcon from '@mui/icons-material/Payment';

const SidebarSystemAdmin = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, display: { xs: 'none', sm: 'block' } }}>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/clients">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Clients" />
        </ListItem>
        <ListItem button component={Link} to="/billing">
          <ListItemIcon><PaymentIcon /></ListItemIcon>
          <ListItemText primary="Billing" />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SidebarSystemAdmin;
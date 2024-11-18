

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const Settings = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [settingValue, setSettingValue] = useState('');

  const handleSave = () => {
    // Handle save logic here
    alert(`Settings saved! Locked: ${isLocked}, Value: ${settingValue}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isLocked}
              onChange={(e) => setIsLocked(e.target.checked)}
              color="success"
            />
          }
          label="Is Locked"
        />
        <TextField
          label="Setting Value"
          variant="outlined"
          fullWidth
          value={settingValue}
          onChange={(e) => setSettingValue(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="success" onClick={handleSave}>
          Save Settings
        </Button>
      </Paper>
    </motion.div>
  );
};

export default Settings;

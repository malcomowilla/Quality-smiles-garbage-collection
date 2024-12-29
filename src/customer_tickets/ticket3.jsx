import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Stack,
  Button,
  IconButton,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Autocomplete,
  CircularProgress,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
  Slide,
  Chip,
  Avatar,
  Snackbar,
  Alert,
  InputAdornment
} from '@mui/material';
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Category as CategoryIcon,
  PriorityHigh as PriorityIcon,
  SupervisorAccount as AgentIcon,
  Description as DescriptionIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json';

const TicketSubmit = ({
  isOpenTicket,
  isloading,
  setIsOpenTicket,
  customers,
  agentRole,
  handleChange,
  ticketForm,
  setTicketForm,
  handleAddTicket,
  openLoad
}) => {
  const [customerType, setCustomerType] = useState('existing');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const { name, email, phone_number, priority, issue_description, agent, ticket_category } = ticketForm;

  const ticketCategories = [
    { title: 'Billing' },
    { title: 'Garbage Collection' },
    { title: 'Service Issue' },
    { title: 'General Enquiry' },
    { title: 'Other' }
  ];

  const ticketPriorities = [
    { title: 'Low', color: 'success' },
    { title: 'Medium', color: 'warning' },
    { title: 'Urgent', color: 'error' }
  ];

  const ticketStatuses = [
    { title: 'Open', color: 'info' },
    { title: 'Resolved', color: 'success' },
    { title: 'In Progress', color: 'warning' },
    { title: 'Pending', color: 'error' }
  ];

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAddTicket(e);
      setSnackbar({ open: true, message: 'Ticket submitted successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to submit ticket', severity: 'error' });
    }
  };

  return (
    <>
      {isloading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            zIndex: theme.zIndex.modal + 1
          }}
        >
          <Lottie options={defaultOptions} height={200} width={200} />
        </Box>
      )}

      <Dialog
        fullScreen={fullScreen}
        open={isOpenTicket}
        onClose={() => setIsOpenTicket(false)}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
        PaperProps={{
          sx: {
            bgcolor: 'background.default',
            backgroundImage: 'none'
          }
        }}
      >
        <AppBar position="sticky" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setIsOpenTicket(false)}
              aria-label="close"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
              New Ticket
            </Typography>
            <Chip
              label="Draft"
              color="default"
              size="small"
              sx={{ mr: 1 }}
            />
          </Toolbar>
        </AppBar>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <DialogContent sx={{ p: 2, flex: 1, overflow: 'auto' }}>
            <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" gutterBottom>
                  Customer Type
                </Typography>
                <RadioGroup
                  row
                  value={customerType}
                  onChange={(e) => setCustomerType(e.target.value)}
                >
                  <FormControlLabel
                    value="new"
                    control={<Radio color="primary" />}
                    label="New Customer"
                  />
                  <FormControlLabel
                    value="existing"
                    control={<Radio color="primary" />}
                    label="Existing Customer"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>

            {customerType === 'new' && (
              <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    value={phone_number}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Paper>
            )}

            {customerType === 'existing' && (
              <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
                <Autocomplete
                  fullWidth
                  options={customers}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {option.name.charAt(0)}
                        </Avatar>
                        <Stack>
                          <Typography variant="subtitle2">{option.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.customer_code}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Customer"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setTicketForm((prev) => ({
                      ...prev,
                      customer: newValue?.name || ''
                    }));
                  }}
                />
              </Paper>
            )}

            <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
              <Stack spacing={2}>
                <Autocomplete
                  options={ticketCategories}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Ticket Category"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <CategoryIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setTicketForm((prev) => ({
                      ...prev,
                      ticket_category: newValue?.title || ''
                    }));
                  }}
                />

                <Autocomplete
                  options={ticketPriorities}
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PriorityIcon color={option.color} />
                        <Typography>{option.title}</Typography>
                      </Stack>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Priority"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <PriorityIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setTicketForm((prev) => ({
                      ...prev,
                      priority: newValue?.title || ''
                    }));
                  }}
                />

                <Autocomplete
                  options={agentRole.filter(Boolean)}
                  getOptionLabel={(option) => option.user_name}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {option.user_name.charAt(0)}
                        </Avatar>
                        <Typography>{option.user_name}</Typography>
                      </Stack>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assign Agent"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <AgentIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setTicketForm((prev) => ({
                      ...prev,
                      agent: newValue?.user_name || ''
                    }));
                  }}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Issue Description"
                  name="issue_description"
                  value={issue_description}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Paper>
          </DialogContent>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: 'divider',
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
              bgcolor: 'background.paper'
            }}
          >
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={() => setIsOpenTicket(false)}
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={isloading}
                startIcon={isloading ? <CircularProgress size={20} /> : <SaveIcon />}
              >
                Submit Ticket
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TicketSubmit;

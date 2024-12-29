import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Box,
  Stack,
  Avatar,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Description as DescriptionIcon,
  Feedback as FeedbackIcon,
  Note as NoteIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const TicketTest = ({
  open,
  onClose,
  agentRole,
  ticketForm,
  setTicketForm,
  handleAddTicket,
  loading,
  phone,
  customer_name,
  ticketNo,
  handleChange,
  updatedDate
}) => {
  const {
    name,
    email,
    phone_number,
    priority,
    category,
    issue_description,
    agent,
    ticket_category,
    agent_review,
    status
  } = ticketForm;

  const ticketCategory = [
    { title: 'Billing' },
    { title: 'Garbage Collection' },
    { title: 'Service Issue' },
    { title: 'General Enquiry' },
    { title: 'Other' }
  ];

  const ticketPriority = [
    { ticket: 'Low' },
    { ticket: 'Medium' },
    { ticket: 'Urgent' }
  ];

  const ticketStatus = [
    { ticketStatus: 'Open' },
    { ticketStatus: 'Resolved' },
    { ticketStatus: 'In Progress' },
    { ticketStatus: 'Pending' }
  ];

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper'
        }
      }}
    >
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{ticketNo}</Typography>
          <IconButton onClick={onClose} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Customer Info Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
                  {getInitials(customer_name)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{customer_name}</Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon fontSize="small" />
                    {phone}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Issue Description */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" color="textSecondary">Issue Description</Typography>
              <Typography variant="body1">{issue_description}</Typography>
            </Paper>
          </Grid>

          {/* Agent Review */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" color="textSecondary">
                Updated By: {agent}
              </Typography>
              <Typography variant="caption" display="block">{updatedDate}</Typography>
              <Typography variant="body2">{agent_review}</Typography>
            </Paper>
          </Grid>

          {/* Ticket Form */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <form onSubmit={handleAddTicket}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      value={ticketCategory.find(cat => cat.title === ticket_category) || null}
                      options={ticketCategory}
                      getOptionLabel={(option) => option.title}
                      onChange={(_, newValue) => {
                        setTicketForm(prev => ({
                          ...prev,
                          ticket_category: newValue?.title || ''
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Category" fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      value={ticketStatus.find(s => s.ticketStatus === status) || null}
                      options={ticketStatus}
                      getOptionLabel={(option) => option.ticketStatus}
                      onChange={(_, newValue) => {
                        setTicketForm(prev => ({
                          ...prev,
                          status: newValue?.ticketStatus || ''
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Status" fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      value={ticketPriority.find(p => p.ticket === priority) || null}
                      options={ticketPriority}
                      getOptionLabel={(option) => option.ticket}
                      onChange={(_, newValue) => {
                        setTicketForm(prev => ({
                          ...prev,
                          priority: newValue?.ticket || ''
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Priority" fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      value={agentRole.find(a => a?.user_name === agent) || null}
                      options={agentRole.filter(Boolean)}
                      getOptionLabel={(option) => option.user_name}
                      onChange={(_, newValue) => {
                        setTicketForm(prev => ({
                          ...prev,
                          agent: newValue?.user_name || ''
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Assign Agent" fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Agent Note"
                      name="agent_review"
                      value={agent_review}
                      onChange={handleChange}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} color="inherit" />}
                  >
                    Update Ticket
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>

          {/* Notes Section */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<NoteIcon />}
                  size="small"
                >
                  Add Note
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FeedbackIcon />}
                  size="small"
                >
                  Feedback
                </Button>
              </Box>
              
              <Divider sx={{ my: 2 }} />

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Add a note"
                variant="outlined"
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<DescriptionIcon />}
                >
                  Send Note
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TicketTest;
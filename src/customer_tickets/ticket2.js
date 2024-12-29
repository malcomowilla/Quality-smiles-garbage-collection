import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
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
  CircularProgress,
  Chip,
  Zoom,
  Fade,
  Slide
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Description as DescriptionIcon,
  Feedback as FeedbackIcon,
  Note as NoteIcon,
  Close as CloseIcon,
  SupervisorAccount as AgentIcon,
  PriorityHigh as PriorityIcon,
  Category as CategoryIcon,
  Update as UpdateIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const TicketForm = ({
  isOpen,
  setIsOpen,
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
  const [activeNote, setActiveNote] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState(false);
  const [noteText, setNoteText] = useState('');

  const {
    priority,
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
    { ticket: 'Low', color: 'success' },
    { ticket: 'Medium', color: 'warning' },
    { ticket: 'Urgent', color: 'error' }
  ];

  const ticketStatus = [
    { ticketStatus: 'Open', color: 'info' },
    { ticketStatus: 'Resolved', color: 'success' },
    { ticketStatus: 'In Progress', color: 'warning' },
    { ticketStatus: 'Pending', color: 'error' }
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  const MotionPaper = motion(Paper);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          p: 2
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" component={motion.div}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Ticket #{ticketNo}
            </Typography>
            <Chip 
              label={status} 
              color={ticketStatus.find(s => s.ticketStatus === status)?.color || 'default'}
              size="small"
            />
          </Stack>
          <IconButton onClick={() => setIsOpen(false)} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Zoom in={true} style={{ transitionDelay: '100ms' }}>
              <MotionPaper 
                elevation={3} 
                sx={{ p: 2 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar 
                      sx={{ 
                        width: 56, 
                        height: 56, 
                        bgcolor: 'primary.main',
                        fontSize: '1.5rem'
                      }}
                    >
                      {getInitials(customer_name)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{customer_name}</Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          color: 'text.secondary'
                        }}
                      >
                        <PhoneIcon fontSize="small" />
                        {phone}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider />
                  
                  <Typography variant="body1" color="text.secondary">
                    {issue_description}
                  </Typography>
                </Stack>
              </MotionPaper>
            </Zoom>
          </Grid>

          <Grid item xs={12} md={8}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
              <MotionPaper 
                elevation={3} 
                sx={{ p: 3 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
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
                          <TextField 
                            {...params} 
                            label="Category"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <CategoryIcon color="action" sx={{ mr: 1 }} />
                                  {params.InputProps.startAdornment}
                                </>
                              )
                            }}
                          />
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
                          <TextField 
                            {...params} 
                            label="Priority"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <PriorityIcon color="action" sx={{ mr: 1 }} />
                                  {params.InputProps.startAdornment}
                                </>
                              )
                            }}
                          />
                        )}
                        renderOption={(props, option) => (
                          <Box component="li" {...props}>
                            <Chip 
                              size="small" 
                              label={option.ticket}
                              color={option.color}
                              sx={{ mr: 1 }}
                            />
                            {option.ticket}
                          </Box>
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
                          <TextField 
                            {...params} 
                            label="Assign Agent"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <AgentIcon color="action" sx={{ mr: 1 }} />
                                  {params.InputProps.startAdornment}
                                </>
                              )
                            }}
                          />
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
                          <TextField 
                            {...params} 
                            label="Status"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <UpdateIcon color="action" sx={{ mr: 1 }} />
                                  {params.InputProps.startAdornment}
                                </>
                              )
                            }}
                          />
                        )}
                        renderOption={(props, option) => (
                          <Box component="li" {...props}>
                            <Chip 
                              size="small" 
                              label={option.ticketStatus}
                              color={option.color}
                              sx={{ mr: 1 }}
                            />
                            {option.ticketStatus}
                          </Box>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Agent Note"
                        name="agent_review"
                        value={agent_review}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <NoteIcon color="action" sx={{ mr: 1, mt: 1 }} />
                          )
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                    <Box>
                      <Button
                        variant="outlined"
                        startIcon={<NoteIcon />}
                        onClick={() => setActiveNote(!activeNote)}
                        sx={{ mr: 1 }}
                      >
                        Add Note
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<FeedbackIcon />}
                        onClick={() => setActiveFeedback(!activeFeedback)}
                      >
                        Feedback
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setIsOpen(false)}
                        sx={{ mr: 1 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <UpdateIcon />}
                      >
                        Update Ticket
                      </Button>
                    </Box>
                  </Box>
                </form>
              </MotionPaper>
            </Zoom>
          </Grid>

          <Grid item xs={12}>
            <AnimatePresence>
              {activeNote && (
                <Fade in={activeNote}>
                  <MotionPaper
                    elevation={3}
                    sx={{ p: 2, mt: 2 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Add Note
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Type your note here..."
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        startIcon={<DescriptionIcon />}
                        disabled={!noteText.trim()}
                      >
                        Save Note
                      </Button>
                    </Box>
                  </MotionPaper>
                </Fade>
              )}
            </AnimatePresence>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TicketForm;
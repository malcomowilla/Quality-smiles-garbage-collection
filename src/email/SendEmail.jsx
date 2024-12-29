import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useLayoutSettings } from '../settings/LayoutSettings';


const SendEmail = () => {
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        message: ''
    });

    const { settings, borderRadiusClasses } = useLayoutSettings();

    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                '/api/send_individual_email', emailData);
            setSnackbar({
                open: true,
                message: 'Email sent successfully!',
                severity: 'success'
            });
            // Clear form
            setEmailData({
                to: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.error || 'Failed to send email',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({
            ...prev,
            open: false
        }));
    };

    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }} className={`${borderRadiusClasses[settings.borderRadius]}`}>
            <Paper elevation={3} 
            sx={{ p: 4, borderRadius: settings.borderRadius 
            === 'rounded' ? '12px' : '4px' }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Send Individual Email
                </Typography>
                
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        className='myTextField'
                        label="To"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            justifyContent: 'center',
                            justifyItems: 'center',
                            '& label.Mui-focused': { color: 'gray' },
                            '& .MuiOutlinedInput-root': {
                              borderRadius: settings.borderRadius === 'rounded' ? '12px' : '4px',
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "green",
                                borderWidth: '3px'
                              }
                            }
                          }}
                        name="to"
                        type="email"
                        value={emailData.to}
                        onChange={handleChange}
                        margin="normal"
                        required
                        placeholder="recipient@example.com"
                    />
                    
                    <TextField
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'center',
                        justifyItems: 'center',
                        '& label.Mui-focused': { color: 'gray' },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: settings.borderRadius === 'rounded' ? '12px' : '4px',
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "green",
                            borderWidth: '3px'
                          }
                        }
                      }}
                        fullWidth
                        className='myTextField'
                        label="Subject"
                        name="subject"
                        value={emailData.subject}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    
                    <TextField
                     className='myTextField'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'center',
                        justifyItems: 'center',
                        '& label.Mui-focused': { color: 'gray' },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: settings.borderRadius === 'rounded' ? '12px' : '4px',
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "green",
                            borderWidth: '3px'
                          }
                        }
                      }}
                        fullWidth
                        label="Message"
                        name="message"
                        value={emailData.message}
                        onChange={handleChange}
                        margin="normal"
                        required
                        multiline
                        rows={6}
                    />
                    
                    <Box sx={{ mt: 3 }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="success"
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? 'Sending...' : 'Send Email'}
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SendEmail;

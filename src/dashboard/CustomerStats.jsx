import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const CustomerStats = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalStats: {},
        customerStats: []
    });

    // service_providers/stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/customers/stats');
                const formattedData = response.data.customer_stats.map(customer => ({
                    name: `${customer.name || customer.email} (${customer.customer_code})`,
                    customer_code: customer.customer_code,
                    'Total Requests': customer.total_requests || 0,
                    'Total Confirmations': customer.total_confirmations || 0,
                    last_request: customer.request_date,
                    last_confirmation: customer.confirmation_date
                }));
                
                setStats({
                    totalStats: response.data.total_stats,
                    customerStats: formattedData
                });
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setError('Failed to load statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const customer = stats.customerStats.find(c => c.name === label);
            return (
                <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    <Typography variant="subtitle2">{label}</Typography>
                    {payload.map((entry, index) => (
                        <Typography key={index} sx={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </Typography>
                    ))}
                    {customer && (
                        <>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Last Request: {customer.last_request || 'No requests yet'}
                            </Typography>
                            <Typography variant="body2">
                                Last Confirmation: {customer.last_confirmation || 'No confirmations yet'}
                            </Typography>
                        </>
                    )}
                </Paper>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Overall Statistics
                </Typography>
                <Box display="flex" gap={4}>
                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Total Requests
                        </Typography>
                        <Typography variant="h4" color="success.main">
                            {stats.totalStats.total_requests || 0}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Total Confirmations
                        </Typography>
                        <Typography variant="h4" color="success.main">
                            {stats.totalStats.total_confirmations || 0}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Customer Statistics
                </Typography>
                <Box sx={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={stats.customerStats}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 100
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="name" 
                                angle={-45}
                                textAnchor="end"
                                height={100}
                                interval={0}
                            />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="Total Requests" fill="#8884d8" />
                            <Bar dataKey="Total Confirmations" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Detailed Customer History
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer</TableCell>
                                <TableCell align="right">Total Requests</TableCell>
                                <TableCell>Last Request</TableCell>
                                <TableCell align="right">Total Confirmations</TableCell>
                                <TableCell>Last Confirmation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stats.customerStats.map((customer) => (
                                <TableRow key={customer.customer_code}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell align="right">{customer['Total Requests']}</TableCell>
                                    <TableCell>{customer.last_request || 'No requests yet'}</TableCell>
                                    <TableCell align="right">{customer['Total Confirmations']}</TableCell>
                                    <TableCell>{customer.last_confirmation || 'No confirmations yet'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default CustomerStats;
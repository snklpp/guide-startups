import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Dashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>Personal Dashboard</Typography>
            <Typography variant="h6" color="text.secondary">
                Track your progress on selected startup ideas here.
            </Typography>
            <Box sx={{ mt: 8, p: 10, border: '1px dashed rgba(255,255,255,0.2)', borderRadius: 4 }}>
                <Typography>Your saved ideas will appear here.</Typography>
            </Box>
        </Container>
    );
};

export default Dashboard;

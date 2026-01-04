import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActionArea, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { motion } from 'framer-motion';

const DomainExplorer = () => {
    const [domains, setDomains] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/domains')
            .then(res => setDomains(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container maxWidth="xl" sx={{ py: 8 }}>
            <Typography variant="h2" gutterBottom sx={{ mb: 6, textAlign: 'center' }}>
                Explore 10 High-Growth Domains
            </Typography>

            {domains.map((domain, index) => (
                <Box key={domain.id} sx={{ mb: 8 }} component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h4" color="primary" sx={{ mr: 2 }}>
                            {domain.name}
                        </Typography>
                        <Chip label={`${domain.idea_count} Ideas`} size="small" variant="outlined" />
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ mb: 4, maxWidth: '800px' }}>
                        {domain.description}
                    </Typography>

                    <Grid container spacing={3}>
                        {domain.ideas.map((idea) => (
                            <Grid item xs={12} md={6} lg={4} key={idea.id}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardActionArea onClick={() => navigate(`/idea/${idea.id}`)} sx={{ flexGrow: 1, p: 1 }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                <Chip label={`Pain: ${idea.pain_severity}/10`} size="small" color={idea.pain_severity > 8 ? "error" : "warning"} />
                                                <Chip label={`${idea.time_to_mvp_weeks} weeks`} size="small" variant="outlined" />
                                            </Box>
                                            <Typography variant="h6" gutterBottom noWrap title={idea.title}>
                                                {idea.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                            }}>
                                                {idea.problem}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Container>
    );
};

export default DomainExplorer;

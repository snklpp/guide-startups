import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Box, Chip, Paper, Tabs, Tab, Button, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../api';
import ChatWidget from '../components/ChatWidget';

const IdeaDetail = () => {
    const { ideaId } = useParams();
    const [idea, setIdea] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        api.get(`/ideas/${ideaId}`)
            .then(res => setIdea(res.data))
            .catch(err => console.error(err));
    }, [ideaId]);

    if (!idea) return <Box sx={{ p: 10, textAlign: 'center', color: 'white' }}><Typography>Loading Strategy...</Typography></Box>;

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const chartData = [
        { name: 'Month 1', revenue: 0, cost: 500 },
        { name: 'Month 3', revenue: 1500, cost: 600 },
        { name: 'Month 6', revenue: 6000, cost: 1000 },
        { name: 'Month 12', revenue: 25000, cost: 2000 },
    ];

    return (
        <Box sx={{ backgroundColor: '#050505', minHeight: '100vh', color: 'white' }}>
            {/* Cinematic Backdrop with Premium Fade */}
            <Box
                sx={{
                    height: '60vh',
                    position: 'relative',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.8) 60%, #050505 100%)'
                    }
                }}
            >
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pl: { xs: 2, md: 8 }, pt: 10 }}>
                    <Chip
                        label="98% MATCH"
                        sx={{ mb: 2, fontWeight: 800, bgcolor: '#46D369', color: 'black', borderRadius: '4px' }}
                    />
                    <Typography variant="h1" sx={{
                        fontSize: { xs: '2.5rem', md: '5rem' },
                        fontWeight: 800,
                        mb: 2,
                        lineHeight: 1,
                        textShadow: '0 10px 30px black'
                    }}>
                        {idea.title}
                    </Typography>
                    <Typography variant="h6" sx={{
                        maxWidth: '700px',
                        mb: 4,
                        color: '#d1d5db',
                        fontWeight: 300,
                        lineHeight: 1.6,
                        fontSize: '1.1rem'
                    }}>
                        {idea.problem}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="contained" size="large" sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}>Execute Plan</Button>
                        <Button variant="outlined" size="large" color="inherit" sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}>Add to List</Button>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ mt: 0, pb: 10, pl: { xs: 2, md: 8 } }}>
                <Grid container spacing={6}>
                    <Grid item xs={12} lg={8}>
                        {/* Premium Tabs */}
                        <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', mb: 4 }}>
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                textColor="inherit"
                                indicatorColor="primary"
                                sx={{
                                    '& .MuiTab-root': {
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        mr: 4,
                                        color: '#9CA3AF',
                                        '&.Mui-selected': { color: 'white' }
                                    }
                                }}
                            >
                                <Tab label="Overview" />
                                <Tab label="Tech Stack" />
                                <Tab label="Business Model" />
                                <Tab label="GTM Strategy" />
                            </Tabs>
                        </Box>

                        <Box sx={{ minHeight: '400px', animation: 'fadeIn 0.5s ease' }}>
                            {tabValue === 0 && (
                                <Box>
                                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>The Solution</Typography>
                                    <Typography paragraph sx={{ color: '#ccc', fontSize: '1.1rem', lineHeight: 1.8 }}>{idea.ai_use_case}</Typography>

                                    {idea.why_ai && (
                                        <Box sx={{ mt: 4, mb: 4 }}>
                                            <Typography variant="h6" sx={{ mb: 1, color: '#E50914' }}>Why AI is Necessary</Typography>
                                            <Typography paragraph sx={{ color: '#ccc', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                                {idea.why_ai}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Box sx={{ mt: 6, p: 4, border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.02)' }}>
                                        <Typography variant="h6" sx={{ mb: 3, color: '#E50914' }}>MVP Scope</Typography>
                                        <Grid container spacing={2}>
                                            {idea.mvp_scope.map((item, i) => (
                                                <Grid item xs={12} md={6} key={i}>
                                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                                        <CheckCircleIcon sx={{ color: '#46D369', mt: 0.5 }} fontSize="small" />
                                                        <Typography color="#d1d5db" sx={{ lineHeight: 1.6 }}>{item}</Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Box>
                            )}

                            {tabValue === 1 && (
                                <Grid container spacing={2}>
                                    {idea.tech_stack.map((tech, i) => (
                                        <Grid item xs={6} md={3} key={i}>
                                            <Paper sx={{
                                                p: 3,
                                                bgcolor: 'rgba(255,255,255,0.03)',
                                                color: 'white',
                                                textAlign: 'center',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                borderRadius: '8px',
                                                transition: 'all 0.2s',
                                                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', transform: 'translateY(-2px)' }
                                            }}>
                                                <Typography fontWeight={600} sx={{ fontFamily: '"Outfit", sans-serif' }}>{tech}</Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}

                            {tabValue === 2 && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <Typography variant="h6" sx={{ mb: 2, color: '#E50914' }}>Pricing Model</Typography>
                                        <Typography paragraph sx={{ color: '#ccc', lineHeight: 1.6 }}>{idea.pricing_model}</Typography>
                                    </Box>

                                    <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <Typography variant="h6" sx={{ mb: 2, color: '#E50914' }}>The Moat</Typography>
                                        <Typography paragraph sx={{ color: '#ccc', lineHeight: 1.6 }}>{idea.moat}</Typography>
                                    </Box>

                                    <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <Typography variant="h6" sx={{ mb: 2, color: '#E50914' }}>Risks & Failure Modes</Typography>
                                        <Grid container spacing={2}>
                                            {idea.risks.map((risk, i) => (
                                                <Grid item xs={12} key={i}>
                                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                                        <Typography color="#d1d5db" sx={{ lineHeight: 1.6 }}>• {risk}</Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>

                                    <Box sx={{ height: 300, mt: 2 }}>
                                        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#666' }}>Projected Growth</Typography>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                                <XAxis dataKey="name" stroke="#666" axisLine={false} tickLine={false} dy={10} />
                                                <YAxis stroke="#666" axisLine={false} tickLine={false} dx={-10} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#101010', border: '1px solid #333', borderRadius: '4px' }}
                                                    itemStyle={{ color: '#ccc' }}
                                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                />
                                                <Bar dataKey="revenue" fill="#E50914" radius={[4, 4, 0, 0]} barSize={40} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </Box>
                            )}

                            {tabValue === 3 && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <Box>
                                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>Go-to-Market Strategy</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            {idea.go_to_market.map((step, i) => (
                                                <Paper key={i} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                        <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.1)', fontWeight: 800 }}>0{i + 1}</Typography>
                                                        <Typography color="#d1d5db" sx={{ lineHeight: 1.6, pt: 0.5 }}>{step}</Typography>
                                                    </Box>
                                                </Paper>
                                            ))}
                                        </Box>
                                    </Box>

                                    <Box sx={{ mt: 4, p: 4, border: '1px solid #E50914', borderRadius: '12px', bgcolor: 'rgba(229, 9, 20, 0.05)' }}>
                                        <Typography variant="h6" sx={{ mb: 2, color: '#E50914', fontWeight: 700 }}>Founder Advantage</Typography>
                                        <Typography paragraph sx={{ color: '#fff', lineHeight: 1.6, mb: 0 }}>{idea.founder_advantage}</Typography>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.02)', color: 'white', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#9CA3AF', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Details</Typography>
                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 3 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box>
                                    <Typography color="#666" variant="caption" sx={{ letterSpacing: '1px' }}>TARGET CUSTOMER</Typography>
                                    <Typography variant="h6" sx={{ mt: 0.5 }}>{idea.target_customer}</Typography>
                                </Box>
                                <Box>
                                    <Typography color="#666" variant="caption" sx={{ letterSpacing: '1px' }}>COMPLEXITY</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                        {[...Array(10)].map((_, i) => (
                                            <Box key={i} sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: i < idea.complexity_score ? '#E50914' : 'rgba(255,255,255,0.1)' }} />
                                        ))}
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography color="#666" variant="caption" sx={{ letterSpacing: '1px' }}>TIME TO MVP</Typography>
                                    <Typography variant="h6" sx={{ mt: 0.5 }}>{idea.time_to_mvp_weeks} Weeks</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <ChatWidget idea={idea} />
        </Box>
    );
};

export default IdeaDetail;

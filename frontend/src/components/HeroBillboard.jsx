import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroBillboard = ({ featuredIdea }) => {
    const navigate = useNavigate();

    if (!featuredIdea) return null;

    return (
        <Box
            sx={{
                position: 'relative',
                height: '92vh', // Taller, more cinematic
                width: '100%',
                backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {/* Cinematic Gradient Overlays */}
            {/* 1. Bottom fade to seamless black */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '40%',
                    background: 'linear-gradient(to bottom, rgba(5,5,5,0) 0%, #050505 100%)',
                    zIndex: 1
                }}
            />
            {/* 2. Side vignette for text readability */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '60%',
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)',
                    zIndex: 1
                }}
            />

            <Container maxWidth={false} sx={{ position: 'relative', zIndex: 2, pl: { xs: 4, md: 8 } }}>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    sx={{ maxWidth: '700px' }}
                >
                    <Typography variant="overline" sx={{ color: '#E50914', fontWeight: 800, letterSpacing: 3, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ display: 'inline-block', width: '20px', height: '2px', backgroundColor: '#E50914' }}></span>
                        #1 TRENDING STARTUP
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '3.5rem', md: '6rem' },
                            fontWeight: 900,
                            lineHeight: 0.9,
                            mb: 3,
                            background: 'linear-gradient(180deg, #FFFFFF 0%, #A0A0A0 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}
                    >
                        INVOICE<br />AI
                    </Typography>

                    <Typography variant="h5" sx={{ mb: 5, color: '#e0e0e0', lineHeight: 1.6, fontSize: '1.25rem', fontWeight: 400, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {featuredIdea.problem.substring(0, 160)}...
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<PlayArrowIcon sx={{ fontSize: 32 }} />}
                            sx={{
                                backgroundColor: '#FFFFFF',
                                color: 'black',
                                px: 4, py: 1.5,
                                fontSize: '1.2rem',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                    transform: 'scale(1.02)'
                                }
                            }}
                            onClick={() => navigate(`/idea/${featuredIdea.id}`)}
                        >
                            Start Strategy
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<InfoOutlinedIcon />}
                            sx={{
                                px: 4, py: 1.5,
                                fontSize: '1.2rem',
                                backgroundColor: 'rgba(109, 109, 110, 0.4)', // Glassy
                                backdropFilter: 'blur(10px)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(109, 109, 110, 0.6)',
                                }
                            }}
                            onClick={() => navigate(`/idea/${featuredIdea.id}`)}
                        >
                            More Info
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroBillboard;

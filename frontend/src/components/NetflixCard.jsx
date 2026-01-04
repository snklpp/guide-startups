import React from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const getDomainGradient = (domainName) => {
    const lower = domainName?.toLowerCase() || '';
    if (lower.includes('b2b') || lower.includes('saas')) return 'gradient-b2b';
    if (lower.includes('health')) return 'gradient-healthcare';
    if (lower.includes('ai') || lower.includes('agent')) return 'gradient-ai';
    if (lower.includes('financ') || lower.includes('fintech')) return 'gradient-finance';
    if (lower.includes('education') || lower.includes('skill')) return 'gradient-education';
    if (lower.includes('legal')) return 'gradient-legal';
    return 'gradient-default';
};

const NetflixCard = ({ idea, domainName }) => {
    const navigate = useNavigate();
    const gradientClass = getDomainGradient(domainName);

    return (
        <Box
            component={motion.div}
            whileHover={{
                scale: 1.05,
                y: -10,
                zIndex: 10,
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            onClick={() => navigate(`/idea/${idea.id}`)}
            sx={{
                minWidth: '280px',
                maxWidth: '280px',
                height: '160px',
                marginRight: 1.5,
                cursor: 'pointer',
                position: 'relative'
            }}
        >
            <Card sx={{
                height: '100%',
                // Apply the gradient class via className not working directly in sx for custom css, so using style or just direct background
                // Using a darker base with a subtle gradient overlay
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '6px',
                overflow: 'hidden',
                className: gradientClass // We'd need to map this in CSS, or just do inline logic below
            }}
                className={gradientClass} // Using the CSS classes we defined
            >
                <CardContent sx={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '20px !important',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.1) 100%)' // Text legibility overlay
                }}>
                    <Box>
                        <Typography variant="h6" sx={{
                            fontWeight: 700,
                            lineHeight: 1.2,
                            mb: 1,
                            fontSize: '1rem',
                            fontFamily: '"Outfit", sans-serif',
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        }}>
                            {idea.title}
                        </Typography>

                        {/* Small tag instead of description text to minimize clutter */}
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {idea.mvp_scope.slice(0, 1).map((tag, i) => (
                                <Typography key={i} variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem' }}>
                                    {tag}
                                </Typography>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" sx={{ color: '#46D369', fontWeight: 700, fontSize: '0.8rem' }}>
                            {idea.market_size_score * 10}% match
                        </Typography>
                        <Chip
                            label={`${idea.time_to_mvp_weeks}w`}
                            size="small"
                            sx={{
                                height: 18,
                                fontSize: '0.65rem',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                color: '#ccc',
                                backdropFilter: 'blur(4px)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        />
                        <Chip
                            label="4K"
                            size="small"
                            variant="outlined"
                            sx={{
                                height: 18,
                                fontSize: '0.6rem',
                                color: '#999',
                                borderColor: '#555',
                                borderRadius: '2px',
                                borderWidth: '1px'
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default NetflixCard;

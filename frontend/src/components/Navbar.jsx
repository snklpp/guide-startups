import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Use glass effect when scrolled
    const navStyle = isScrolled
        ? { background: 'rgba(5, 5, 5, 0.7)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }
        : { background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)' };

    return (
        <AppBar position="fixed" sx={{ ...navStyle, transition: 'all 0.4s ease', boxShadow: 'none' }}>
            <Toolbar disableGutters sx={{ minHeight: '80px', px: { xs: 2, md: 6 } }}>
                {/* Brand Logo with Netflix Curve */}
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        mr: 5,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'flex-start',
                        height: '40px',
                        overflow: 'visible'
                    }}
                >
                    {['S', 'T', 'A', 'R', 'T', 'F', 'L', 'I', 'X'].map((letter, i) => {
                        const dist = Math.abs(i - 4);
                        // Curve formula: ends are taller (scale > 1), center is base (scale 1)
                        // This creates an ARCH bottom (ends lower, middle higher)
                        const scale = 1 + (dist * dist * 0.012);

                        return (
                            <Typography
                                key={i}
                                variant="h4"
                                component="span"
                                sx={{
                                    fontFamily: '"Bebas Neue", "Impact", sans-serif',
                                    fontWeight: 400, // Bebas is naturally bold
                                    color: '#E50914',
                                    lineHeight: 1,
                                    letterSpacing: '1px',
                                    display: 'inline-block',
                                    transform: `scaleY(${scale})`,
                                    transformOrigin: 'top center',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                }}
                            >
                                {letter}
                            </Typography>
                        );
                    })}
                </Box>

                {/* Navigation Links */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                    {['Home', 'B2B SaaS', 'Healthcare', 'AI Agents'].map((text) => (
                        <Typography
                            key={text}
                            variant="body1"
                            component={Link}
                            to={text === 'Home' ? '/' : '#'} // Placeholder links
                            sx={{
                                color: '#e5e5e5',
                                textDecoration: 'none',
                                fontWeight: 500,
                                fontSize: '0.95rem',
                                opacity: location.pathname === '/' && text === 'Home' ? 1 : 0.7,
                                transition: 'opacity 0.2s',
                                '&:hover': { opacity: 1 }
                            }}
                        >
                            {text}
                        </Typography>
                    ))}
                </Box>

                {/* Action Icons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton sx={{ color: 'white' }}><SearchIcon /></IconButton>
                    <IconButton sx={{ color: 'white' }}><NotificationsNoneIcon /></IconButton>
                    <Avatar
                        variant="rounded"
                        sx={{ width: 32, height: 32, bgcolor: '#E50914', fontSize: '0.9rem', fontWeight: 700 }}
                    >
                        S
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

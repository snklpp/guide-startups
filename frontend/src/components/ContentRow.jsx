import React, { useRef, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NetflixCard from './NetflixCard';

const ContentRow = ({ title, ideas }) => {
    const rowRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const scroll = (scrollOffset) => {
        rowRef.current.scrollLeft += scrollOffset;
    };

    return (
        <Box
            sx={{ mb: 6, pl: { xs: 2, md: 6 }, position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: '#e5e5e5',
                    fontSize: { xs: '1.1rem', md: '1.35rem' },
                    fontFamily: '"Outfit", sans-serif',
                    letterSpacing: '0.02em',
                    '&:hover': { color: 'white', cursor: 'pointer' },
                    display: 'inline-block'
                }}
            >
                {title}
                <Typography component="span" sx={{ display: 'inline-block', ml: 1, color: '#54b9c5', opacity: 0, transition: 'opacity 0.2s', fontSize: '0.8rem', top: '-2px', position: 'relative', '.MuiBox-root:hover &': { opacity: 1 } }}>Explore All &gt;</Typography>
            </Typography>

            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {/* Left Hover Arrow */}
                <IconButton
                    onClick={() => scroll(-500)}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        zIndex: 10,
                        height: 'calc(100% - 32px)', // Adjust for potential padding
                        width: '50px',
                        backgroundColor: 'rgba(5,5,5,0.5)',
                        borderRadius: '0 4px 4px 0',
                        color: 'white',
                        display: { xs: 'none', md: 'flex' },
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        backdropFilter: 'blur(4px)',
                        '&:hover': { backgroundColor: 'rgba(5,5,5,0.8)' },
                        ...(isHovered && { opacity: 1 })
                    }}
                >
                    <ArrowBackIosNewIcon fontSize="large" />
                </IconButton>

                {/* Scroll Container */}
                <Box
                    ref={rowRef}
                    className="no-scrollbar"
                    sx={{
                        display: 'flex',
                        overflowX: 'scroll',
                        scrollBehavior: 'smooth',
                        gap: 1.5,
                        py: 4,
                        px: 1,
                        maskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)' // Soft edge fade
                    }}
                >
                    {ideas.map((idea) => (
                        <NetflixCard key={idea.id} idea={idea} domainName={title} />
                    ))}
                </Box>

                {/* Right Hover Arrow */}
                <IconButton
                    onClick={() => scroll(500)}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        zIndex: 10,
                        height: 'calc(100% - 32px)',
                        width: '50px',
                        backgroundColor: 'rgba(5,5,5,0.5)',
                        borderRadius: '4px 0 0 4px',
                        color: 'white',
                        display: { xs: 'none', md: 'flex' },
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        backdropFilter: 'blur(4px)',
                        '&:hover': { backgroundColor: 'rgba(5,5,5,0.8)' },
                        ...(isHovered && { opacity: 1 })
                    }}
                >
                    <ArrowForwardIosIcon fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ContentRow;

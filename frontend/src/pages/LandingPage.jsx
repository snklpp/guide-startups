import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import api from '../api';
import HeroBillboard from '../components/HeroBillboard';
import ContentRow from '../components/ContentRow';

const LandingPage = () => {
    const [domains, setDomains] = useState([]);
    const [featuredIdea, setFeaturedIdea] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/domains')
            .then(res => {
                setDomains(res.data);
                // hardcode featured idea for now, or pick random
                // Invoice extraction is usually first in first domain
                if (res.data.length > 0 && res.data[0].ideas.length > 0) {
                    setFeaturedIdea(res.data[0].ideas[0]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <Box sx={{ backgroundColor: '#141414', height: '100vh' }} />;

    return (
        <Box sx={{ backgroundColor: '#141414', minHeight: '100vh', pb: 10 }}>
            {/* Hero Section */}
            <HeroBillboard featuredIdea={featuredIdea} />

            {/* Content Rows - Offset negatively to overlap hero slightly like Netflix */}
            <Box sx={{ mt: -15, position: 'relative', zIndex: 2 }}>
                {domains.map((domain) => (
                    <ContentRow
                        key={domain.id}
                        title={domain.name}
                        ideas={domain.ideas}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default LandingPage;

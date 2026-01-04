import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, IconButton, Paper, CircularProgress, Fab, Tooltip, Collapse, Link, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import API_URL from '../config';

// Search Animation Component
const SearchAnimation = () => {
    const icons = [
        { Icon: SearchIcon, color: '#4285F4', delay: 0 },
        { Icon: NewspaperIcon, color: '#FF6B35', delay: 0.2 },
        { Icon: MenuBookIcon, color: '#00C9A7', delay: 0.4 },
        { Icon: ArticleIcon, color: '#C75AF6', delay: 0.6 },
        { Icon: SchoolIcon, color: '#00B8D9', delay: 0.8 },
    ];

    return (
        <Box sx={{
            alignSelf: 'flex-start',
            maxWidth: '80%',
            p: 2,
            borderRadius: '18px',
            backgroundColor: 'rgba(66, 133, 244, 0.1)',
            border: '1px solid rgba(66, 133, 244, 0.3)',
            backdropFilter: 'blur(10px)',
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <CircularProgress size={16} sx={{ color: '#4285F4' }} />
                <Typography sx={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>
                    Searching the web...
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                {icons.map(({ Icon, color, delay }, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            animation: 'fadeRotate 2s ease-in-out infinite',
                            animationDelay: `${delay} s`,
                            '@keyframes fadeRotate': {
                                '0%, 100%': { opacity: 0.3, transform: 'scale(0.8) rotate(0deg)' },
                                '50%': { opacity: 1, transform: 'scale(1.1) rotate(180deg)' },
                            },
                        }}
                    >
                        <Icon sx={{ fontSize: '1.5rem', color }} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

// Source Citation Component
const SourceCitation = ({ sources }) => {
    const [expanded, setExpanded] = useState(false);

    if (!sources || sources.length === 0) return null;

    return (
        <Box sx={{ mt: 1, width: '100%' }}>
            <Box
                onClick={() => setExpanded(!expanded)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem',
                    '&:hover': { color: '#4285F4' },
                    transition: 'color 0.2s',
                    mb: 0.5,
                }}
            >
                {expanded ? <ExpandLessIcon sx={{ fontSize: '1rem' }} /> : <ExpandMoreIcon sx={{ fontSize: '1rem' }} />}
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                    {sources.length} Source{sources.length > 1 ? 's' : ''}
                </Typography>
            </Box>
            <Collapse in={expanded}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                    {sources.map((source, idx) => (
                        <Link
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="none"
                            sx={{
                                p: 1.5,
                                borderRadius: '12px',
                                backgroundColor: 'rgba(66, 133, 244, 0.05)',
                                border: '1px solid rgba(66, 133, 244, 0.2)',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    backgroundColor: 'rgba(66, 133, 244, 0.15)',
                                    border: '1px solid rgba(66, 133, 244, 0.4)',
                                    transform: 'translateX(4px)',
                                    boxShadow: '0 4px 12px rgba(66, 133, 244, 0.2)',
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <SearchIcon sx={{ fontSize: '1rem', color: '#4285F4', mt: 0.2 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{
                                        color: '#4285F4',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        mb: 0.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}>
                                        {source.title}
                                        <OpenInNewIcon sx={{ fontSize: '0.7rem' }} />
                                    </Typography>
                                    <Typography sx={{
                                        color: 'rgba(255,255,255,0.6)',
                                        fontSize: '0.75rem',
                                        lineHeight: 1.4,
                                    }}>
                                        {source.snippet?.substring(0, 100)}...
                                    </Typography>
                                    <Typography sx={{
                                        color: 'rgba(255,255,255,0.4)',
                                        fontSize: '0.7rem',
                                        mt: 0.5,
                                    }}>
                                        {new URL(source.url).hostname}
                                    </Typography>
                                </Box>
                            </Box>
                        </Link>
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};

const ChatWidget = ({ idea }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Generate or retrieve session ID
        let sid = localStorage.getItem('chat_session_id');
        if (!sid) {
            sid = uuidv4();
            localStorage.setItem('chat_session_id', sid);
        }
        setSessionId(sid);

        // Initial welcome message
        if (messages.length === 0) {
            setMessages([
                { role: 'assistant', content: "Hi! I'm your AI Startup Consultant. Ask me anything about this idea!" }
            ]);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isSearching]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);
        setIsSearching(true);

        try {
            const res = await axios.post(`${API_URL} /api/chat`, {
                session_id: sessionId,
                message: userMsg.content,
                idea_context: {
                    title: idea.title,
                    problem: idea.problem,
                    target_customer: idea.target_customer,
                    tech_stack: idea.tech_stack.join(', '),
                }
            });

            setIsSearching(false);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: res.data.response,
                sources: res.data.sources || [],
                searched: res.data.searched || false
            }]);
        } catch (error) {
            console.error(error);
            setIsSearching(false);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, I'm having trouble thinking right now. Try again?"
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <Tooltip title="Ask AI Consultant">
                <Fab
                    color="primary"
                    aria-label="chat"
                    onClick={() => setIsOpen(!isOpen)}
                    sx={{
                        position: 'fixed',
                        bottom: 32,
                        right: 32,
                        background: 'linear-gradient(45deg, #FF0080, #7928CA)',
                        boxShadow: '0 0 20px rgba(121, 40, 202, 0.6)',
                        zIndex: 1000,
                        '&:hover': {
                            background: 'linear-gradient(45deg, #FF0080, #7928CA)',
                            transform: 'scale(1.1)',
                            boxShadow: '0 0 30px rgba(121, 40, 202, 0.8)',
                        }
                    }}
                >
                    {isOpen ? <CloseIcon /> : <AutoAwesomeIcon />}
                </Fab>
            </Tooltip>

            {/* Chat Window */}
            {isOpen && (
                <Paper
                    elevation={24}
                    sx={{
                        position: 'fixed',
                        bottom: 110,
                        right: 32,
                        width: 380,
                        height: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        borderRadius: '24px',
                        backgroundColor: 'rgba(20, 20, 20, 0.85)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        zIndex: 1000,
                    }}
                >
                    {/* Header */}
                    <Box sx={{
                        p: 2,
                        background: 'linear-gradient(90deg, rgba(121,40,202,0.2) 0%, rgba(255,0,128,0.2) 100%)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, background: 'linear-gradient(45deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            AI Consultant
                        </Typography>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4caf50', boxShadow: '0 0 10px #4caf50' }} />
                    </Box>

                    {/* Messages Area */}
                    <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {messages.map((msg, index) => (
                            <Box key={index} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                <Box
                                    sx={{
                                        maxWidth: '80%',
                                        p: 1.5,
                                        borderRadius: msg.role === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                                        backgroundColor: msg.role === 'user' ? '#7928CA' : 'rgba(255,255,255,0.1)',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.6,
                                        boxShadow: msg.role === 'user' ? '0 4px 15px rgba(121, 40, 202, 0.3)' : 'none',
                                        border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.05)',
                                        '& ul, & ol': {
                                            margin: '8px 0',
                                            paddingLeft: '20px',
                                        },
                                        '& li': {
                                            marginBottom: '4px',
                                        },
                                        '& p': {
                                            margin: '8px 0',
                                            '&:first-of-type': { marginTop: 0 },
                                            '&:last-of-type': { marginBottom: 0 },
                                        },
                                        '& code': {
                                            backgroundColor: 'rgba(0,0,0,0.3)',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            fontFamily: 'monospace',
                                            fontSize: '0.85em',
                                        },
                                        '& pre': {
                                            backgroundColor: 'rgba(0,0,0,0.3)',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            overflowX: 'auto',
                                            margin: '8px 0',
                                        },
                                        '& pre code': {
                                            backgroundColor: 'transparent',
                                            padding: 0,
                                        },
                                        '& strong': {
                                            fontWeight: 700,
                                            color: '#fff',
                                        },
                                        '& em': {
                                            fontStyle: 'italic',
                                            color: 'rgba(255,255,255,0.9)',
                                        },
                                        '& h1, & h2, & h3, & h4, & h5, & h6': {
                                            margin: '12px 0 8px 0',
                                            fontWeight: 600,
                                            '&:first-of-type': { marginTop: 0 },
                                        },
                                    }}
                                >
                                    {msg.role === 'user' ? (
                                        msg.content
                                    ) : (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.content}
                                        </ReactMarkdown>
                                    )}
                                </Box>
                                {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                                    <SourceCitation sources={msg.sources} />
                                )}
                            </Box>
                        ))}
                        {isSearching && <SearchAnimation />}
                        {loading && !isSearching && (
                            <Box sx={{ alignSelf: 'flex-start', p: 1.5, borderRadius: '18px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                                <CircularProgress size={16} sx={{ color: '#fff' }} />
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Ask about pricing, competitors, trends..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: '#fff',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    borderRadius: '20px',
                                    '& fieldset': { borderColor: 'transparent' },
                                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                    '&.Mui-focused fieldset': { borderColor: '#7928CA' },
                                }
                            }}
                        />
                        <IconButton
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            sx={{
                                color: '#fff',
                                backgroundColor: loading ? 'rgba(255,255,255,0.05)' : '#7928CA',
                                '&:hover': { backgroundColor: '#6218ac' },
                                width: 40, height: 40
                            }}
                        >
                            <SendIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Paper>
            )}
        </>
    );
};

export default ChatWidget;


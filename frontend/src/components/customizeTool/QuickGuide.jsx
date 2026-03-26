import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const QuickGuide = () => {
    return (
        <Box sx={{
            bgcolor: '#ffffff',
            borderRadius: '24px',
            p: 3,
            height: '100%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            fontFamily: 'Poppins, sans-serif'
        }}>
            <Box>
                <Typography sx={{
                    fontFamily: '"Fredoka One", cursive',
                    fontSize: '20px',
                    color: '#000',
                    mb: 1
                }}>
                    Quick Guide
                </Typography>
                <Typography sx={{ fontSize: '13px', color: '#888' }}>
                    Innovation & Features
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <CheckCircleOutlineIcon sx={{ color: '#00E783', fontSize: 20 }} />
                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>React Transition</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#888' }}>Full SPA with modular components.</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <CheckCircleOutlineIcon sx={{ color: '#00E783', fontSize: 20 }} />
                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>Front / Back Editing</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#888' }}>Separate designs persisted in React state.</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <AutoAwesomeIcon sx={{ color: '#00E783', fontSize: 20 }} />
                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>AI BG Removal</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#888' }}>Integrated with backend API proxy.</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ mt: 'auto', p: 2, bgcolor: '#f9f9f9', borderRadius: '12px' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, mb: 1 }}>ASSETS AVAILABLE:</Typography>
                <Typography sx={{ fontSize: '11px', color: '#666' }}>
                    • Crew Front/Back<br />
                    • Polo Front/Back
                </Typography>
            </Box>
        </Box>
    );
};

export default QuickGuide;

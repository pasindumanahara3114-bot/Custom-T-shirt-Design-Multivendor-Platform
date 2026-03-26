import { Box, Typography, Chip } from '@mui/material';

const Topbar = ({ side, shirtStyle }) => {
    return (
        <Box sx={{
            height: '70px',
            bgcolor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 4,
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            zIndex: 10,
            fontFamily: 'Poppins, sans-serif'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                    width: 32,
                    height: 32,
                    bgcolor: '#00E783',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 231, 131, 0.3)'
                }}>
                    <Box sx={{ width: 12, height: 12, bgcolor: '#fff', borderRadius: '50%' }} />
                </Box>
                <Box>
                    <Typography sx={{
                        fontFamily: '"Fredoka One", cursive',
                        fontSize: '22px',
                        lineHeight: 1,
                        color: '#000'
                    }}>
                        T-Shirt Studio
                    </Typography>
                    <Typography sx={{
                        fontSize: '11px',
                        color: '#888',
                        letterSpacing: '0.5px'
                    }}>
                        REACT • FABRIC.JS • SPRING BOOT AI
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                    label={`VIEW: ${side.toUpperCase()}`}
                    size="small"
                    sx={{
                        bgcolor: '#F3F3F3',
                        fontWeight: 700,
                        fontSize: '10px',
                        fontFamily: 'Poppins',
                        borderRadius: '6px'
                    }}
                />
                <Chip
                    label={`STYLE: ${shirtStyle === "crew" ? "CREW NECK" : "POLO"}`}
                    size="small"
                    sx={{
                        bgcolor: '#00E783',
                        color: '#000',
                        fontWeight: 700,
                        fontSize: '10px',
                        fontFamily: 'Poppins',
                        borderRadius: '6px'
                    }}
                />
                <Typography sx={{
                    fontSize: '11px',
                    color: '#888',
                    ml: 2,
                    display: { xs: 'none', md: 'block' }
                }}>
                    <span style={{ fontWeight: 800, color: '#000' }}>Tip:</span> Select object before editing
                </Typography>
            </Box>
        </Box>
    );
};

export default Topbar;

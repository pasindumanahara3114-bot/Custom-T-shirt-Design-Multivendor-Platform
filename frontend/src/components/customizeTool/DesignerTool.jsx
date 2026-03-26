import React, { useState } from 'react';
// import '../../styles/App.css'; // Removed as requested
import Topbar from './Topbar';
import ControlPanel from './ControlPanel';
import DesignCanvas from './DesignCanvas';
import QuickGuide from './QuickGuide';
import { Box } from '@mui/material';

function DesignerTool() {
    const [side, setSide] = useState('front');
    const [shirtStyle, setShirtStyle] = useState('crew');
    const [shirtColor, setShirtColor] = useState('#ffffff');
    const [canvas, setCanvas] = useState(null);
    const [designs, setDesigns] = useState({
        front: null,
        back: null
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            bgcolor: '#f1f0ee',
            overflow: 'hidden',
            fontFamily: 'Poppins, sans-serif'
        }}>
            <Topbar side={side} shirtStyle={shirtStyle} />

            <Box sx={{
                display: 'flex',
                flex: 1,
                overflow: 'hidden',
                p: { xs: 1, md: 3 },
                gap: { xs: 1, md: 3 },
                position: 'relative'
            }}>
                {/* Control Panel (Left) */}
                <Box sx={{
                    width: { xs: '100%', md: '300px' },
                    height: '100%',
                    display: { xs: 'none', md: 'block' },
                    zIndex: 2
                }}>
                    <ControlPanel
                        side={side}
                        setSide={setSide}
                        shirtStyle={shirtStyle}
                        setShirtStyle={setShirtStyle}
                        shirtColor={shirtColor}
                        setShirtColor={setShirtColor}
                        canvas={canvas}
                        designs={designs}
                        setDesigns={setDesigns}
                    />
                </Box>

                {/* Main Canvas (Center) */}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fff',
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
                    position: 'relative',
                    overflow: 'auto',
                    p: 2
                }}>
                    <DesignCanvas
                        side={side}
                        shirtStyle={shirtStyle}
                        shirtColor={shirtColor}
                        onCanvasReady={setCanvas}
                        designs={designs}
                        setDesigns={setDesigns}
                    />
                </Box>

                {/* Quick Guide (Right) */}
                <Box sx={{
                    width: { xs: '100%', md: '280px' },
                    height: '100%',
                    display: { xs: 'none', lg: 'block' },
                    zIndex: 2
                }}>
                    <QuickGuide />
                </Box>
            </Box>
        </Box>
    );
}

export default DesignerTool;

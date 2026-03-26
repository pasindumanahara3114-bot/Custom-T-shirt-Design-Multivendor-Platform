import React from 'react';
import axios from 'axios';
import * as fabricModule from 'fabric';
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Stack, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Handle both ESM and CJS import styles
const fabric = fabricModule.fabric || fabricModule;

const ControlPanel = ({
    side,
    setSide,
    shirtStyle,
    setShirtStyle,
    shirtColor,
    setShirtColor,
    canvas,
    designs,
    setDesigns
}) => {
    // ... logic remains same
    const handleTextAdd = () => {
        if (!canvas) return;
        const text = new fabric.Textbox('Your Text', {
            left: 150,
            top: 240,
            width: 220,
            fontSize: 34,
            fill: '#000000',
            fontWeight: 'bold',
            fontFamily: 'Poppins'
        });
        canvas.add(text);
        text.bringToFront();
        canvas.setActiveObject(text);
        canvas.renderAll();
    };

    const handleTextColor = (e) => {
        if (!canvas) return;
        const obj = canvas.getActiveObject();
        if (obj && (obj.type === 'textbox' || obj.type === 'text')) {
            obj.set('fill', e.target.value);
            canvas.renderAll();
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !canvas) return;
        const removeBg = document.getElementById("removeBgChk").checked;
        if (removeBg) {
            try {
                const formData = new FormData();
                formData.append("image", file);
                const response = await axios.post("/api/bg-remove", formData, { responseType: 'blob' });
                const imageURL = URL.createObjectURL(response.data);
                addImgToCanvas(imageURL);
            } catch (err) { alert("AI Background Removal failed: " + err.message); }
        } else {
            const reader = new FileReader();
            reader.onload = (event) => addImgToCanvas(event.target.result);
            reader.readAsDataURL(file);
        }
        e.target.value = "";
    };

    const addImgToCanvas = (url) => {
        fabric.Image.fromURL(url, (img) => {
            img.scaleToWidth(150);
            img.set({ left: 185, top: 200 });
            canvas.add(img);
            img.bringToFront();
            canvas.setActiveObject(img);
            canvas.renderAll();
        });
    };

    const handleDelete = () => {
        const obj = canvas?.getActiveObject();
        if (obj && (obj.type !== 'image' || obj.selectable !== false)) {
            canvas.remove(obj);
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    };

    const handleExport = () => {
        if (!canvas) return;
        canvas.discardActiveObject();
        canvas.renderAll();
        const dataURL = canvas.toDataURL({ format: 'png', quality: 1.0 });
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = `tshirt-${shirtStyle}-${side}.png`;
        a.click();
    };

    const handleSideSwitch = (newSide) => {
        if (newSide === side) return;
        const designObjs = canvas.getObjects().filter(o => o.selectable !== false);
        const json = JSON.stringify(designObjs.map(o => o.toObject()));
        setDesigns(prev => ({ ...prev, [side]: json }));
        setSide(newSide);
    };

    return (
        <Box sx={{
            bgcolor: '#ffffff',
            borderRadius: '24px',
            p: 3,
            height: '100%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            fontFamily: 'Poppins, sans-serif',
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': { bgcolor: '#e0e0e0', borderRadius: '10px' }
        }}>
            <Box sx={{ mb: 1 }}>
                <Typography sx={{ fontFamily: '"Fredoka One", cursive', fontSize: '20px', color: '#000' }}>
                    Controls
                </Typography>
                <Typography sx={{ fontSize: '11px', color: '#888', fontWeight: 600 }}>DESIGN YOUR SHIRT</Typography>
            </Box>

            <Divider sx={{ mb: 1 }} />

            {/* Shirt Options */}
            <Stack gap={2}>
                <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#333' }}>SHIRT OPTIONS</Typography>

                <FormControl fullWidth size="small">
                    <InputLabel sx={{ fontFamily: 'Poppins', fontSize: '13px' }}>T-shirt Style</InputLabel>
                    <Select
                        value={shirtStyle}
                        label="T-shirt Style"
                        onChange={(e) => setShirtStyle(e.target.value)}
                        sx={{ borderRadius: '12px', bgcolor: '#f9f9f9', fontFamily: 'Poppins', fontSize: '13px' }}
                    >
                        <MenuItem value="crew">No Collar (Crew Neck)</MenuItem>
                        <MenuItem value="polo">Collar (Polo)</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        fullWidth
                        variant={side === 'front' ? "contained" : "outlined"}
                        onClick={() => handleSideSwitch('front')}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontFamily: 'Poppins',
                            fontWeight: 700,
                            bgcolor: side === 'front' ? '#00E783' : 'transparent',
                            color: '#000',
                            border: side === 'front' ? 'none' : '1px solid #e0e0e0',
                            '&:hover': { bgcolor: side === 'front' ? '#00c670' : '#f5f5f5' }
                        }}
                    >
                        Front
                    </Button>
                    <Button
                        fullWidth
                        variant={side === 'back' ? "contained" : "outlined"}
                        onClick={() => handleSideSwitch('back')}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontFamily: 'Poppins',
                            fontWeight: 700,
                            bgcolor: side === 'back' ? '#00E783' : 'transparent',
                            color: '#000',
                            border: side === 'back' ? 'none' : '1px solid #e0e0e0',
                            '&:hover': { bgcolor: side === 'back' ? '#00c670' : '#f5f5f5' }
                        }}
                    >
                        Back
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f9f9f9', p: 1.5, borderRadius: '12px' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Shirt Tint</Typography>
                    <input
                        type="color"
                        value={shirtColor}
                        onChange={(e) => setShirtColor(e.target.value)}
                        style={{ border: 'none', width: '25px', height: '25px', borderRadius: '4px', cursor: 'pointer' }}
                    />
                </Box>
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* Design Controls */}
            <Stack gap={2}>
                <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#333' }}>DESIGN ELEMENTS</Typography>

                <Button
                    startIcon={<AddIcon />}
                    fullWidth
                    variant="contained"
                    onClick={handleTextAdd}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        bgcolor: '#000',
                        color: '#fff',
                        '&:hover': { bgcolor: '#222' }
                    }}
                >
                    Add Text
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f9f9f9', p: 1.5, borderRadius: '12px' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Text Color</Typography>
                    <input
                        type="color"
                        defaultValue="#000000"
                        onChange={handleTextColor}
                        style={{ border: 'none', width: '25px', height: '25px', borderRadius: '4px', cursor: 'pointer' }}
                    />
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 1 }}>Logo Upload</Typography>
                    <Button
                        component="label"
                        variant="outlined"
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                        sx={{ borderRadius: '12px', textTransform: 'none', fontFamily: 'Poppins', borderStyle: 'dashed', py: 1, color: '#666' }}
                    >
                        Choose File
                        <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
                    </Button>
                </Box>

                <FormControlLabel
                    control={<Switch id="removeBgChk" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00E783' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#00E783' } }} />}
                    label={
                        <Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 700 }}>AI Background Removal</Typography>
                            <Typography sx={{ fontSize: '10px', color: '#888' }}>Powered by Spring Boot AI</Typography>
                        </Box>
                    }
                    sx={{ m: 0, justifyContent: 'space-between', flexWrap: 'wrap', width: '100%', flexDirection: 'row-reverse' }}
                />
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* Actions */}
            <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    sx={{ borderRadius: '12px', textTransform: 'none', flex: 1, fontFamily: 'Poppins', fontWeight: 700 }}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    onClick={handleExport}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        flex: 1,
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        bgcolor: '#00E783',
                        color: '#000',
                        '&:hover': { bgcolor: '#00c670' }
                    }}
                    startIcon={<FileDownloadIcon />}
                >
                    Export
                </Button>
            </Box>
        </Box>
    );
};

export default ControlPanel;

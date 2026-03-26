import React, { useEffect, useRef } from 'react';
import * as fabricModule from 'fabric';
import { Box, Typography } from '@mui/material';

// Handle both ESM and CJS import styles
const fabric = fabricModule.fabric || fabricModule;

const DesignCanvas = ({
    side,
    shirtStyle,
    shirtColor,
    onCanvasReady,
    designs,
    setDesigns
}) => {
    // ... (logic remains same)
    const canvasRef = useRef(null);
    const fabricRef = useRef(null);
    const shirtImgRef = useRef(null);
    const CANVAS_W = 520;
    const CANVAS_H = 640;

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            preserveObjectStacking: true,
            width: CANVAS_W,
            height: CANVAS_H,
            selection: true
        });
        fabricRef.current = canvas;
        onCanvasReady(canvas);
        return () => { if (canvas) canvas.dispose(); };
    }, []);

    useEffect(() => {
        if (!fabricRef.current) return;
        loadShirt();
    }, [side, shirtStyle]);

    useEffect(() => {
        applyTint();
    }, [shirtColor]);

    const getShirtFile = (side, style) => {
        const base = '/design/';
        if (style === "crew") return side === "front" ? `${base}crew-front.png` : `${base}crew-back.png`;
        return side === "front" ? `${base}polo-front.png` : `${base}polo-back.png`;
    };

    const applyTint = () => {
        const shirtImg = shirtImgRef.current;
        if (!shirtImg || !fabricRef.current) return;
        if (shirtColor.toLowerCase() === "#ffffff") {
            shirtImg.filters = [];
        } else {
            shirtImg.filters = [
                new fabric.Image.filters.BlendColor({
                    color: shirtColor,
                    mode: 'multiply',
                    alpha: 0.85
                })
            ];
        }
        shirtImg.applyFilters();
        fabricRef.current.renderAll();
    };

    const loadShirt = () => {
        const canvas = fabricRef.current;
        const url = getShirtFile(side, shirtStyle);
        fabric.Image.fromURL(url, (img) => {
            // Calculate scale to fit both width and height
            const scale = Math.min(CANVAS_W / img.width, (CANVAS_H - 40) / img.height);
            img.scale(scale);

            // Center the image
            img.set({
                left: (CANVAS_W - img.width * scale) / 2,
                top: (CANVAS_H - img.height * scale) / 2,
                selectable: false,
                evented: false
            });
            canvas.clear();
            shirtImgRef.current = img;
            canvas.add(img);
            canvas.sendToBack(img);
            applyTint();
            restoreDesign();
            canvas.renderAll();
        });
    };

    const restoreDesign = () => {
        const canvas = fabricRef.current;
        const designJSON = designs[side];
        if (!designJSON) return;
        const objsData = JSON.parse(designJSON);
        fabric.util.enlivenObjects(objsData, (enlivened) => {
            enlivened.forEach(obj => {
                canvas.add(obj);
                obj.bringToFront();
            });
            canvas.renderAll();
        });
    };

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            fontFamily: 'Poppins, sans-serif'
        }}>
            <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography sx={{ fontFamily: '"Fredoka One", cursive', fontSize: '20px', color: '#000' }}>
                    Canvas
                </Typography>
                <Typography sx={{ fontSize: '11px', color: '#888', fontWeight: 600 }}>DRAG • RESIZE • ROTATE</Typography>
            </Box>

            <Box sx={{
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                bgcolor: '#fff',
                lineHeight: 0
            }}>
                <canvas ref={canvasRef} />
            </Box>
        </Box>
    );
};

export default DesignCanvas;

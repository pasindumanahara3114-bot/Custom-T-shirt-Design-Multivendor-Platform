import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, MenuItem, Select, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Using standard path imports for highest compatibility
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function Signup() {
    const navigate = useNavigate();
    const [role, setRole] = useState('Customer');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = (e) => {
        e.preventDefault();
        console.log('Signup attempt:', { ...formData, role });
    };

    const textFieldStyles = {
        bgcolor: '#F3F3F3',
        borderRadius: '5px',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        input: { fontFamily: 'Poppins', fontSize: '13px', py: '10px' }
    };

    const selectStyles = {
        bgcolor: '#F3F3F3',
        borderRadius: '5px',
        fontFamily: 'Poppins',
        fontSize: '13px',
        '.MuiSelect-select': {
            py: '10px',
            color: role ? '#000' : '#a0a0a0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
    };

    return (
        <Box sx={{
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f1f0ee',
            p: { xs: '10px', sm: 2 },
            boxSizing: 'border-box'
        }}>
            <Box sx={{
                width: { xs: '95%', sm: 500 },
                maxWidth: 500,
                bgcolor: '#ffffff',
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 3,
                boxSizing: 'border-box',
                p: { xs: '20px', sm: '40px' }
            }}>

                <Typography sx={{
                    fontFamily: '"Fredoka One", cursive',
                    fontWeight: 'bold',
                    fontSize: { xs: '28px', sm: '32px' },
                    color: '#000000',
                    textAlign: 'center',
                    lineHeight: 1,
                    mb: '15px'
                }}>
                    T-Shirt Studio
                </Typography>

                <Typography sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#888888',
                    textAlign: 'center',
                    lineHeight: 1.5,
                    mb: '30px'
                }}>
                    Create your account to start designing unique T-shirts.
                </Typography>

                <Box component="form" onSubmit={handleSignup} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px', color: '#000', mb: '-10px' }}>
                        Join the Studio
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                        <TextField
                            placeholder="Full Name *"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            size="small"
                            required
                            sx={textFieldStyles}
                        />
                        <TextField
                            placeholder="Email Address *"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            size="small"
                            required
                            sx={textFieldStyles}
                        />
                        <TextField
                            placeholder="Password *"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            size="small"
                            required
                            sx={textFieldStyles}
                        />

                        <FormControl size="small" sx={{ width: '100%' }}>
                            <Select
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                displayEmpty
                                sx={selectStyles}
                            // Temporarily removing IconComponent to isolate the error
                            // IconComponent={KeyboardArrowDownIcon}
                            >
                                <MenuItem value="Customer" sx={{ fontFamily: 'Poppins', fontSize: '13px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <ShoppingBagIcon sx={{ fontSize: 18, color: '#00E783' }} /> Customer
                                    </Box>
                                </MenuItem>
                                <MenuItem value="Provider" sx={{ fontFamily: 'Poppins', fontSize: '13px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <PersonIcon sx={{ fontSize: 18, color: '#00E783' }} /> Provider
                                    </Box>
                                </MenuItem>
                                <MenuItem value="Admin" sx={{ fontFamily: 'Poppins', fontSize: '13px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <AdminPanelSettingsIcon sx={{ fontSize: 18, color: '#00E783' }} /> Admin
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
                        <Button
                            type="submit"
                            sx={{
                                width: '100%',
                                height: 45,
                                bgcolor: '#00E783',
                                color: '#000000',
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                fontSize: '15px',
                                borderRadius: '8px',
                                '&:hover': { bgcolor: '#00c670' },
                                textTransform: 'none'
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>

                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 200,
                    mt: '25px',
                    '&::before, &::after': {
                        content: '""',
                        flex: 1,
                        borderBottom: '1px solid #e0e0e0'
                    }
                }}>
                    <Typography sx={{ fontFamily: 'Poppins', fontSize: '12px', color: '#888', px: '10px' }}>
                        or
                    </Typography>
                </Box>

                <Typography sx={{ fontFamily: 'Poppins', fontSize: '12px', color: '#00000080', mt: '30px', textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link href="/login" underline="none" sx={{ color: '#00E783', fontWeight: 500 }}>
                        Login
                    </Link>
                </Typography>

            </Box>
        </Box>
    );
}

export default Signup;

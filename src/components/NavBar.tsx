import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';
import {ORDER_TREND,COMPANY_TREND,NEW_USER,INACTIVE_USER} from '../shared/global_constants';
import '../shared/css/NavBar.css';

export default function NavBar() {
    
    return (    
            <AppBar position="static" style={{ background: '#54B948' ,marginLeft:0,marginRight:0,marginTop:0}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        e-Commerce Analytics
                    </Typography>
                    <Stack direction='row' spacing={1}>
                        <Button color='inherit' >{ORDER_TREND}</Button>
                        <Button color='inherit'>{COMPANY_TREND}</Button>
                        <Button color='inherit'>{NEW_USER}</Button>
                        <Button color='inherit'>{INACTIVE_USER}</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
    )
}

import React from 'react';
import {logout} from '../store/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }
  return (<Button data-cy="logout-btn" variant='contained' color='error' onClick={handleLogout}>Logout</Button>)
}

export default Logout;

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const ResponsiveAppBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isLogged = useSelector((state: RootState) => state.auth.isloggedin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (isLogged) {
      dispatch(logout());
      setTimeout(() => navigate("/"), 200);
    }
    else {
      setTimeout(() => navigate("/login"), 200);
    }
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component="img" src="/Icon.jpeg" alt="Logo" sx={{ height: 50, width: 50, mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Contract Management App</Typography>


          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button component={Link} to="/" color="inherit" sx={{ textTransform: 'none' }}>Home</Button>
            <Button component={Link} to="/contracts" color="inherit" sx={{ textTransform: 'none' }} data-cy="nav-contracts" >Contracts</Button>
            <Button component={Link} to="/points" color="inherit" sx={{ textTransform: 'none' }} data-cy="nav-points">Points</Button>
            <Button component={Link} to="/invoice" color="inherit" sx={{ textTransform: 'none' }} data-cy="nav-invoice">Invoices</Button>
            <Button
              onClick={handleAuth}
              color="inherit"
              data-cy={isLogged ? "logout-btn" : "login-link"}
            >
              {isLogged ? 'Logout' : 'Login'}
            </Button>

          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton aria-label="menu" color="inherit" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>Home</MenuItem>
              <MenuItem component={Link} to="/contracts" onClick={handleCloseNavMenu} data-cy="nav-contracts">Contracts</MenuItem>
              <MenuItem component={Link} to="/points" onClick={handleCloseNavMenu} data-cy="nav-points">Points</MenuItem>
              <MenuItem component={Link} to="/invoice" onClick={handleCloseNavMenu} data-cy="nav-invoice">Invoices</MenuItem>
              <MenuItem
                onClick={handleAuth}
                data-cy={isLogged ? "logout-btn" : "login-link"}
              >
                {isLogged ? 'Logout' : 'Login'}
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;

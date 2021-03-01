import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  MenuItem,
  Menu,
  useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: { flexGrow: 1 },
  headerOptions: { margin: '0 10px' },
}));

const Header = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (routerURL) => {
    history.push(routerURL);
    setAnchorEl(null);
  };

  const menuItems = [
    {
      menuTitle: 'Dashboard',
      pageURL: '/dashboard',
    },
    {
      menuTitle: 'Add',
      pageURL: '/newdream',
    },
    {
      menuTitle: 'Journal',
      pageURL: '/dreamjournal',
    },
    {
      menuTitle: 'Logout',
      pageURL: '/',
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{background: 'orange'}}>
          <Typography variant="h6" className={classes.title} style={{color: 'black'}}>
            VIVID
          </Typography>
          <div>
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuItems.map((menuItem) => {
                    return (
                      <MenuItem
                        key={menuItem.menuTitle}
                        onClick={() => handleMenuClick(menuItem.pageURL)}
                      >
                        {menuItem.menuTitle}
                      </MenuItem>
                    );
                  })}
                </Menu>{' '}
              </>
            ) : (
              <div className={classes.headerOptions}>
                {menuItems.map((menuItem) => {
                  return (
                    <Button
                      key={menuItem.menuTitle}
                      onClick={() => handleMenuClick(menuItem.pageURL)}
                    >
                      {menuItem.menuTitle}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {!navigator.onLine && (
        <div
          style={{
            textAlign: 'center',
            background:
              'linear-gradient(180deg, rgba(255,70,37,1) 0%, rgba(51,34,0,1) 100%)',
          }}
        >
          <Typography>Currently Offline</Typography>
        </div>
      )}
    </div>
  );
};

export default withRouter(Header);

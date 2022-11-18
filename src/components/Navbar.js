  
import React, { useEffect, useContext, useRef } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { getYears, getCurrentYear } from './Handlers';
import { Link, useLocation } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { getAuth, signOut  } from "firebase/auth";
import { useHistory } from "react-router-dom";

import UserDataContext from '../hooks/UserData';
import getFirebase from '../firebase-config';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Navbar = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const history = useHistory();
  const userData = useContext(UserDataContext);
  const user = useRef(userData);
  useEffect(() => {
    user.current = userData;
  }, [userData]);
  const auth = getAuth();
  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(!state);
  };
  const logout = () => {
    signOut(auth).then(()=>{
      console.log('User Logged in successfully ');
      if(props && props.onSingOut) {
        props.onSingOut(null);
      }
      history.push('/');
    });
  };
  const navigateTo = (root) => {
    history.push(`/${root}`);
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
            <ListItem button key={'dashboard'}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          {user.current.currentUser?.isAdmin ? (
            <>
            <ListItem button key={'dashboard'} >
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={'Dashboard '} onClick={() => navigateTo('dashboard')} />
            </ListItem>
            {/* <ListItem button key={'patients'}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={'Patients'} />
            </ListItem>
            <ListItem button key={'allpatients'}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={'All Patients '} />
            </ListItem> */}
            <ListItem button key={'createuser'}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText onClick={() => navigateTo('createuser')} primary={'Create New Patient'} />
            </ListItem>
            <ListItem button key={'dietmaster'}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText onClick={() => navigateTo('dietmaster')} primary={'Diet Master'} />
            </ListItem>
            </>) : null
          }
      </List>
      <Divider />
      <List>
        {user.current.currentUser?.user ? (
            <ListItem button key={'logout'} onClick={logout} >
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={'Logout'} />
            </ListItem>
          ) : null
        }
      </List>
    </div>
  );

  return (
    <>
    <CssBaseline />
    <ElevationScroll {...props}>
      <AppBar position="fixed">
        <Toolbar>

        <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit" 
          aria-label="menu" onClick={toggleDrawer()} >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            AB Diets
          </Typography>
        </Toolbar>
      </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Drawer 
          anchor={'left'} 
          open={state} 
          onClose={toggleDrawer('left', false)}>
          {list('left')}
        </Drawer>
      </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '35%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  btnFix: {
    paddingRight: '0',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default React.memo(Navbar);
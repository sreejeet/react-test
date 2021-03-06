import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Form from './components/Form'
import UserList from './components/List'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
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

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            User info dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Router>
        <div>

          <nav>
            <ul>
              <li>
                <Link to="/user-list">List data</Link>
              </li>
              <li>
                <Link to="/user-form">User form</Link>
              </li>
            </ul>
          </nav>

          <Container>
            <Switch>
              <Route component={Form} exact path='/user-form' />
              <Route component={UserList} exact path='/user-list' />
              <Route>
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="h3" noWrap>
                    Welcome to user info dashboard
                  </Typography>
                  <Divider />
                </div>
              </Route>
            </Switch>
          </Container>

        </div>
      </Router>

      {console.log('build 0.3')}
    </div >
  );

}
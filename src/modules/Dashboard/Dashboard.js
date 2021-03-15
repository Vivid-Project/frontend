import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import TonesOverTime from '../../Analytics/TonesOverTime';

import { theme } from '../../themes/theme';
import { AppBar, Fab, Toolbar, Container } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    background: '#ff5722',
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  graph: {
    marginBottom: '2em',
    '& .MuiSvgIcon-root': {
      color: 'orange',
    },
  },
}));

const Dashboard = () => {
  const user = useContext(UserContext);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <main>
        <h3>Welcome{user.name && <span>, {user.name.split(' ')[0]}</span>}</h3>
        <Container className={classes.graph} component="div" maxWidth="sm">
          <TonesOverTime />
        </Container>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar variant="dense">
            <Link to="/newdream">
              <Fab
                aria-label="add"
                data-testid="addButton"
                className={classes.fabButton}
              >
                <AddIcon />
              </Fab>
            </Link>
          </Toolbar>
        </AppBar>
      </main>
    </ThemeProvider>
  );
};

export default Dashboard;

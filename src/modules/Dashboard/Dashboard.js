import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import DoughnutChart from '../../common/ToneGraph';
import UserContext from '../Context/UserContext';
import DreamCard from '../DreamCard/DreamCard';
import * as API from '../../API/APIcalls';

import fakeTone from '../../data/fakeTone';

import { theme } from '../../themes/theme';
import { Container, Grid, AppBar, Fab } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const Dashboard = () => {
  const [dreams, setDreams] = useState([]);
  const [tones, setTones] = useState([]);
  const user = useContext(UserContext);
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
  }));
  const classes = useStyles();

  useEffect(() => {
    API.fetchUserDreams(user.token).then(
      (response) => {
        setDreams(response.dreams);
      },
      [dreams]
    );
  });

  const recentDreams = dreams.slice(0, 2);
  const MostRecent = recentDreams.map((dream) => {
    return (
      <div key={dream.id}>
        <DreamCard
          date={dream.date}
          id={dream.id}
          title={dream.title}
          description={dream.description}
          toneAnalysis={dream.toneAnalysis}
        />
      </div>
    );
  });
  const toneLabels = Object.keys(tones);
  const toneValues = Object.values(tones);

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Container>
          <h3>
            Welcome{user.name && <span>, {user.name.split(' ')[0]}</span>}
          </h3>
          <Grid>
            {!toneValues.length && (
              <h6>You do not have any data about dream tones yet</h6>
            )}
            <DoughnutChart toneLabels={toneLabels} toneValues={toneValues} />
          </Grid>
          <Grid>
            {!recentDreams.length && <h6>You have not saved any dreams yet</h6>}
            {mostRecent}
          </Grid>
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

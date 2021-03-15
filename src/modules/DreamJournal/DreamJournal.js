import React, { useState, useEffect, useContext } from 'react';
import DreamCard from '../DreamCard/DreamCard';
import UserContext from '../Context/UserContext';
import * as API from '../../API/APIcalls';
import { act } from 'react-dom/test-utils';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';
import Skeleton from '@material-ui/lab/Skeleton';
import { CircularProgress, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    color: 'white',
  },
  loading: {
    width: '16em',
    height: '20em',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '3em',
  },
}));

const DreamJournal = () => {
  const [dreams, setDreams] = useState([]);
  const [dreamsError, setDreamsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const user = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    setDreamsError(false);
    API.fetchUserDreams(user.token).then((response) => {
      if (!response.length) {
        setDreamsError(true);
        setLoading(false);
        return;
      }
      act(() => {
        setDreamsError(false);
        setLoading(false);
        sortAndSetDreams(response);
      });
    });
  }, []);

  const sortAndSetDreams = (dreams) => {
    dreams.sort(
      (dreamA, dreamB) => new Date(dreamB.date) - new Date(dreamA.date)
    );
    setDreams(dreams);
  };

  const dreamCards = dreams.map((dream) => {
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

  if (dreamsError === true) {
    return (
      <div>
        <h2 className={(classes.root, classes.title)}>Dream Journal</h2>
        <h4>
          You do not have any dreams yet. Once a dream is added it will appear
          here
        </h4>
      </div>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Container component="div" maxWidth="sm">
          <h2 className={(classes.root, classes.title)}>Dream Journal</h2>
          {loading && <CircularProgress />}
          {loading && <Skeleton variant="rect" className={classes.loading} />}
          {dreamCards}
        </Container>
      </ThemeProvider>
    );
  }
};

export default DreamJournal;

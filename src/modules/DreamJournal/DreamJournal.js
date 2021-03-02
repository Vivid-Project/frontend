import React, { useState, useEffect, useContext } from 'react';
import DreamCard from '../DreamCard/DreamCard';
import UserContext from '../Context/UserContext';
import * as API from '../../API/APIcalls';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { theme } from '../../themes/theme';
import Skeleton from '@material-ui/lab/Skeleton';

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
  const [dreamDateRange, setDreamDateRange] = useState([0, 6]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const user = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    fetchDreamsForJournal();
  }, [dreamDateRange]);

  const getDateThisManyDaysAgo = (dayModifier) => {
    const date = new Date();
    date.setDate(date.getDate() - dayModifier);

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${yyyy}/${mm}/${dd}`;
  };

  const fetchDreamsForJournal = () => {
    const startDate = getDateThisManyDaysAgo(dreamDateRange[1]);
    const endDate = getDateThisManyDaysAgo(dreamDateRange[0]);

    API.fetchUserDreamsByDates(user.token, startDate, endDate).then(
      (response) => {
        if (response === []) {
          setDreamsError(true);
          setLoading(false);
          return;
        }
        setDreams(dreams.concat(response));
        setDreamsError(false);
        setLoading(false);
      }
    );
  };

  const progressToNextWeeksDates = () => {
    const newDateRange = dreamDateRange.map((date) => (date += 7));
    setDreamDateRange(newDateRange);
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

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h2 className={(classes.root, classes.title)}>Dream Journal</h2>
        {dreamsError && (
          <h2 className={classes.root}>You have not saved any dreams yet</h2>
        )}
        {loading && <Skeleton variant="rect" className={classes.loading} />}
        {dreamCards}
      </div>
      {!loading && (
        <Button
          style={{ margin: theme.spacing(1.5) }}
          variant="contained"
          color="primary"
          onClick={progressToNextWeeksDates}
        >
          Next Week
        </Button>
      )}
      {loading && <CircularProgress />}
    </ThemeProvider>
  );
};

export default DreamJournal;

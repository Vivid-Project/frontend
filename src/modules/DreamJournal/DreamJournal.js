import React, { useState, useEffect, useContext } from 'react';
import DreamCard from '../DreamCard/DreamCard';
import UserContext from '../Context/UserContext';
import * as API from '../../API/APIcalls';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

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
  outterCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    outline: 'none',
    color: 'orange',
    background: '#282c34',
    fontWeight: 400,
  },
  expand: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const DreamJournal = (props) => {
  const { amount } = props
  const classes = useStyles();
  const [dreams, setDreams] = useState([]);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(-1);
  const user = useContext(UserContext);

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  useEffect(() => {
    API.fetchUserDreams(user.token).then((response) => {
      const mostRecentDreams = response.slice(0, (amount + 1))
      setDreams(mostRecentDreams);
    });
  }, []);

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
    )
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h2 className={(classes.root, classes.title)}>Dream Journal</h2>
        {!dreams.length && (
          <h2 className={classes.root}>You have not saved any dreams yet</h2>
        )}
        {dreamCards}
      </div>
    </ThemeProvider>
  );
};

export default DreamJournal;

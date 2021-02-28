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
  expand: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const DreamJournal = () => {
  const [dreams, setDreams] = useState([]);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(-1);
  const [dreamAmount, setDreamAmount ] = useState(7)
  const classes = useStyles();
  const user = useContext(UserContext);

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  useEffect(() => {
    API.fetchUserDreams(user.token).then((response) => {
      const mostRecentDreams = response.slice(0, (dreamAmount))
      setDreams(mostRecentDreams);
    });
  }, []);

  const dreamCards = dreams.map((dream) => {
    return (
      <div>
        <DreamCard
          key={dream.id}
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
        {window.location.pathname === '/dreamjournal' && (
          <h2 className={(classes.root, classes.title)}>Dream Journal</h2>
        )}
        {!dreams.length && (
          <h2 className={classes.root}>You have not saved any dreams yet</h2>
        )}
        {dreamCards}
      </div>
    </ThemeProvider>
  );
};

export default DreamJournal;

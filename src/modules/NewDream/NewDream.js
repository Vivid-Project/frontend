import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { theme } from '../../themes/theme';
import UserContext from '../Context/UserContext'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: theme.spacing(1.5),
    width: '30ch',
  },
  text: {
    color: 'floralwhite',
  },
}));

const NewDream = () => {
  const [dreamTitle, setDreamTitle] = useState(null)
  const [dreamBody, setDreamBody] = useState(null)
  const [error, setError] = useState(false)
  const user = useContext(UserContext)

  const classes = useStyles();

  const submitDream = () => {
    if (!dreamTitle || !dreamBody) {
      setError(true)
      return;
    } else {
      setError(false)
      // API call from here,
      // Route to all Dream Entries
      console.log(dreamTitle + ' ' + dreamBody);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <main className={classes.root}>
        <h2>Dream Input</h2>
        <form noValidate autoComplete="off" className={classes.root}>
          <TextField
            id="dream-title"
            // variant="standard"
            variant="outlined"
            color="primary"
            label="Name Your Dream"
            fullWidth
            className={classes.input}
            InputProps={{
              className: classes.text,
              'data-testid': 'nameInput',
            }}
            onChange={(e) => setDreamTitle(e.target.value)}
          ></TextField>
          <TextField
            id="dream-body"
            variant="outlined"
            color="primary"
            label="Describe Your Dream"
            fullWidth
            multiline
            rowsMax={12}
            onChange={(e) => setDreamBody(e.target.value)}
            className={classes.input}
            InputProps={{
              className: classes.text,
              'data-testid': 'describeInput',
            }}
          ></TextField>
          {(error === true) && <h3>Please ensure both fields are filled before adding the dream</h3>}
          <Button variant="contained" color="primary" onClick={submitDream}>
            Add
          </Button>
        </form>
      </main>
    </ThemeProvider>
  )
};

export default NewDream;

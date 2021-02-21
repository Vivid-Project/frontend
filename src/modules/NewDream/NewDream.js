import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { theme } from '../../themes/theme';

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
  const [dreamTitle, setDreamTitle] = useState(null);
  const [dreamBody, setDreamBody] = useState(null);

  const classes = useStyles();

  const submitDream = () => {
    if (!dreamTitle || !dreamBody) {
      return;
    }
    // API call from here,
    // Route to all Dream Entries
    console.log(dreamTitle + ' ' + dreamBody);
  };

  return (
    <ThemeProvider theme={theme}>
      <main className={classes.root}>
        <h2>Dream Input</h2>
        <form noValidate autoComplete="off" className={classes.root}>
          <TextField
            id="dream-title"
            variant="standard"
            color="primary"
            label="Name Your Dream"
            fullWidth
            className={classes.input}
            InputProps={{
              className: classes.text,
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
            }}
          ></TextField>
          <Button variant="contained" color="primary" onClick={submitDream}>
            Add
          </Button>
        </form>
      </main>
    </ThemeProvider>
  );
};

export default NewDream;

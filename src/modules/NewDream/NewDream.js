import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import * as API from '../../API/APIcalls';

import { TextField, Button, CircularProgress } from '@material-ui/core';
import { theme } from '../../themes/theme';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiInputLabel-outlined': {
      color: 'white',
    },
    '& .MuiInputLabel-outlined.Mui-error': {
      color: 'red',
    },
  },
  input: {
    margin: theme.spacing(1.5),
    width: '30ch',
    color: 'orange',
  },
  text: {
    color: 'floralwhite',
  },
  spinner: {
    marginLeft: 5,
  },
}));

const NewDream = (props) => {
  let { history } = props;
  const [dreamTitle, setDreamTitle] = useState(null);
  const [dreamBody, setDreamBody] = useState(null);
  const [dreamEmotion, setDreamEmotion] = useState(null);
  const [error, setError] = useState({ name: false, desc: false });
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useContext(UserContext);
  const classes = useStyles();

  const SpinnerAdornment = () => (
    <CircularProgress className={classes.spinner} size={20} />
  );

  const submitDream = () => {
    if (!dreamTitle || !dreamBody) {
      setDisabled(false);
      !dreamTitle
        ? setError({ ...error, name: true })
        : setError({ ...error, desc: true });
      setDisabled(false);
      return;
    }
    setDisabled(true);
    setLoading(true);
    setDisabled(true);
    API.postUserDream(user.token, createDate(), dreamTitle, dreamBody, dreamEmotion).then(
      () => {
        setLoading(false);
        history.push('/dreamjournal');
      }
    );
  };

  const createDate = () => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${yyyy}/${mm}/${dd}`;
  };

  useEffect(() => {
    if (!dreamTitle && !dreamBody) {
      return;
    }
    setError({ name: false, desc: false });
  }, [dreamTitle, dreamBody]);

  return (
    <ThemeProvider theme={theme}>
      <main className={classes.root}>
        <h2>Dream Input</h2>
        <form noValidate autoComplete='off' className={classes.root}>
          <TextField
            error={error.name}
            required={error.name}
            id='dream-title'
            variant='standard'
            variant='outlined'
            label='Name Your Dream'
            fullWidth
            className={classes.input}
            InputProps={{
              className: classes.text,
            }}
            onChange={(e) => setDreamTitle(e.target.value)}
          ></TextField>
          <TextField
            error={error.desc}
            required={error.desc}
            id='dream-body'
            variant='outlined'
            color='primary'
            label='Describe Your Dream'
            fullWidth
            multiline
            rowsMax={12}
            onChange={(e) => setDreamBody(e.target.value)}
            className={classes.input}
            data-testid={'describeInput'}
            style={{ color: 'orange' }}
            InputProps={{
              className: classes.text,
            }}
          ></TextField>
          <TextField
            id='dream-emotion'
            variant='outlined'
            color='primary'
            label='Emotion of Dream'
            fullWidth
            multiline
            rowsMax={1}
            onChange={(e) => setDreamEmotion(e.target.value)}
            className={classes.input}
            data-testid={'emotionInput'}
            style={{ color: 'orange' }}
            InputProps={{
              className: classes.text,
            }}
          ></TextField>
          <Button
            variant='contained'
            color='primary'
            disabled={disabled}
            onClick={submitDream}
            data-testid={'submit-dream'}
          >
            {!loading && 'Add'}
            {loading && <SpinnerAdornment />}
          </Button>
        </form>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(NewDream);

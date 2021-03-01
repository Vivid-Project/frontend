import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserContext from '../Context/UserContext';
import * as API from '../../API/APIcalls';

import { theme } from '../../themes/theme';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  spinner: {
    marginLeft: 5,
  },
}));

const NewDream = (props) => {
  let { history } = props;
  const [dreamTitle, setDreamTitle] = useState(null);
  const [dreamBody, setDreamBody] = useState(null);
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
      setDisabled(false)
      !dreamTitle
      ? setError({ ...error, name: true })
      : setError({ ...error, desc: true })
      return
    }
    setDisabled(true);
    setLoading(true);
    API.postUserDream(user.token, createDate(), dreamTitle, dreamBody)
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        setLoading(false);
        history.push('/dreamjournal');
      });
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
        <form noValidate autoComplete="off" className={classes.root}>
          <TextField
            error={error.name}
            required={error.name}
            id="dream-title"
            variant="standard"
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
            error={error.desc}
            required={error.desc}
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
          {/* {error && <h6>{error}</h6>} */}
          <Button variant="contained" color="primary" disabled={disabled} onClick={submitDream}>
            {!loading && 'Add'}
            {loading && <SpinnerAdornment /> }
          </Button>
        </form>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(NewDream);

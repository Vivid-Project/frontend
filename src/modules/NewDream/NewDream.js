import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserContext from '../Context/UserContext';
import * as API from '../../API/APIcalls';

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

const NewDream = (props) => {
  let { history } = props;
  const [dreamTitle, setDreamTitle] = useState(null);
  const [dreamBody, setDreamBody] = useState(null);
  const [error, setError] = useState({ name: false, desc: false });
  const user = useContext(UserContext);

  const classes = useStyles();

  const submitDream = () => {
    if (!dreamTitle || !dreamBody) {
      !dreamTitle
        ? setError({ ...error, name: true })
        : setError({ ...error, desc: true });
      return;
    }
    API.postUserDream(user.token, createDate(), dreamTitle, dreamBody)
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        history.push('/dreamjournal');
      });
  };

  const createDate = () => {
    let d = new Date();
    return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
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
          <Button variant="contained" color="primary" onClick={submitDream}>
            Add
          </Button>
        </form>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(NewDream);

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';

import * as API from '../../API/APIcalls';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import image from '../../assets/login-landing-back.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${image})`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    margin: theme.spacing(1.5),
    width: '30ch',
  },
}));

const Login = (props) => {
  let { history, setUser } = props;
  const theme = useTheme();
  const classes = useStyles();
  const [loginError, setLoginError] = useState(false);
  const [error, setError] = useState({ email: false, password: false });
   const [disabled, setDisabled] = useState(false);
  const [values, setValues] = useState({
    showPassword: false,
    email: '',
    password: '',
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop) => (event) => {
    setLoginError(false);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    setLoginError(false);
    event.preventDefault();
  };

  const checkInputs = () => {
    if (!values.email || !values.password) {
      !values.email
        ? setError({ ...error, email: true })
        : setError({ ...error, password: true });
      return;
    }
  };

  useEffect(() => {
    if (!values.email || !values.password) {
      setDisabled(true)
      return
    }
    setError({ email: false, password: false });
    setDisabled(false)
  }, [values.email, values.password]);

  const loginUser = () => {
    checkInputs();
    if(error === true) {
      return
    } else {
      API.fetchUserLogin(values.email, values.password)
        // API.fetchUserLogin('mjones@example.com', 'password')
        .then((response) => {
            setUser({
              id: response.id,
              name: response.name,
              email: response.email,
              token: `Bearer ${response.token}`,
            })
          })
            .then(() => history.push('/dashboard'))
            .catch(error => setLoginError(true))
        }
    }
      
    
  return (
    <ThemeProvider theme={theme}>
      <main className={classes.root}>
        <form noValidate autoComplete="off" className={classes.root}>
          <h1 style={{ marginTop: theme.spacing(15) }}>VIVID</h1>
          <TextField
            error={error.email}
            required={error.email}
            id="email"
            color="primary"
            label="Email"
            required={true}
            className={classes.input}
            onChange={handleChange('email')}
          ></TextField>
          <TextField
            error={error.password}
            required={error.password}
            id="dream-body"
            color="primary"
            label="Password"
            required={true}
            type={values.showPassword ? 'text' : 'password'}
            className={classes.input}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          ></TextField>{' '}
          <Button variant="contained" color="primary" disabled={disabled} onClick={loginUser}>
            Login
          </Button>
          {loginError && <h2>No account matches that email or password</h2>}
        </form>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(Login);

import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import * as API from '../../API/APIcalls';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import image from '../../assets/login-landing-back.jpg';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
  FilledInput,
  Button,
  InputAdornment,
  IconButton,
  Container,
} from '@material-ui/core';

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

const SignUp = (props) => {
  let { history, setUser } = props;
  const theme = useTheme();
  const classes = useStyles();
  const [signUpError, setSignUpError] = useState(false);
  const [duplicateWarning, setduplicateWarning] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!values.name || !values.email || !values.password) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [values.name, values.email, values.password]);

  const loginUser = () => {
    API.fetchUserLogin(values.email, values.password)
      .then((response) => {
        setUser({
          id: response.id,
          name: response.name,
          email: response.email,
          token: `Bearer ${response.token}`,
        });
      })
      .then(() => history.push('/dashboard'))
      .catch((error) => setLoginError(true));
  };

  const createUser = () => {
    setSignUpError(false);
    setduplicateWarning(false);
    API.createNewUser(values.name, values.email, values.password).then(
      (response) => {
        console.log(response);
        debugger;
        if (response.status === 409) {
          setDisabled(true);
          setduplicateWarning(true);
          return;
        } else if (response.email === values.email) {
          loginUser(values.email, values.password);
        } else if (response.status === 400) {
          setSignUpError(true);
          return;
        }
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <main className={classes.root}>
        <form noValidate autoComplete='off' className={classes.root}>
          <h1 style={{ marginTop: theme.spacing(15) }}>VIVID</h1>
          <FilledInput
            id='name'
            color='primary'
            placeholder='Name'
            className={classes.input}
            onChange={handleChange('name')}
          ></FilledInput>
          <FilledInput
            id='email'
            color='primary'
            placeholder='Email'
            className={classes.input}
            onChange={handleChange('email')}
          ></FilledInput>
          <FilledInput
            id='password'
            color='primary'
            placeholder='Password'
            type={values.showPassword ? 'text' : 'password'}
            className={classes.input}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          ></FilledInput>{' '}
          {duplicateWarning && (
            <h5>
              It looks like there is already an account matching this email,
              please try signing in
            </h5>
          )}
          {signUpError && <h5>Oh no there was an error please try again</h5>}
          {loginError && <h5>No account with that email or password</h5>}
          <Button
            variant='contained'
            color='primary'
            onClick={createUser}
            disabled={disabled}
            style={{ margin: '1em' }}
          >
            Sign Up!
          </Button>
          Already have an account?
          <Button
            variant='contained'
            color='primary'
            href='/'
            style={{ marginTop: '1em' }}
          >
            Login
          </Button>
        </form>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(SignUp);
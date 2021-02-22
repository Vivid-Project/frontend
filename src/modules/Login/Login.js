import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';

import FilledInput from '@material-ui/core/FilledInput';
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

const Login = ({ setUser }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [values, setValues] = useState({
    showPassword: false,
    username: '',
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

  const loginUser = () => {
    setUser({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <main className={classes.root}>
        <form noValidate autoComplete="off" className={classes.root}>
          <h1 style={{ marginTop: theme.spacing(15) }}>VIVID</h1>
          <FilledInput
            id="username"
            color="primary"
            placeholder="Username"
            className={classes.input}
            onChange={handleChange('username')}
          ></FilledInput>
          <FilledInput
            id="dream-body"
            color="primary"
            placeholder="Password"
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
          ></FilledInput>{' '}
          <Link
            to="/dashboard"
            style={{
              textDecoration: 'none',
            }}
          >
            <Button variant="contained" color="secondary" onClick={loginUser}>
              Login
            </Button>
          </Link>
        </form>
      </main>
    </ThemeProvider>
  );
};

export default Login;

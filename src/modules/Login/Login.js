import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { theme } from '../../themes/theme';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <h1>Login</h1>
        <Link to="/dashboard">LOGIN</Link>
      </main>
    </ThemeProvider>
  );
};

export default Login;

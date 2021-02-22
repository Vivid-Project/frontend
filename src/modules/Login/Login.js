import React from 'react';
import { Link } from 'react-router-dom';
import FilledInput from '@material-ui/core/FilledInput';
import Button from '@material-ui/core/Button';
import { theme } from '../../themes/theme';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
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

const Login = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          ></FilledInput>
          <FilledInput
            id="dream-body"
            color="primary"
            placeholder="Password"
            type={values.showPassword ? 'text' : 'password'}
            className={classes.input}
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
            <Button variant="contained" color="secondary">
              Login
            </Button>
          </Link>
        </form>
      </main>
    </ThemeProvider>
  );
};

export default Login;

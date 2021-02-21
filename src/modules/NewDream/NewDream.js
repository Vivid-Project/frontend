import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { orange, blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 36,
    },
  },
  palette: {
    primary: {
      main: orange[400],
    },
    secondary: {
      main: blue[400],
    },
  },
});

const NewDream = () => {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <h1>Dream Input</h1>
        <form noValidate autoComplete="off">
          <TextField
            id="dream-title"
            variant="standard"
            color="primary"
            label="Name Your Dream"
            fullWidth
          ></TextField>
          {/* <TextField
            id="dream-date"
            variant="outlined"
            color="primary"
            type="date"
          ></TextField> */}
          <TextField
            id="dream-body"
            variant="outlined"
            color="primary"
            label="Describe Your Dream"
            fullWidth
            multiline
            rowsMax={12}
            style={{
              margin: '15px 0',
            }}
          ></TextField>
        </form>
        <Button variant="contained" color="primary">
          LOG
        </Button>
      </main>
    </ThemeProvider>
  );
};

export default NewDream;

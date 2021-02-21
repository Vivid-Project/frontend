import { createMuiTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[400],
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        position: 'relative',
        '& $notchedOutline': {
          borderColor: 'floralwhite',
        },
      },
    },
  },
});

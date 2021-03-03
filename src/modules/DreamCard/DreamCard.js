import React, { useState, useEffect } from 'react';
import PieChart from '../../Analytics/ToneGraph';
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  IconButton,
  Collapse,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { orange } from '@material-ui/core/colors';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'orange',
    background: '#282c34',
    display: 'flex-box',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    boxShadow:
      '11px 12px 1px -1px rgb(0 0 0 / 20%), inset 6px 11px 2px 0px rgb(0 0 0 / 14%), 19px 20px 3px 0px rgb(0 0 0 / 12%)',
    display: 'flex-box',
    justifyContent: 'center',
    alignItems: 'stretch',
    color: 'orange',
    width: '17em',
    background: '#282c34',
    borderColor: 'orange',
    margin: '2em',
  },
  button: {
    alightItems: 'right',
  },
  typography: {
    h2: {
      fontsize: 36,
    },
  },
  palette: {
    primary: {
      main: orange[400],
    },
  },
}));

const DreamCard = ({ id, date, title, description, toneAnalysis }) => {
  const [tones, setTones] = useState([]);
  const classes = useStyles();
  const [expandedId, setExpandedId] = useState(-1);
  const toneLabels = Object.keys(tones);
  const toneValues = Object.values(tones);

  useEffect(() => {
    setTones(toneAnalysis.tone_strength);
  }, []);

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid className={classes.palette.primary} container justify='center'>
          <CardActions
            disableSpacing
            variant='subtitle2'
            style={{ textAlign: 'right' }}
          >
            <Card
              key={id}
              id={id}
              style={{ margin: '.5em', padding: '.5em' }}
              className={classes.card}
            >
              {' '}
              <Typography
                variant='subtitle1'
                style={{ margin: '1em', textAlign: 'left' }}
              >
                {date}
              </Typography>
              <CardHeader
                title={title}
                style={{ padding: '0', textAlign: 'center' }}
                onClick={() => handleExpandClick(id)}
              />
              <IconButton
                onClick={() => handleExpandClick(id)}
                aria-expanded={expandedId === id}
                aria-label='show more'
                className={classes.root}
              >
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={expandedId === id} timeout='auto' unmountOnExit>
                <CardContent className={classes.content}>
                  {toneLabels.length > 1 && (
                    <PieChart toneLabels={toneLabels} toneValues={toneValues} />
                  )}
                  <p style={{ textAlign: 'left' }}>{description}</p>
                </CardContent>
              </Collapse>
            </Card>
          </CardActions>
        </Grid>
      </div>
    </ThemeProvider>
  );
};
export default DreamCard;

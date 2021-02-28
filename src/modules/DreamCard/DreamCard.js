import React, { useState, useEffect } from 'react';
import PieChart from '../../common/ToneGraph';
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
import fakeTone from '../../data/fakeTone';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'orange',
    background: '#282c34',
    display: 'flex',
    // justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    display: 'flex-box',
    justifyContent: 'center',
    alignItems: 'stretch',
    color: 'orange',
    width: '17em',
    background: '#282c34',
    borderColor: 'orange',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  expand: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
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
  const [dreams, setDreams] = useState([]);
  const [expandedId, setExpandedId] = useState(-1);
  const toneLabels = Object.keys(tones);
  const toneValues = Object.values(tones);
  useEffect(() => {
    setTones(fakeTone.toneStrength);
  });

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  // const toneLabels = Object.keys(toneAnalysis);
  // const toneValues = Object.values(toneAnalysis);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid className={classes.palette.primary} container justify='center'>
          <Card
            key={id}
            id={id}
            style={{ margin: '1em'}}
            className={classes.card}
          >
            {' '}
            <Typography
              variant="subtitle1"
              color="orange"
              style={{ marginTop: '.5em', textAlign: 'left' }}
            >
              {date}
            </Typography>
            <CardHeader title={title} style={{ padding: '0' }} />
            <CardActions
              disableSpacing
              variant="subtitle2"
              style={{ textAlign: 'right' }}
            >
              <IconButton
                className={classes.root}
                onClick={() => handleExpandClick(id)}
                aria-expanded={expandedId === id}
                aria-label="show more"
                style={{ textAlign: 'right' }}
              >
                <ExpandMoreIcon style={{ textAlign: 'right' }} />
              </IconButton>
            </CardActions>
            <Collapse in={expandedId === id} timeout="auto" unmountOnExit>
              <CardContent className={classes.content}>
                <p>{description}</p>
                <PieChart toneLabels={toneLabels} toneValues={toneValues} />
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </div>
    </ThemeProvider>
  );
};
export default DreamCard;

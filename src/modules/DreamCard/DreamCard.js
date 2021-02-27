import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  IconButton,
  Collapse,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { orange } from '@material-ui/core/colors';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'orange',
    background: '#282c34',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    color: 'orange',
  },
  outterCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    outline: 'none',
    color: 'orange',
    background: '#282c34',
    fontWeight: 400,
  },
  card: {
    display: 'flex-box',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'orange',
    width: '17em',
    background: '#282c34',
    borderColor: 'orange',
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
  const classes = useStyles();
  const [dreams, setDreams] = useState([]);
  const [expandedId, setExpandedId] = useState(-1);

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid className={classes.palette.primary}>
          <Card
            key={id}
            id={id}
            style={{ margin: '1em' }}
            className={classes.card}
          >
            <CardHeader title={title} style={{ padding: '0' }} />
            <Typography color="orange">
              {date}
            </Typography>
            <CardActions disableSpacing>
              <IconButton
                className={classes.root}
                onClick={() => handleExpandClick(id)}
                aria-expanded={expandedId === id}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expandedId === id} timeout="auto" unmountOnExit>
              <CardContent>
                <p>{description}</p>
                {/* <p>Dream tones: {toneAnalysis.unique_tones}</p> */}
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </div>
    </ThemeProvider>
  );
};
export default DreamCard;

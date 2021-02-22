import React, { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  IconButton,
  Collapse,
} from '@material-ui/core'
import fakeDreams from '../data/fakeDreams'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { orange } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: ,
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
    margin: '1em',
    outline: 'none',
    color: 'orange',
    background: '#282c34',
    fontWeight: 400,
    width: '20em',
  },
  card: {
    display: 'flex-box',
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: 'orange',
    width: '13em',
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
}))

const DreamCard = ({ id, date, title, description, emotion }) => {
  const classes = useStyles()
  const [dreams, setDreams] = useState([])
  const [expandedId, setExpandedId] = useState(-1)

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i)
  }
  useEffect(() => {
    setDreams(fakeDreams.dreams)
  })

  return (
    <div>
      <Grid className={classes.palette.primary}>
        <Card
          style={{ border: 'none', boxShadow: 'none' }}
          className={classes.outterCard}
          key={id}
        >
          {date}
          <Card
            key={id}
            id={id}
            style={{ margin: '1em'}}
            className={classes.card}
          >
            <CardHeader title={title} />
            <CardActions>
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
                <p>Emotion: {emotion}</p>
              </CardContent>
            </Collapse>
          </Card>
        </Card>
      </Grid>
    </div>
  )
}
export default DreamCard
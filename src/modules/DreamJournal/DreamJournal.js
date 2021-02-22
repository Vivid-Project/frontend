import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  IconButton,
  Collapse,
  Button,
} from '@material-ui/core'
import fakeDreams from '../../data/fakeDreams'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { orange } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import UserContext from '../Context/UserContext'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,  
    color: 'orange',
    background: 'black',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    color: 'orange'
  },
  outterCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '.5em',
    outline: 'none',
    color: 'orange',
    background: 'black',
    fontWeight: 400,
  },
  card: {
    display: 'flex-box',
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: 'orange',
    margin: '1em',
    background: 'black',
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

const DreamJournal = () => {
  const classes = useStyles()
  const [dreams, setDreams] = useState([])
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState(-1)
  const user = useContext(UserContext)

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i)
  }
//WIll use for API call
  // const getDreams = async () => {
  //   const url = ''
  //   setError('')
  //   try {
  //     const response = await fetch(url)
  //     const dreams = await response.json()
  //     setDreams(dreams)
  //   } catch (error) {
  //     setError(error.message)
  //   }
  // }

  // useEffect(() => {
  //   getDreams()
  // }, [])
  useEffect(() => {
    setDreams(fakeDreams.dreams)
  })

  const dreamCards = dreams.map((dream) => {
    return (
      <Grid className={classes.palette.primary}>
        <Card
          style={{ border: 'none', boxShadow: 'none' }}
          className={(classes.outterCard)}
          key={dream.id}
        >
          {dream.date}
          <Card
            key={dream.id}
            id={dream.id}
            style={{ margin: '1em', width: '40m' }}
            className={classes.card}
          >
            <CardHeader title={dream.title} />
            <CardActions>
              <IconButton
                className={classes.root}
                onClick={() => handleExpandClick(dream.id)}
                aria-expanded={expandedId === dream.id}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expandedId === dream.id} timeout="auto" unmountOnExit>
              <CardContent>
                <p>{dream.description}</p>
                <p>Emotion: {dream.emotion}</p>
              </CardContent>
            </Collapse>
          </Card>
        </Card>
      </Grid>
    )
  })

  return (
    <div style={{background: 'black'}}>
        <Link to="/dashboard">
          <Button className={classes.root}>Home</Button>
        </Link>
        <h1 className={classes.root, classes.title}>Dream Journal</h1>
        {!dreams.length && <h2 className={classes.root}>You have not saved any dreams yet</h2>}
        {dreamCards}
    </div>
  )
}

export default DreamJournal

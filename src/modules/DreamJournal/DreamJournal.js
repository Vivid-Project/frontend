import React, { useState, useEffect } from 'react'
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
import { theme } from '../../themes/theme'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import DreamCard from '../../common/DreamCard'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    color: 'orange',
    background: '#282c34',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    color: 'white'
  },
  outterCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '.5em',
    outline: 'none',
    color: 'orange',
    background: '#282c34',
    fontWeight: 400,
  },
  card: {
    display: 'flex-box',
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: 'orange',
    margin: '1em',
    background: '#282c34',
    borderColor: 'floralWhite',
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
      <div key={dream.id}>
      <DreamCard 
      date={dream.date}
      id={dream.id}
      title={dream.title}
      description={dream.description}
      emotion={dream.emotion}
      />
      </div>

    )
  })

  return (
    <div>
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

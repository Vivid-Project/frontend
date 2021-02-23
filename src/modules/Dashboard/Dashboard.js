import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import DoughnutChart from '../../common/ToneGraph'
import UserContext from '../Context/UserContext'
import DreamCard from '../../common/DreamCard'

import fakeDreams from '../../data/fakeDreams'
import fakeTone from '../../data/fakeTone'

import { theme } from '../../themes/theme'
import { Container, Grid, AppBar, Fab } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'


const Dashboard = () => {
  const [dreams, setDreams] = useState([])
  const [tones, setTones] = useState([])
  const user = useContext(UserContext)
  const useStyles = makeStyles((theme) => ({
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      background: '#ff5722',
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }))
  const classes = useStyles()

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
    setTones(fakeTone.toneStrength)
  })
  const recentDreams = dreams.slice(0, 2)
  const MostRecent = recentDreams.map((dream) => {
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
  const toneLabels = Object.keys(tones)
  const toneValues = Object.values(tones)


  return (
    <ThemeProvider theme={theme}>
      <main>
        <Container>
          <h1>The Dashboard</h1>
          <Grid>
            <DoughnutChart toneLabels={toneLabels} toneValues={toneValues} />
          </Grid>
          <Grid>
            {!recentDreams.length && <h2>You have not saved any dreams yet</h2>}
            {MostRecent}
          </Grid>
        </Container>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Link to="/newdream">
              <Fab aria-label="add" className={classes.fabButton}>
                <AddIcon />
              </Fab>
            </Link>
          </Toolbar>
        </AppBar>
      </main>
    </ThemeProvider>
  )
}

export default Dashboard

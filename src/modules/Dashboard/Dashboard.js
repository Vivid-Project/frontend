
 import React, { useState, useEffect } from 'react'
 import { Link } from 'react-router-dom'
 import { MDCRipple } from '@material/ripple'
 import { Card, Container, Grid } from '@material-ui/core'
import DreamCard from '../../common/DreamCard'
import fakeDreams from '../../data/fakeDreams'
import { makeStyles } from '@material-ui/core/styles'
 
 const Dashboard = () => {
   const [dreams, setDreams] = useState([])
  
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
  const recentDreams = dreams.slice(0,2)
  console.log(recentDreams)
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
  
   return (
     <main>
       <Container>
         <h1>The Dashboard</h1>
         <Link to="/dreamjournal">Dream Journal</Link>
         <Link to="/newdream">Log a Dream</Link>
         <Link to="/analytics">My Dream Data</Link>
         <Grid>
           <h5 className="mdc-card--outlined">Mini Analytics</h5>
         </Grid>
         <Grid>
           {!recentDreams.length && <h2>You have not saved any dreams yet</h2>}
           {MostRecent}
         </Grid>
       </Container>
     </main>
   )
 }

 export default Dashboard
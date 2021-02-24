import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import DreamJournal from './DreamJournal'
import fakeDreams from '../../data/fakeDreams'
import DreamCard from '../DreamCard/DreamCard'

describe.only('DreamJournal', () => {
  it('should render DreamCards', () => {
    const fakeDreamsData = fakeDreams.dreams[0]
    render(
      <BrowserRouter>
        <DreamCard 
          key={fakeDreamsData.id}
          id={fakeDreamsData.id}
          date={fakeDreamsData.date}
          title={fakeDreamsData.title}
          description={fakeDreamsData.description}
          emotion={fakeDreamsData.emotion}
        />
      </BrowserRouter>
    )
    expect(screen.getByText('Forest dream')).toBeInTheDocument()
    expect(screen.getByText('January Wed 01')).toBeInTheDocument()
  })
})

import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Dashboard from './Dashboard'
import { fetchUserDreams, fetchUserDreamsByDates } from '../../API/APIcalls'
import user from '../../data/fakeUser'
import UserContext from '../Context/UserContext'
import fakeDreams from '../../data/fakeDreams'
import { act } from 'react-dom/test-utils';
jest.mock('../../API/APIcalls')


describe('Dashboard', () => {
  it('should render the dashboard', () => {
    act(() => {
      fetchUserDreamsByDates.mockResolvedValueOnce(fakeDreams.dreams)
      render(
        <MemoryRouter>
          <UserContext.Provider value={user}>
            <Dashboard />
          </UserContext.Provider>
        </MemoryRouter>
      )
    })
    expect(screen.getByText('Welcome')).toBeInTheDocument()
    expect(screen.getByText('Your dreams over the past')).toBeInTheDocument();
    expect(screen.getByTestId('addButton')).toBeInTheDocument()
    expect(screen.getByText('Emotion Tags')).toBeInTheDocument()
  })
})

import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewDream from './NewDream'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'


describe('NewDream', () => {
  it('should render a form to add a new dream', () => {
    render(
      <NewDream />
    )
    const nameInput = screen.getByTestId('nameInput')
    const describeInput = screen.getByTestId('describeInput')

    expect(screen.getByText('Dream Input')).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(describeInput).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })
})
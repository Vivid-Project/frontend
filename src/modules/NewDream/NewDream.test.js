import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewDream from './NewDream';
import { MemoryRouter } from 'react-router-dom';
import user from '../../data/fakeUser';
import UserContext from '../Context/UserContext';
import userEvent from '@testing-library/user-event';
jest.mock('../../API/APIcalls');

describe('NewDream', () => {
  it('should render a form to add a new dream', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <NewDream />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const nameInput = screen.getByTestId('nameInput');
    const describeInput = screen.getByTestId('describeInput');

    expect(screen.getByText('Dream Input')).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(describeInput).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('should not post the users dream when an imput field is empty', () => {
    const postUserDream = jest.fn()
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <NewDream />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const addButton = screen.getByText('Add');

    userEvent.type(screen.getByTestId('nameInput'), 'Crazy dream');
    userEvent.click(addButton);

    expect(postUserDream).not.toHaveBeenCalled();
  })
});

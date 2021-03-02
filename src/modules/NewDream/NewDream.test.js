import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewDream from './NewDream';
import { MemoryRouter } from 'react-router-dom';
import user from '../../data/fakeUser';
import UserContext from '../Context/UserContext';
import userEvent from '@testing-library/user-event';
import { postUserDream } from '../../API/APIcalls';
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

  it.only('should not post the users dream when an imput field is empty', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <NewDream />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const addButton = screen.getByText('Add');

    userEvent.type(screen.getByTestId('nameInput'), 'Crazy dream');
    userEvent.type(screen.getByTestId('describeInput'), 'There were blue cows');

    userEvent.click(addButton);

    expect(postUserDream).not.toHaveBeenCalled();
  });

  it('shoule render a loading button when a new dream is added', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <NewDream />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const addButton = screen.getByText('Add');
    userEvent.type(screen.getByTestId('nameInput'), 'Crazy dream');
    userEvent.type(screen.getByTestId('describeInput'), 'There were blue cows');
    userEvent.click(addButton);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(postUserDream).toHaveBeenCalled();
  });
});

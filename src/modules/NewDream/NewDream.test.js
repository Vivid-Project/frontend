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
    const nameInput = screen.getByLabelText('Name Your Dream');
    const describeInput = screen.getByLabelText('Describe Your Dream');
    const emotionInput = screen.getByLabelText('Emotion of Dream');
    const addButton = screen.getByText('Add');

    expect(screen.getByText('Dream Input')).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(describeInput).toBeInTheDocument();
    expect(emotionInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it('should not post the users dream when an input field is empty', () => {
    const postUserDream = jest.fn();
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <NewDream />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const addButton = screen.getByText('Add');

    userEvent.type(screen.getByLabelText('Name Your Dream'), 'Crazy dream');
    userEvent.click(addButton);
    expect(screen.getByLabelText('Describe Your Dream *'));

    expect(postUserDream).not.toHaveBeenCalled();
  });

  it('should show an error when the describe input is empty', () => {
    const postUserDream = jest.fn();
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <NewDream />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const addButton = screen.getByText('Add');

    userEvent.type(screen.getByLabelText('Name Your Dream'), 'Crazy dream');
    userEvent.click(addButton);
    expect(screen.getByLabelText('Describe Your Dream *'));

    expect(postUserDream).not.toHaveBeenCalled();
  });

  it('should show an error when the title field is empty', () => {
    const postUserDream = jest.fn();
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <NewDream />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const addButton = screen.getByText('Add');

    userEvent.type(
      screen.getByLabelText('Describe Your Dream'),
      'I was baking a cake'
    );
    userEvent.click(addButton);
    expect(screen.getByLabelText('Name Your Dream *'));

    expect(postUserDream).not.toHaveBeenCalled();
  });

  it('should reflect what is typed into the form in the values', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <NewDream />
        </UserContext.Provider>
      </MemoryRouter>
    );
    userEvent.type(screen.getByLabelText('Name Your Dream'), 'Spooky dream');
    userEvent.type(
      screen.getByLabelText('Describe Your Dream'),
      'There was a ghost'
    );
    userEvent.type(screen.getByLabelText('Emotion of Dream'), 'Scary');

    expect(screen.getByLabelText('Name Your Dream').value).toEqual(
      'Spooky dream'
    );
    expect(screen.getByLabelText('Describe Your Dream').value).toEqual(
      'There was a ghost'
    );
    expect(screen.getByLabelText('Emotion of Dream').value).toEqual('Scary');
  });
});

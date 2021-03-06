import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import SignUp from './SignUp';
import userEvent from '@testing-library/user-event';
import user from '../../data/fakeUser';
jest.mock('../../API/APIcalls');

describe('SignUp', () => {
  it('should render a signup form ', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign Up!')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  }),
    it('it should refeclt what is typed in the values', () => {
      render(
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      );

      userEvent.type(screen.getByPlaceholderText('Name'), 'Zoe');
      userEvent.type(
        screen.getByPlaceholderText('Email'),
        'cexample@example.com'
      );
      userEvent.type(screen.getByPlaceholderText('Password'), 'bestpassword');

      expect(screen.getByPlaceholderText('Name').value).toEqual('Zoe');
      expect(screen.getByPlaceholderText('Email').value).toEqual(
        'cexample@example.com'
      );
      expect(screen.getByPlaceholderText('Password').value).toEqual(
        'bestpassword'
      );
    });

    it('sign up button should be disabled if an input is empty', () => {
      const createNewUser = jest.fn();
      render(
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      );

      const signUpButton = screen.getByText('Sign Up!');

      userEvent.type(screen.getByPlaceholderText('Name'), 'Zoe');
      userEvent.type(
        screen.getByPlaceholderText('Email'),
        'cexample@example.com'
      );
      userEvent.click(signUpButton);

      expect(createNewUser).not.toHaveBeenCalled();
    });
});

import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import Login from './Login';
import userEvent from '@testing-library/user-event';
import user from '../../data/fakeUser';

describe('Login', () => {
  it('should render a place for email and password', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('VIVID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('it should refeclt what is typed in the values', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    userEvent.type(
      screen.getByPlaceholderText('Email'),
      'bexample@example.com'
    );
    userEvent.type(screen.getByPlaceholderText('Password'), 'bestpassword');

    expect(screen.getByPlaceholderText('Email').value).toEqual(
      'bexample@example.com'
    );
    expect(screen.getByPlaceholderText('Password').value).toEqual(
      'bestpassword'
    );
  });
});

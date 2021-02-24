import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Dashboard from './Dashboard';
import fakeTone from '../../data/fakeTone';

describe('Dashboard', () => {
  it('should render the dashboard', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText('The Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('addButton')).toBeInTheDocument();
  });

  it('should render a message if there are no dreams', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(
      screen.getByText('You have not saved any dreams yet')
    ).toBeInTheDocument();
  });

  it.skip('should render a message if there is no data for dream tones', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(
      screen.getByText('You do not have any data about dream tones yet')
    ).toBeInTheDocument();
  });
});

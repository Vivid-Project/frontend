import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import DreamJournal from './DreamJournal';
import UserContext from '../Context/UserContext';
import DreamCard from '../DreamCard/DreamCard';

import userEvent from '@testing-library/user-event';
import user from '../../data/fakeUser';
import fakeDreams from '../../data/fakeDreams';
import { fetchUserDreams } from '../../API/APIcalls';
jest.mock('../../API/APIcalls');

describe('DreamJournal', () => {
  it('should render dream cards', async () => {
    act(() => {
      fetchUserDreams.mockResolvedValueOnce([
        {
          id: 4,
          date: '2021/02/22',
          title: 'Forest dream',
          description:
            'I was walking through a forest when I met a talking bird',
          toneAnalysis: {
            tone_strength: {
              Analytical: 1,
              Anger: 2,
              Sadness: 2,
              Tentative: 5,
            },
            unique_tones: 'Sadness, Tentative, Anger, Analytical',
          },
        },
      ]);

      render(
        <UserContext.Provider value={user}>
          <DreamJournal />
        </UserContext.Provider>
      );
    });
    const dreamOne = await waitFor(() => screen.getByText('Forest dream'))
    
    expect(screen.getByText('Dream Journal')).toBeInTheDocument();
    expect(dreamOne).toBeInTheDocument()
  });

  it.only('should have a message when a user has no dreams', async () => {
    act(() => {
      fetchUserDreams.mockResolvedValueOnce([]);
    });
    render(
      <UserContext.Provider value={user}>
        <DreamJournal />
      </UserContext.Provider>
    );
    
  await waitFor(() => {
    expect(
      screen.getByText(
        'You do not have any dreams yet. Once a dream is added it will appear here'
      )
    ).toBeInTheDocument();
  })
    screen.debug()
  });
});

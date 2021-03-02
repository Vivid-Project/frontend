import { screen, render } from '@testing-library/react';
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

  it('should render dream cards', () => {
    act(() => {
     fetchUserDreams.mockResolvedValueOnce([{
        id: 4,
        date: '2021/02/22',
        title: 'Forest dream',
        description: 'I was walking through a forest when I met a talking bird',
        toneAnalysis: {
          tone_strength: {
            Analytical: 1,
            Anger: 2,
            Sadness: 2,
            Tentative: 5,
          },
          unique_tones: 'Sadness, Tentative, Anger, Analytical',
        },
      }]);

      render(
        <UserContext.Provider value={user}>
          <DreamJournal />
        </UserContext.Provider>
      );
    });

    expect(screen.getByText('Dream Journal')).toBeInTheDocument();
  });
});

import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import DreamCard from './DreamCard';
import { act } from 'react-dom/test-utils';

describe('DreamCard', () => {
  it('should render a dream card showing a title', () => {
    let mockToneAnalysis = {
      tone_strength: {
        Analytical: 1,
        Anger: 2,
        Sadness: 2,
        Tentative: 5,
      },
    };
    render(
      <DreamCard
        id={22}
        title='Creepy dream'
        description='I was in the woods and it was creepy'
        date='June Tuesday 22'
        toneAnalysis={mockToneAnalysis}
      />
    );
    expect(screen.getByText('Creepy dream')).toBeInTheDocument();
    expect(screen.getByText('June Tuesday 22')).toBeInTheDocument();
  });

  it('should show the details of the card when the show more arrow is presses', () => {
    act(() => {
      let mockToneAnalysis = {
        tone_strength: {
          Analytical: 1,
          Anger: 2,
          Sadness: 2,
          Tentative: 5,
        },
      };
      render(
        <DreamCard
          id={24}
          title='Happy cloud'
          description='I was jumping on a cloud'
          date='2021/02/23'
          toneAnalysis={mockToneAnalysis}
        />
      );
    });

    expect(screen.getByText('2021/02/23'));
    expect(screen.getByText('Happy cloud')).toBeInTheDocument();
    act(() => {
      const showMoreButton = screen.getByLabelText('show more');
      userEvent.click(showMoreButton);
    });
    expect(screen.getByText('I was jumping on a cloud')).toBeInTheDocument();
    expect(screen.getByTestId('pieGraph')).toBeInTheDocument();
  });
});

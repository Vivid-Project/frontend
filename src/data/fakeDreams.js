const fakeDreams = {
  dreams: [
    {
      id: 4,
      date: '2021/22/02',
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
    },
    {
      id: 1,
      date: '2021/23/02',
      title: 'Bear dream',
      description: 'A bear bit me',
      toneAnalysis: {
        tone_strength: {
          Analytical: 4,
          Anger: 1,
          Joy: 3,
          Sadness: 2,
          Tentative: 1,
        },
        unique_tones: 'Joy, Sadness, Tentative, Anger, Analytical',
      },
    },
    {
      id: 2,
      date: '2021/24/02',
      title: 'Bug dream',
      description: 'A bug landed on me',
      toneAnalysis: {
        tone_strength: {
          Analytical: 1,
          Anger: 3,
          Joy: 2,
          Sadness: 2,
        },
        unique_tones: 'Joy, Sadness, Tentative, Anger, Analytical',
      },
    },
    {
      id: 3,
      date: '2021/25/02',
      title: 'Dog dream',
      description: 'I was walking a dog',
      toneAnalysis: {
        tone_strength: {
          Analytical: 1,
          Joy: 2,
          Sadness: 4,
          Tentative: 1,
        },
        unique_tones: 'Joy, Sadness, Tentative, Anger, Analytical',
      },
    },
  ],
};

export default fakeDreams;

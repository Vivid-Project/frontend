import React, { useState, useEffect, useContext } from 'react';
import DreamCard from '../DreamCard/DreamCard';
import UserContext from '../Context/UserContext';
import * as API from '../../API/APIcalls';
import { act } from 'react-dom/test-utils';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';
import Skeleton from '@material-ui/lab/Skeleton';
import { CircularProgress, Container, Button } from '@material-ui/core';
import Modal from 'react-modal';
import { Subtitles } from '@material-ui/icons';
Modal.setAppElement('body');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    color: 'white',
  },
  loading: {
    width: '16em',
    height: '20em',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '3em',
  },
  searchArea: {
    content: {
      top: '36%',
      left: '67%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-83%, -45%)',
      background: 'rgb(78 127 144)',
      opacity: '90%',
    },
  },
}));

const DreamJournal = () => {
  var subtitle;
  const [dreams, setDreams] = useState([]);
  const [dreamsError, setDreamsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const user = useContext(UserContext);
  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [searchModalIsOpen, setSeachModalIsOpen] = useState(false);
  

  const searchForDream = (searchWord) => {
    let foundDreams = [];
    closeSearchModal();
    const searchTerm = searchInput
    const results = dreams.filter((dream) => {
      if (dream.title.includes(searchTerm)) {
        foundDreams.push(dream);
      } else if (dream.emotion.includes(searchTerm)) {
        if (!foundDreams.includes(dream)) {
          foundDreams.push(dream);
        }
      } else if (dream.description.includes(searchTerm)) {
        if (!foundDreams.includes(dream)) {
          foundDreams.push(dream);
        }
      }
      setDreams(foundDreams);
    });
  };

  const openSearchModal = () => {
    setSeachModalIsOpen(true);
  };

  const afterOpenSearchModal= () => {
    subtitle.style.color = 'orange'
  }

  const closeSearchModal = () => {
    setSeachModalIsOpen(false)
    setSearchInput('')
  }

  useEffect(() => {
    setLoading(true);
    setDreamsError(false);
    API.fetchUserDreams(user.token).then((response) => {
      if (!response.length) {
        setDreamsError(true);
        setLoading(false);
        return;
      }
      act(() => {
        setDreamsError(false);
        setLoading(false);
        sortAndSetDreams(response);
      });
    });
  }, []);

  const sortAndSetDreams = (dreams) => {
    dreams.sort(
      (dreamA, dreamB) => new Date(dreamB.date) - new Date(dreamA.date)
    );
    setDreams(dreams);
  };

  const dreamCards = dreams.map((dream) => {
    return (
      <div key={dream.id}>
        <DreamCard
          date={dream.date}
          id={dream.id}
          title={dream.title}
          description={dream.description}
          toneAnalysis={dream.toneAnalysis}
          emotion={dream.emotion}
        />
      </div>
    );
  });

  if (dreamsError === true) {
    return (
      <div>
        <h2 className={(classes.root, classes.title)}>Dream Journal</h2>
        <h4>
          You do not have any dreams yet. Once a dream is added it will appear
          here
        </h4>
      </div>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Container component='div' maxWidth='sm'>
          <h2 className={(classes.root, classes.title)}>Dream Journal</h2>
          <Button
            variant='contained'
            color='secondary'
            onClick={openSearchModal}
          >
            Search
          </Button>
          <Modal
            isOpen={searchModalIsOpen}
            onAfterOpen={afterOpenSearchModal}
            onRequestClose={closeSearchModal}
            style={classes.searchArea}
            contentLabel='Search jokes modal'
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
              Search for a joke here
            </h2>
            <form>
              <input
                className='search-area'
                style={{ fontSize: 20 }}
                type='search'
                placeholder='Search'
                name='searchInput'
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
              {/* {inputError === true && (
                <h2>Please add search parameter before submitting</h2>
              )} */}
              <Button
                variant='contained'
                color='secondary'
                data-testid='search-button'
                onClick={searchForDream}
              >
                Search
              </Button>
              <Button
                className='modal-buttons'
                variant='contained'
                color='primary'
                onClick={closeSearchModal}
              >
                CLOSE
              </Button>
            </form>
          </Modal>
          {loading && <CircularProgress />}
          {loading && <Skeleton variant='rect' className={classes.loading} />}
          {dreamCards}
        </Container>
      </ThemeProvider>
    );
  }
};

export default DreamJournal;

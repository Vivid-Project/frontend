// This generetor can be used to populate data for any user on the BE

import * as API from '../API/APIcalls';
import fakeDescriptions from './fakeDescriptions';

const DreamGen = () => {
  const userEmail = 'adrew@example.com';
  const amountToGenerate = 30;

  const createDate = (dayModifier) => {
    const date = new Date();

    if (dayModifier) {
      date.setDate(date.getDate() - dayModifier);
    }

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${yyyy}/${mm}/${dd}`;
  };
  let i = 0;

  const generateDreams = (e) => {
    e.preventDefault();
    API.fetchUserLogin(userEmail).then((response) => {
      console.log(response);
      let token = `Bearer ${response.token}`;
      while (i < amountToGenerate) {
        const title = Math.floor(Math.random() * 1000);
        const desc = fakeDescriptions[i];
        const date = createDate(i);
        // console.log({ token, date, title, desc });
        API.postUserDream(token, date, title, desc).then((r) => {
          console.log(r);
        });
        i++;
      }
    });
  };

  return <button onClick={generateDreams}>GENERATE</button>;
};

export default DreamGen;

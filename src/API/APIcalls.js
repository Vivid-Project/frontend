import fakeDreams from '../data/fakeDreams';
import user from '../data/fakeUser';

export const fetchUserLogin = async (email) => {
  return user;
  // try {
  // const response = await fetch(
  //   'https://vivid-project-backend.herokuapp.com/users/authenticate',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //     }),
  //   }
  // );
  //   return await response.json();
  // } catch (error) {
  //   return console.log(error);
  // }
};

export const fetchUserDreams = async (token, dateStart, dateEnd) => {
  return fakeDreams;

  // try {
  //   const response = await fetch(
  //     'https://vivid-project-backend.herokuapp.com/dreams',
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       },
  //     }
  //   );
  //   return await response.json();
  // } catch (error) {
  //   return console.log(error);
  // }
};

export const postUserDream = async (token, date, title, desc) => {
  try {
    const response = await fetch(
      'https://vivid-project-backend.herokuapp.com/dreams',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          date: date,
          title: title,
          description: desc,
          emotion: null,
        }),
      }
    );
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

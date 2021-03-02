export const fetchUserLogin = async (email, password) => {
    const response = await fetch(
      'https://vivid-project-backend.herokuapp.com/users/authenticate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )
   if(response.status >=200 && response.status <= 299) {
     const jsonResponse = await response.json()
     return jsonResponse
   } else {
     return console.log(`Error! Code: ${response.status}`)
   }
};

export const fetchUserDreams = async (token) => {
  try {
    const response = await fetch(
      `https://vivid-project-backend.herokuapp.com/dreams`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const fetchUserDreamsByDates = async (token, dateStart, dateEnd) => {
  try {
    const response = await fetch(
      `https://vivid-project-backend.herokuapp.com/dreams?dateStart=${dateStart}&dateEnd=${dateEnd}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const postUserDream = async (token, date, title, description) => {
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
          date,
          title,
          description,
          emotion: null,
        }),
      }
    );
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

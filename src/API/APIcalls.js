export const fetchUserLogin = async (email) => {
  try {
    const response = await fetch(
      'https://vivid-project-backend.herokuapp.com/users/authenticate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

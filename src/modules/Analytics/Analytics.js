import React, { useContext } from 'react';
import UserContext from '../Context/UserContext'

const Analytics = () => {
  const user = useContext(UserContext)

  return <h1>Analytics</h1>;
};

export default Analytics;

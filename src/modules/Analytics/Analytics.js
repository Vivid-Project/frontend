import React, { useContext } from 'react';
import UserContext from '../Context/UserContext';
import TonesOverTime from '../../common/LineGraph';

const Analytics = () => {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Analytics</h1>
      <TonesOverTime />
    </>
  );
};

export default Analytics;

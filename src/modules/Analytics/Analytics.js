import React, { useContext, useEffect } from 'react';
import UserContext from '../Context/UserContext';
import TonesOverTime from '../../common/TonesOverTime';

const Analytics = () => {
  const user = useContext(UserContext);

  return (
    <>
      <h5>My Dream Data</h5>
      <TonesOverTime />
    </>
  );
};

export default Analytics;

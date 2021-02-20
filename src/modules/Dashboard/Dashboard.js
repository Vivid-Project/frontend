import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <main>
      <h1>The Dashboard</h1>
      <Link to="/dreamjournal">Dream Journal</Link>
      <Link to="/newdream">Log a Dream</Link>
      <Link to="/analytics">My Dream Data</Link>
    </main>
  );
};

export default Dashboard;

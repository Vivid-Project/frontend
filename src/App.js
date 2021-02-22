import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import UserContext from './modules/Context/UserContext';

import './App.css';
import Dashboard from './modules/Dashboard/Dashboard';
import DreamJournal from './modules/DreamJournal/DreamJournal';
import NewDream from './modules/NewDream/NewDream';
import Analytics from './modules/Analytics/Analytics';
import Login from './modules/Login/Login';

import 'fontsource-roboto';

const App = () => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={user}>
      <main className="App">
        <header className="App-header">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Login {...props} setUser={setUser} />}
            />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dreamjournal" component={DreamJournal} />
            <Route exact path="/newdream" component={NewDream} />
            <Route exact path="/analytics" component={Analytics} />
          </Switch>
        </header>
      </main>
    </UserContext.Provider>
  );
};

export default App;

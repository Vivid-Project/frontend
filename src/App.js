import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './modules/Dashboard/Dashboard';
import DreamJournal from './modules/DreamJournal/DreamJournal';
import NewDream from './modules/NewDream/NewDream';
import Analytics from './modules/Analytics/Analytics';
import Login from './modules/Login/Login';

import 'fontsource-roboto';

const App = () => {
  return (
    <main className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dreamjournal" component={DreamJournal} />
          <Route exact path="/newdream" component={NewDream} />
          <Route exact path="/analytics" component={Analytics} />
        </Switch>
      </header>
    </main>
  );
};

export default App;

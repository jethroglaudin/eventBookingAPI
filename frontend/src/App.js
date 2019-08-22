import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import AuthPage from "./pages/Auth";
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect path="/" to="/auth" exact />
        <Route path="/auth" component={AuthPage} />
        <Route path="/events" component={null} />
        <Route path="/bookings" component={null} />
      </Switch>
    </Router>
  );
}

export default App;

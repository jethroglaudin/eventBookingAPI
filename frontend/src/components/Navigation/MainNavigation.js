import React from "react";
import { NavLink } from "react-router-dom";

const mainNavigation = props => {
  return (
    <header>
      <div className="main-navigation__logo">
        <h1>Event.Me</h1>
      </div>
      <nav className="main-navigation__item">
        <ul>
          <li>
            <NavLink to="/events">Authenticate</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/events">Bookings</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

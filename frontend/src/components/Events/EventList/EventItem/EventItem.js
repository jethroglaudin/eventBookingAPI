import React from "react";

import './EventItem.css'

const eventItem = props => (
  <li key={props.eventId} className="events__list-item">
    {props.title}
  </li>
);

export default eventItem;
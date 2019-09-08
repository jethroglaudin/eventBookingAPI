import React from "react";

import './EventItem.css'

const eventItem = props => (
  <li key={props.eventId} className="events__list-item">
   <div>
       <h1>{props.title}</h1>
       <h2>$19.99</h2>
   </div>
   <div>
       <button>View Details</button>
       <p>You're the owner of this event</p>
   </div>
        
  </li>
);

export default eventItem;
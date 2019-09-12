import React from "react";

const bookingList = props => (
  <ul>
    {props.bookings.map(booking => {
      return (
        <li className="bookings_item">
          <div className="bookings_item-data">
            {booking.event.title} -{" "}
            {new Date(booking.createdAt).toLocaleDateString()}
          </div>
          <div className="bookings__item-actions">
              <button>Cancel</button>
          </div>
        </li>
      );
    })}
  </ul>
);

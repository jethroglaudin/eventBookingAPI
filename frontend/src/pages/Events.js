import React, { Component } from 'react';
import './events.css';

 class EventsPage extends Component {
    render() {
        return (
            <div className="events-control">
                <p>Share you own Events!</p>
               <button className="btn">Create Event</button>
            </div>
        )
    }
}

export default EventsPage;

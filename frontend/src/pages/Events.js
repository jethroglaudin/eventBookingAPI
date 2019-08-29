import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './events.css';

 class EventsPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Backdrop />
                <Modal title="Add Event" canCancel canConfirm>
                    <p>Modal Content</p>
                </Modal>
            <div className="events-control">
                <p>Share you own Events!</p>
               <button className="btn">Create Event</button>
            </div>
            </React.Fragment>
        )
    }
}

export default EventsPage;

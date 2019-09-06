import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './events.css';

 class EventsPage extends Component {
     state = {
         creating: false
     };

     // References
     constructor(props){
         super(props);
         this.titleElRef = React.createRef();
         this.priceElRef = React.createRef();
         this.dateElRef = React.createRef();
         this.descriptionElRef = React.createRef();
     }

     startCreateEventHandler = () => {
         this.setState({creating: true});
     };

     modalConfirmHandler = () => {
         this.setState({creating: false});
     };

     modalCancelHandler = () => {
         this.setState({creating: false});
     }
    render() {
        return (
            <React.Fragment>
                {this.state.creating && <Backdrop />}

               {this.state.creating && 
               <Modal title="Add Event" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}> 
                    <form>
                        <div className="form-control">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" ref={this.titleElRef} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" ref={this.priceElRef} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" ref={this.dateElRef} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" rows="4" ref={this.descriptionElRef} />
                        </div>
                    </form>
                </Modal>}
            <div className="events-control">
                <p>Share you own Events!</p>
               <button className="btn" onClick={this.startCreateEventHandler}>Create Event</button>
            </div>
            </React.Fragment>
        )
    }
}

export default EventsPage;

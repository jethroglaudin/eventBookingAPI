import React from 'react';

const bookingsControl = props => {
    return (
        <div className="bookings-control">
            <button onClick={this.changeOutPutTypeHandler.bind(this, "list")}>
              List
            </button>
            <button onClick={this.changeOutPutTypeHandler.bind(this, "chart")}>
              Chart
            </button>
          </div>
    )
}

export default bookingsControl;
import React, { Component } from 'react'

 class BookingsPage extends Component {
     state ={
         isLoading: false,
         bookings: []
     }
     componentDidMount(){

     }

     fetchBookings = () => {
        const requestBody = {
            query: `
                query {
                  events {
                    _id
                    title
                    description
                    date
                    price
                    creator {
                      _id
                      email
                    }
                  }
                }
              `
          };
      
          fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
              }
              return res.json();
            })
            .then(resData => {
              const events = resData.data.events;
              if (this.isActive) {
                this.setState({ events: events, isLoading: false });
              }
            })
            .catch(err => {
              console.log(err);
              if (this.isActive) {
                this.setState({ isLoading: false });
              }
            });
     }
    render() {
        return (
            <div>
               <h1>The Bookings Page</h1> 
            </div>
        )
    }
}

export default BookingsPage;
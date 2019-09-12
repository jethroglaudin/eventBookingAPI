import React, { Component } from 'react'

 class BookingsPage extends Component {
     state ={
         isLoading: false,
         bookings: []
     }
     componentDidMount(){
      this.fetchBookings();
     }

     fetchBookings = () => {
       this.setState({isLoading: true});
        const requestBody = {
            query: `
                query {
                  bookings {
                    _id
                    createdAt
                    event {
                      _id
                      title
                      date
                    }
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
              const bookings = resData.data.bookings;
              if (this.isActive) {
                this.setState({ bookings: bookings, isLoading: false });
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
               <ul>
                 {this.state.bookings.map(booking => <li>{booking.event.title}  -  {new Date(booking.createdAt).toLocaleDateString()}</li>)}
               </ul>
            </div>
        )
    }
}

export default BookingsPage;
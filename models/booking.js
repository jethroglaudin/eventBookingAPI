const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    // creates created at and updated at for every entry. 
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema);
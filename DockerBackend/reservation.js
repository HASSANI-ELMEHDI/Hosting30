const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  logmentId: String,
  startDate : Date,
  endDate : Date,
  status : String,
  nbrTenants :Number,
  price : Number,
  idLodger : String,
});

const reservation = mongoose.model('Reservation', reservationSchema);

module.exports = reservation;
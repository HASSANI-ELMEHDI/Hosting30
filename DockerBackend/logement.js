const mongoose = require('mongoose');

const logementSchema = new mongoose.Schema({
  type: String,
  id: String,
  listing_url: String,
  name: String,
  description: String,
  house_rules: String,
  medium_url: [String],
  xl_picture_url: [String],
  host_id: String,
  host_name: String,
  host_since: Date,
  host_picture_url: String,
  smart_location: String,
  latitude: Number,
  longitude: Number,
  accommodates: Number,
  price: Number,
  geolocation: {
    lon: Number,
    lat: Number
  },
  Start:Date,
  End:Date
});

const logement = mongoose.model('Logement', logementSchema);

module.exports = logement;
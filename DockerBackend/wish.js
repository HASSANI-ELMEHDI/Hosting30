const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
  logementId: String,
  userId:String
});

const wish = mongoose.model('Wish', wishSchema);

module.exports = wish;
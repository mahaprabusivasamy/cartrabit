const mongoose = require('mongoose');
const { Schema } = mongoose;


// user schema - owner ,customer
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['owner', 'customer'], required: true }
});

module.exports = mongoose.model('User', userSchema);

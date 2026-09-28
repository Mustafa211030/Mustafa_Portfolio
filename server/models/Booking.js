const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
  name:     { type:String, required:true, trim:true },
  email:    { type:String, required:true, trim:true, lowercase:true },
  date:     { type:String, required:true },
  time:     { type:String, required:true },
  topic:    { type:String, required:true },
  notes:    { type:String, maxlength:1000 },
  status:   { type:String, enum:['pending','confirmed','cancelled','completed'], default:'confirmed' },
  meetLink: { type:String },
  ip:       String,
}, { timestamps:true })
module.exports = mongoose.model('Booking', bookingSchema)

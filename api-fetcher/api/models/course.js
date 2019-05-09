const mongoose = require('mongoose')

const kursSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  teacher: String,
  correspondingModule: String,
  moduleId: String,
  credits: Number,
  category: String,
  workspace: String,
  time: String,
  day: String,
  room: String,
  description: String,
  requirements: String,
  firstDate: String,
  maxMembers: Number,
  basicStudies: Boolean
})

module.exports = mongoose.model('Kurs', kursSchema)

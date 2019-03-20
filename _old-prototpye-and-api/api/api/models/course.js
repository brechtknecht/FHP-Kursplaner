const mongoose = require('mongoose')

const kursSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: String,
  attributes : {
    
  },
  included : {
    type : String,
    _id : String
  }
})

module.exports = mongoose.model('Kurs', kursSchema)

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const kursRoutes = require('./api/routes/courses')

// Verbindet sich mit der MongoDB Atlas Datenbank über den bereitgestellten Link
mongoose.connect(
  'mongodb+srv://brechtknecht:Daspasswort90!@brechtknecht-test-x0qjx.mongodb.net/test?retryWrites=true',
  {
    useNewUrlParser: true
  }
)

app.use(morgan('dev'))

// Kümmert sich um die vereinfachte Umgangsweise mit JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Behebt Fehler von nicht sicheren Übertragungen zur API
// * - Der Stern legt fest, welche Quellen Zugriff auf die API haben
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
  )

  // Legt fest welche Arten von Requests an die API gesendet werden dürfen
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUSH, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// Impmentiert die Routes, welche in der API zur Verfügung stehen
app.use('/courses', kursRoutes)

// Solange kein API Call erfolgreich war, sende Standart-Error zurück
app.use((req, res, next) => {
  const error = new Error('Something went really wrong, fool! ❌')
  error.status = 404
  next(error)
})

// Falls von irgendwo in der Applikation ein Error erzeugt wird, wird er hier ausgegeben
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app

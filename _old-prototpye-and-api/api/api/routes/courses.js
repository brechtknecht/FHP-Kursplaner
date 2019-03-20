const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Kurs = require('../models/course')

router.get('/', (req, res, next) => {
  const queries = req.query
  const sort = {}

  // Löscht den Parameter Sort aus den queries, damit die suche nicht abschmiert
  if ('sort_asc' in queries) {
    sort[queries.sort_asc] = 'asc'
    delete queries.sort_asc
  } else if ('sort_desc' in queries) {
    sort[queries.sort_desc] = 'desc'
    delete queries.sort_desc
  }

  Kurs.find(queries)
    .sort(sort)
    .exec()
    .then(courses => {
      const result = {
        results: courses.length,
        queries: queries,
        sort: sort,
        courses: courses.map(course => {
          return {
            course,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/courses/' + course.id + ''
            }
          }
        })
      }
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
})

router.get('/meta/:tag', (req, res, next) => {
  const tag = req.params.tag

  Kurs.find()
    .distinct(tag)
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/ordered', (req, res, next) => {
  Kurs.find()
    .sort({
      category: 'asc'
    })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

// Findet Einträge nach Identifier
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  Kurs.findById(id)
    .exec()
    .then(course => {
      if (course) {
        res.status(200).json(course)
      } else {
        res.status(404).json({
          message: 'No entry found! ❌'
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
})

router.post('/', (req, res, next) => {
  console.log(req.body.attributes.time.fixture.end.minutes.type);
  const course = new Kurs({
    _id: new mongoose.Types.ObjectId(),
    type: req.body.type,
    attributes: {
      type: req.body.attributes.type,
      title: req.body.attributes.title,
      teacher: req.body.attributes.teacher,
      semester: req.body.attributes.semester,
      graduateProgram: req.body.attributes.graduateProgram,
      module: {
        id: req.body.attributes.module.id,
        name: req.body.attributes.module.name,
        category: req.body.attributes.module.category
      },
      time: {
        firstDate: {
          type: req.body.attributes.time.firstDate.type,
          value: req.body.attributes.time.firstDate.value,
          string: req.body.attributes.time.firstDate.string
        },
        fixture: {
          begin: {
            minutes: {
              type: req.body.attributes.time.fixture.begin.minutes.type,
              value: req.body.attributes.time.fixture.begin.minutes.value
            },
            hour: {
              type: req.body.attributes.time.fixture.begin.hour.type,
              value: req.body.attributes.time.fixture.begin.value
            },
            day: {
              type: req.body.attributes.time.fixture.begin.day.type,
              value: req.body.attributes.time.fixture.begin.value
            },
            string: req.body.attributes.time.fixture.begin.string
          },
          end: {
            minutes: {
              type: req.body.attributes.time.fixture.end.minutes.type,
              value: req.body.attributes.time.fixture.end.minutes.value
            },
            hour: {
              type: req.body.attributes.time.fixture.end.hour.type,
              value: req.body.attributes.time.fixture.end.minutes.value
            },
            day: {
              type: req.body.attributes.time.fixture.end.day.type,
              value: req.body.attributes.time.fixture.end.day.value
            },
            string: req.body.attributes.time.fixture.end.string
          }
        }
      },
      room: req.body.attributes.room,
      descriptionText: {
        type: req.body.attributes.descriptionText.type,
        value: req.body.attributes.descriptionText.value
      },
      maxStudents: req.body.attributes.maxStudents,
      credits: req.body.attributes.credits,
      workspace: req.body.attributes.workspace
    },
    included: {
      type: req.body.included.type,
      _id: req.body.included._id
    }
  })

  course
    .save()
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })

  res.status(200).json({
    message: 'POST worked out post 😂',
    createdKurs: course
  })
})

// Bestehende Funktionen
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Kurs.findByIdAndDelete(id)
    .exec()
    .then(message => {
      res.status(200).json({
        text: 'Object has been deleted 🗑',
        message: message
      })
    })
    .catch()
})

router.patch('/:id', (req, res, next) => {
  const id = req.params.id

  const props = req.body

  Kurs.findByIdAndUpdate({
        _id: id
      },
      props
    )
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router

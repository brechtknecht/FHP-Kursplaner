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
            title: course.title,
            teacher: course.teacher,
            correspondingModule: course.correspondingModule,
            moduleId: course.moduleId,
            credits: course.credits,
            category: course.category,
            workspace: course.workspace,
            time: course.time,
            day: course.day,
            room: course.room,
            description: course.description,
            requirements: course.requirements,
            firstDate: course.firstDate,
            maxMembers: course.maxMembers,
            basicStudies: course.basicStudies,
            _id: course.id,
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
    .sort({ category: 'asc' })
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
  const course = new Kurs({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    teacher: req.body.teacher,
    correspondingModule: req.body.correspondingModule,
    moduleId: req.body.moduleId,
    credits: req.body.credits,
    category: req.body.category,
    workspace: req.body.workspace,
    time: req.body.time,
    day: req.body.day,
    room: req.body.room,
    description: req.body.description,
    requirements: req.body.requirements,
    firstDate: req.body.firstDate,
    maxMembers: req.body.maxMembers,
    basicStudies: req.body.basicStudies
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

  Kurs.findByIdAndUpdate(
    {
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

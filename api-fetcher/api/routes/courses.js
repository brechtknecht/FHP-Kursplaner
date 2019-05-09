const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const axios = require('axios');

const Kurs = require('../models/course')

router.get('/', (req, res, next) => {
  axios.get('https://www.fh-potsdam.de/course-api/storage/7087')
    .then((result) => {
      res.status(200).json({
        data: result.data
      })
    });
})

module.exports = router

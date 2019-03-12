const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Sheeesh workt schon wedder 🍉'
  })
})

router.post('/', (req, res, next) => {
  const order = {
    id: req.body.id,
    quantity: req.body.quantity
  }
  res.status(200).json({
    message: 'POST worked out post 😂',
    createdOrder: order
  })
})

router.post('/:id', (req, res, next) => {
  const id = req.params.id
  if (id === 'testy') {
    res.status(200).json({
      message: 'ID is tasty testy 🌡'
    })
  } else {
    res.status(200).json({
      message: 'Hast wohl irgendne andere ID! 💊'
    })
  }
})

router.patch('/', (req, res, next) => {
  res.status(200).json({
    message: 'PATCH worked out post 😂'
  })
})

module.exports = router

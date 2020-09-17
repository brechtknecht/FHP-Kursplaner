const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

// LowDB Database
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const DBState = db.getState()
if(Object.keys(DBState).length === 0 && DBState.constructor === Object) {
    console.log("Database is empty. Create Dummy Data")
    db.defaults({ users: [], count: 0 })
        .write()
}

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the Authentication API'
  });
});

app.post('/api/getUserData', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403)
    } else {
		const userData = db.get('users')
							.find({ passphrase: authData.user.passphrase })

      	res.json({
        	message: 'Found User',
			authData,
			userData
      	})
    }
  })
})

app.post('/api/signIn', (req, res) => {
  // Mock user
  const user = {
    passphrase: req.headers['passphrase']
  }

  const databaseHasPassphrase = db.get('users')
    .find({ passphrase: user.passphrase})
    .value()  

  // If Database does not already have the Users Passphrase Create one
  if(typeof databaseHasPassphrase === 'undefined') {
    db.get('users')
      .push({
          passphrase: user.passphrase,
          data: "Hier kommen die Daten rein"
      })
      .write()
	}


  jwt.sign({user}, 'secretkey', { expiresIn: '7d' }, (err, token) => {
		res.json({
			token
		})
  })
})

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    passphrase: req.headers['passphrase']
  }

  const databaseHasPassphrase = db.get('users')
    .find({ passphrase: user.passphrase})
    .value()

  // If Database does not already have the Users Passphrase Create one
  if(typeof databaseHasPassphrase === 'undefined') {
	  // Error: User is not in the Database return to SignIn
	  res.sendStatus(404)
	  return
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '7d' }, (err, token) => {
    res.json({
      token
    })
  })
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization']
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ')
    // Get token from array
    const bearerToken = bearer[1]
    // Set the token
    req.token = bearerToken
    // Next middleware
    next()
  } else {
    // Forbidden
    res.sendStatus(403)
  }
}

app.listen(5000, () => console.log('Server started on port 5000'))
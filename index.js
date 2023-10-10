const express = require('express')
const DBconnection = require('./DB')
const app = express()

const PORT = 3000
DBconnection()

app.use('/', (req, res) => {
    res.send("<h2>Your App Is Live Now</h2>")
})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})
const express = require('express')
const DBconnection = require('./DB')
const app = express()

const PORT = 3000

DBconnection()

app.use(express.json()); // To parse JSON data
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', require('./Routes/UserRoute/UserRoutes'))

app.use('/', (req, res) => {
    res.send("<h2>Your App Is Live Now</h2>")
})
//Auth Routes

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})
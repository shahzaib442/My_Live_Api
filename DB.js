const mongoose = require('mongoose')

DBconnection().catch(err => console.log(err));

async function DBconnection() {
    await mongoose.connect('mongodb://0.0.0.0:27017/testdb');
}

module.exports = DBconnection
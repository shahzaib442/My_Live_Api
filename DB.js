const mongoose = require('mongoose');

const local = 'mongodb://0.0.0.0:27017/testdb';

// const live = 'mongodb+srv://muhammadshahzaib955:water0346SS@cluster0.0xsvoyy.mongodb.net/my_apis?retryWrites=true&w=majority';
// const live = 'mongodb+srv://muhammadshahzaib955:water0346SS@cluster0.0xsvoyy.mongodb.net/my_apis';
const live = 'mongodb+srv://muhammadshahzaib955:water0346SS@cluster0.0xsvoyy.mongodb.net/my_apis';

DBconnection()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

async function DBconnection() {
    await mongoose.connect(live, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = DBconnection;

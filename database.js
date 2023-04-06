const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('Database connection established');
});

module.exports = db;

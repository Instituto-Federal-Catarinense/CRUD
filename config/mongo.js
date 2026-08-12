const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/crud_sessions';

mongoose.connect(mongoUri, {

})
    .then(() => console.log('Connected to MongoDB for session storage.'))
    .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;

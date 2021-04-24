const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(
  process.env.MONGODB_URI, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
);

const schema = new mongoose.Schema({
  identifier:  {
    type: String,
    unique: true
  }, 
  url: String
})

const ShortLink = mongoose.model('short-link', schema);

module.exports = ShortLink

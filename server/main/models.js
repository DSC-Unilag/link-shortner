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

const linkSchema = new mongoose.Schema({
  identifier:  {
    type: String,
    unique: true
  }, 
  url: String,
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users' 
  }
})

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
})

export const User = mongoose.model('user', userSchema)

export const ShortLink = mongoose.model('short-link', linkSchema);

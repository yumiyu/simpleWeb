
const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


mongoose.connect('mongodb://localhost:27017/nemv', { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err)
  console.log('mongoose connected!')
})

const userSchema = new mongoose.Schema({
  name: { type: String, default: '', unique: true, index: true },
  age: { type: Number, default: 1 }
})

const User = mongoose.model('User', userSchema)

module.exports = User
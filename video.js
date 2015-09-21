var mongoose = require('mongoose');

var video = mongoose.Schema({
  id: String,
  title: String,
  thumbnail: String,
  published: String,
  created: String,
  upvotes: String,
  downvotes: String,
  access: String,
})

var Video = mongoose.model('Kitten', kittySchema);
'use strict'

var mongoose = require('mongoose');

module.exports = () => {
  var connect = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://mongodb/unlisted-youtube-videos', err => {
        if (!err) return resolve()
        else return reject(err)
      })
    })
  }

  var save = item => {
    return new Promise((resolve, reject) => {
      item.save(function (err, result) {
        if (err) return reject(err)
        else return resolve(result)
      })
    })
  }

  return {
    connect: connect,
    save: save
  }
}

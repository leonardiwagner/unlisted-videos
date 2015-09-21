'use strict'

var logger = require('winston')
var queue = require('./queue')()
var youtubeReader = require('./youtube-reader')()

/*


var database = require('./database')()

database.connect().then(() => {
  logger.info("[DATABASE] mongodb connected")
}).catch(err => {
  logger.info("[DATABASE] error connecting to mongodb", err)
})

queue.getSize()



var execute = () => {
  return new Promise((resolve, reject) => {
    queue.getSize("video-search").then(size => {
      return size
    })
  })

}

 */

var obj = youtubeReader.getVideoDetails('2rgin5tzcvU')

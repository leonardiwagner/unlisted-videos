'use strict'

var logger = require('winston')

var youtubeReader = require('./youtube-reader')
var queue = require('./queue')

var terms = ['mp4', '3gp', 'mkv', 'wmv']
var maxPages = 10

terms.forEach(term => {
  logger.info('[WORKER] Initializing term:', term)
  for(let i = 0; i < maxPages; i++){
    loadPage(term, i).then(pageBody => {
      logger.info('[WORKER] loading page term: ' + term + ' page: ' + i)
      return readPageItems(pageBody)
    }).then(pageItems => {
      logger.info('[WORKER] page loaded, now will save ids into redis')
      return saveIntoRedis(pageItems)
    }).then(result => {
      logger.info('[WORKER] total itens saved into redis:', result)
    }).catch((err) => logger.error('[WORKER] Error:', err))
  }
})


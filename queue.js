'use strict'

var redis = new require("redis").createClient(6379, 'redis', {});

module.exports = () => {
  var insertItems = (queueName, items) => {
    //strange? that's why!! http://stackoverflow.com/questions/18094645/redis-lpush-a-number-of-items
    return new Promise((resolve, reject) => {
      var callback = (err, res) => {
        if(!err) return resolve(res)
        else return reject(err)
      }

      items = pageItems.map(item => JSON.stringify(item))
      items.unshift(queueName)
      items.push(callback)

      redis.lpush.apply(redis, pageItems)
    })
  }

  var getSize = (queueName) => {
    return new Promise((resolve, reject) => {
      let logger = require("winston")
      redis.llen(queueName, (err, size) => {
        if(!err) return resolve(size)
        else return err
      })
    })
  }

  return {
    insertItems: insertItems,
    getSize: getSize,
  }
}

'use strict'

var request = require('request')
var cheerio = require('cheerio')

var generateRandomVideoId = () => {
  let chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var id = '';
  for (var i = 0; i < 11; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id
}

var loadYoutubeVideoPage = (videoId) => {
  return new Promise((resolve, reject) => {
    request('https://www.youtube.com/watch?v=' + videoId, (error, response, body) => {
      if (!error && response.statusCode == 200) return resolve({
        'videoId': videoId,
        'pageBody': body
      })
      else reject(error)
    })
  })
}

var getVideoInfo = (pageResult) => {
  let $ = cheerio.load(pageResult.pageBody);
  let videoTitle = $("#eow-title")
  let videoInfo = {}
  if(videoTitle.length) {

    let isPrivate = $(".privacy-icon").length
    console.log(videoTitle.text().trim() + " is private? " + isPrivate + " " + pageResult.videoId)
  }

    //console.log("not found, video: " + pageResult.videoId)
}


var doWork = () => {
  let videoId = generateRandomVideoId()

  return loadYoutubeVideoPage(videoId).then(getVideoInfo)

}


var parallelWorkers = 0;
setInterval(function(){
  parallelWorkers++;
  doWork().then(function(){
    parallelWorkers--;
  }).catch(function(e){
    console.log(e)
    parallelWorkers--;
  })


}, 50)

setInterval(function(){
  console.log("workers: " + parallelWorkers)
}, 5000)







'use strict'

var request = require('request')
var cheerio = require('cheerio')

module.exports = () => {
  var loadPage = (url) => {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) return resolve(body)
        else reject(error)
      })
    })
  }

  var loadSearchPage = (term, pageIndex) => {
    return loadPage('https://www.youtube.com/results?search_query=' + term + '&filters=today&page=' + pageIndex)
  }

  var loadVideoPage = (term, pageIndex) => {
    return loadPage('https://www.youtube.com/watch?v=' + videoId)
  }

  var readPageItems = pageBody => {
    let $ = cheerio.load(pageBody);
    let videosHtml = $(".yt-lockup-dismissable")
    let videos = []

    videosHtml.each(function(index, element){
      videos.push({
        id: $(element).find('.yt-lockup-thumbnail a').attr('href').replace('/watch?v=',''),
        image: $(element).find('.yt-lockup-thumbnail .yt-thumb-simple img').attr('src'),
        title: $(element).find('.yt-lockup-content .yt-lockup-title a').html()
      })
    })

    return videos
  }

  var readPageVideo = videoId => {
    let $ = cheerio.load(pageBody)

    return {
      views = $(".watch-view-count").html(),
      likes = $(".like-button-renderer-like-button .yt-uix-button-content").html(),
      dislikes = $(".like-button-renderer-dislike-button .yt-uix-button-content").html(),
      comments = $(".all-comments strong").html()
      }
  }

  return {
    search: (item, pageIndex) => {
      return loadSearchPage(item, pageIndex).then(pageBody => {
        return readPageItems(pageBody)
      })
    },
    getVideoDetails: videoId => {
      return loadVideoPage(videoId).then(pageBody => {
        return readPageVideo(pageBody)
      })
    }
  }
}



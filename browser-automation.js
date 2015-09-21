var wd = require('wd')
var browser = wd.remote({
  host: 'selenium',
  port: 4444
});
/*

browser
  .init({browserName:'chrome'})
  .get("https://www.youtube.com/watch?v=2eEB-vJic_o")
  ., () => console.log("ola"))
*/



browser.init({browserName:'firefox'}, function() {
  browser.get("https://www.youtube.com/watch?v=2eEB-vJic_o", function() {
    browser.elementById('player-unavailable', function(err, el) {
      if(err) return console.log(err)
      else console.log(el)
    });
  });
});
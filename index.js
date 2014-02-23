var request = require('request')
var cheerio = require('cheerio')

var url = "http://gate1.baaqmd.gov/aq/ws/AQX.asmx/getAQDataX"
var form = {date: '2009-02-01', pid: '', view: '0', rndval: '1393129827459'}
var headers = {
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36",
  "Origin": "http://gate1.baaqmd.gov",
  "Referer": "http://gate1.baaqmd.gov/aq/",
  "Content-Type": "application/x-www-form-urlencoded"
}

request.post({url: url, form: form}, function(err, resp, body) {
  console.log([resp.statusCode, body.toString()])
})

// var stations = {
//   "Oakland": "1025",
//   "West Oakland": "1027",
//   "Alice St": "1016",
//   "Filbert St": "1024"
// }

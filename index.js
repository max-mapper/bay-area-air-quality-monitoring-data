var request = require('request')
var cheerio = require('cheerio')

var stations = {
  "Oakland": "1025",
  "West Oakland": "1027",
  "Alice St": "1016",
  "Filbert St": "1024"
}

var dailyUrl = 'http://gate1.baaqmd.gov/aqmet/AQSiteView.aspx'

var formData = {
  "__EVENTTARGET": "Calendar",
  "__EVENTARGUMENT": "3347",
  "__LASTFOCUS": "", "__VIEWSTATE":"/wEPDwUKMTc1NzAzMTk5OQ9kFgJmD2QWBmYPEGQPFgxmAgECAgIDAgQCBQIGAgcCCAIJAgoCCxYMEAUHSmFudWFyeQUBMWcQBQhGZWJydWFyeQUBMmcQBQVNYXJjaAUBM2cQBQVBcHJpbAUBNGcQBQNNYXkFATVnEAUESnVuZQUBNmcQBQRKdWx5BQE3ZxAFBkF1Z3VzdAUBOGcQBQlTZXB0ZW1iZXIFATlnEAUHT2N0b2JlcgUCMTBnEAUITm92ZW1iZXIFAjExZxAFCERlY2VtYmVyBQIxMmcWAQICZAICDxBkDxYLZgIBAgICAwIEAgUCBgIHAggCCQIKFgsQBQQyMDA0BQQyMDA0ZxAFBDIwMDUFBDIwMDVnEAUEMjAwNgUEMjAwNmcQBQQyMDA3BQQyMDA3ZxAFBDIwMDgFBDIwMDhnEAUEMjAwOQUEMjAwOWcQBQQyMDEwBQQyMDEwZxAFBDIwMTEFBDIwMTFnEAUEMjAxMgUEMjAxMmcQBQQyMDEzBQQyMDEzZxAFBDIwMTQFBDIwMTRnFgECBWQCAw88KwAKAQAPFgQeC1Zpc2libGVEYXRlBgBA5/bgaMsIHgJTRBYBBgBA5/bgaMsIZGRkds+xpmLbL3VHP7+P5/Fq8N0BMok=",  "__EVENTVALIDATION":"/wEWRAL3k5DsBgK1mKbEDgK694yqAgK794yqAgK494yqAgK594yqAgK+94yqAgK/94yqAgK894yqAgKt94yqAgKi94yqAgK698ypAgK698CpAgK698SpAgKqyJPNBAKC5u7XCQKC5vpyAoLmxqkPAoLm0sQHAoLm/q0BAoLmysgJAunf+NEOAunfxIwFAunf0KsMAunfvMYEAunfiP0DAuf/qMoFAuf/tJcNAuf/gLAKAuf/7NwDAuf/+PkIAuf/xAIC5//QrwkC5/+8yAYC5//IowMC5//UzAgC2pDG5w8C2pDSgAcC2pC+rQwC2pCK9gUC2pCWkw0C2pDivwoC2pDO2AMC2pDa5QgC2pDm3AUC2pDy+QICvYnkEAK9ifC9CQK9idzGBgK9iajjDwK9ibSMBwK9iYCpDAK9iez1BQK9ifieDQK9iYT2DwK9iZCTBwKQooKKCgKQou7WAwKQovrzCAKQosYcApCi0rkJApCivsIGApCiiu8PApCilogHApCiouMBApCijowJArvIwssDArvIrpQLhu/X5/fQijDlPSmohkVjK4OTI7Y=",
  "DropDownListMonth": "3",
  "DropDownListYear": "2009",
  "SID": "1027"
}

var headers = {
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36",
  "Origin": "http://gate1.baaqmd.gov",
  "Referer": "http://gate1.baaqmd.gov/aqmet/AQSiteView.aspx",
  "Cookie": "ASP.NET_SessionId=m5bbie45qpe1gfyuwncf21zy;",
  "Content-Type": "application/x-www-form-urlencoded"
}

request.post({url: dailyUrl, form: formData, headers: headers}, function(err, resp, html) {
  var $ = cheerio.load(html)
  var table = $('table[bgcolor="#CCCCCC"]')
  var rows = $(table).find('tr')
  var hours = $(rows[1]).find('td')
  
  // delete first two rows and last row -- they are headers
  rows = rows.slice(2)
  rows = rows.slice(0, rows.length - 1)
  
  rows.map(function(rowNum, row) {
    var cells = $(row).find('td')
    cells.map(function(cellNum, cell) {
      var text = $(cell).text()
      console.log(text)
    })
  })
})
var url = require('url')
var fetch = require('isomorphic-fetch')
var cheerio = require('cheerio')

module.exports = function (request, response) {
  var productUrl = decodeURIComponent(request.query.url)

  if (!productUrl) {
    return response.send(JSON.stringify({ error: 'MISSING URL' }))
  }

  var urlParsed = url.parse(productUrl, true)
  urlParsed.query.setLang = 'en'
  productUrl = url.format(urlParsed)

  fetch(productUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 YaBrowser/15.10.2454.3860 Safari/537.36'
    }
  }).then(function (response) {
    return response.text()
  }).then(function (page) {
    $ = cheerio.load(page, { normalizeWhitespace: true })
    var specsTable = $('.specification-table')

    if (!specsTable.length) {
      return response.send({ error: 'INVALID PRODUCT' })
    }

    var specs = {}
    var rows = $('tr', specsTable)
    rows.each(function () {
      var row = $('td', this).map(function () {
        return $(this).text()
      }).get()
      specs[row[0]] = row[1]
    })

    response.send({ attributes: specs })
  }).catch(function (error) {
    response.send(JSON.stringify({ error: 'INVALID URL' }))
  })
}

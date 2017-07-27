const http = require('http')
const cheerio = require('cheerio')


function queryIMDB(callback){
  var searchTerms = encodeURIComponent(process.argv.splice(2).join(' '))
  http.get({
    host: 'www.imdb.com',
    path: `/find?ref_=nv_sr_fn&q=${searchTerms}&s=all`
    }, function(res){
      var html = ''
      res.on('data', function(chunk){ return html += chunk })
      res.on('end', function(){
      var searchResults = getSearchResults(html)
      callback(null, searchResults)
    })
  })
}

function getSearchResults(html){
  var $ = cheerio.load(html)
  var searchResults = $('.findSection').first().find('.result_text').map(function(index, element){
    return $(element).text()
  }).toArray()
  return searchResults
}


function run(){
  queryIMDB(function(error, searchResults){
    if(error){
      throw error
    }
    console.log(searchResults.join('\n'))
  })
}

if (!module.parent){
  run()
}

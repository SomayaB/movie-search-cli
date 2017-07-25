const http = require('http')
const cheerio = require('cheerio')


function queryIMDB(callback){
  var searchTerms = encodeURIComponent(process.argv.splice(2).join(' '))
  http.get({
    host: 'www.imdb.com',
    path: `/find?ref_=nv_sr_fn&q=${searchTerms}&s=all`
    }, function(res){
      var html = ''
      res.on('data', function(chunk){ return html += chunk }) //????
      res.on('end', function(){
      var movieNames = getMoviesNames(html)
      callback(null, movieNames)
    })
  })
}

function getMoviesNames(html){
  var $ = cheerio.load(html)
  var movieNames = $('.findSection').first().find('.result_text').map(function(index, element){
    return $(element).text()
  }).toArray()
  return movieNames
}

queryIMDB(function(error, movieNames){
  if(error){
    throw error
  }
  console.log(movieNames.join('\n'))
})

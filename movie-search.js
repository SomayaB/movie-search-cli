const http = require('http')
const cheerio = require('cheerio')


var searchMovie = process.argv.splice(2).join(' ') //string

function queryIMDB(search){
  http.get({
    host: 'www.imdb.com',
    path: `/find?ref_=nv_sr_fn&q=${search}&s=all`
  }, function callback(res){
    var html = ''
    res.on('data', function(chunk){
      html += chunk}) //????
    res.on('end', function(){
      console.log(html)
    })
    })
  }


queryIMDB("nemo")

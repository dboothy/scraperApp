var exphbs  = require('express-handlebars');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cheerio = require("cheerio");
var request = require("request");
var index = require('./routes/index');
var app = express();
var db = require("./db/models");
var axios = require("axios");
var mongoose = require("./db")

console.log("\n***********************************\n" +
            "Grabbing every article heading and link\n" +
            "from Gamespot's front page" +
            "\n***********************************\n");


// view engine setup

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


app.get('/scrape', function(req, res) {axios.get("https://www.gamespot.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article.media").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.headline = $(this)
        .find("h3").text()
      result.summary = $(this)
        .find("p.media-deck").text()
      result.url = "https://www.gamespot.com/" + $(this)
        .find("a").attr("href");
        // console.log(result.title+"\n","https://www.gamespot.com/"+result.link+"\n")
      // Create a new Article using the `result` object built from scraping
      db.Article


        .create(result)
      
        .then(function() {
          // If we were able to successfully scrape and save an Article, send a message to the client
          res.send("Scrape Complete");
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.send("There was an error")
          return
        });
    });
  });
});


	
	// request("https://www.gamespot.com/", function(error, response, html) {
	// 	var $ = cheerio.load(html);

	// 	var results = [];
	// 	console.log(results)

	// 	$(".media").each(function(i, element) {
	// 		var headline = $(element).find("h3").text()
	// 		var body = $(element).find("p").text()
	// 		var link = $(element).find("a").attr("href");
			  // var photo = $(element).find("img").html()
	// 		results.push({
	// 		    headline: headline,
	// 		    body: body,
	// 		    link: link
	// 		    // photo: photo
	// 	    });
	  	

	// 	for(var i= 0; i < results.length; i++){
		    
	// 	    var head = results[i].headline
	// 	    var body = results[i].body
	// 	    var link = results[i].link
	// 	    // var photo = results[i].photo
	// 	    console.log("\nTitle: "+head, "\nBody: "+body, "\nLink: www.gamespot.com" + link )
	// 	}
	// });
    
	// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

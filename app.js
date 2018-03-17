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


app.get('/scrape', function(){

	
	// request("https://www.gamespot.com/", function(error, response, html) {
	// 	var $ = cheerio.load(html);

	// 	var results = [];
	// 	console.log(results)

	// 	$(".media").each(function(i, element) {
	// 		var headline = $(element).find("h3").text()
	// 		var body = $(element).find("p").text()
	// 		var link = $(element).find("a").attr("href");
	// 		// var photo = $(element).find("img").html()
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
	// 	    console.log("\nTitle: "+head, "\nBody: "+body, "\nLink: " + link )
	// 	}
	// });
    
	// });
})


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

// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});

// ++++++++ MY CODE STARTS HERE ++++++++++++++ //
app.get('/api/timestamp/:date_string', function (req, res) {
  var data = req.params.date_string;
  
  // If yyyy-mm-dd format
  if(isNaN(data)) {
    var unixFormat = new Date(data).getTime() / 1000;
    var temp = new Date(unixFormat * 1000);
    var utcFormat = temp.toUTCString();
  } else {
    // If unix format
    var temp = new Date(data * 1000);
    var utcFormat = temp.toUTCString();
    var unixFormat = parseInt(data); // convert to integer
  }
  
  res.json({unix: unixFormat, utc: utcFormat});
});

app.get('/api/timestamp', function (req, res) {
  var date = new Date();
  var utcFormat = date.toUTCString();
  var unixFormat = date.getTime();
  
  res.json({unix: unixFormat, utc: utcFormat});
});


// ++++++++ MY CODE ENDS HERE ++++++++++++++++ //

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
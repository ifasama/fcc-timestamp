// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

let responseData = {};

app.get('/api/', function(req,res) {
    responseData["unix"] = Date.now()
    responseData["utc"] =  new Date(Date()).toUTCString()
    res.json(responseData)
})

//Timestamp Microservice
app.get('/api/:param', function(req,res) {
  let { param } = req.params;
  let dateSt = new Date(param);
  let unixnum = Number(param);
  if(!isNaN(unixnum)){
    responseData["unix"] = unixnum,
    responseData["utc"] = new Date(unixnum).toUTCString()
  }
  else if(dateSt instanceof Date && !isNaN(dateSt)){
      responseData["unix"] = dateSt.getTime(),
      responseData["utc"] = dateSt.toUTCString()
  }
  else{
      responseData["error"] = "Invalid Date"
  }
    res.json(responseData)
  })

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

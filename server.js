var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var session = require('express-session');
app.set('trust proxy', 1); // trust first proxy
app.use( session({
   secret : 's3Cur3',
   name : 'sessionId'
  })
);

app.listen(8000);

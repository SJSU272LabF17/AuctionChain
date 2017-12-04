var express = require('express')
  , http = require('http')
  , path = require('path')
  , controller = require ('./routes/controller');
var cors = require('cors');
var morgan = require('morgan')
var bodyParser = require('body-parser');  
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');

//mongo connection
var mongoURL =        "mongodb://localhost:27017/272_Auction_Project";
var mongo = require("./middleware/mongo");



var app = express();

var whitelist = ['http://localhost:3000', 'http://9f5db843.ngrok.io']
var corsOptions = {
    origin: function (origin, callback) {
        /*if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }*/
    	callback(null, true)
    },
    credentials: true
}
app.use(cors(corsOptions))


// //Enable CORS
// var corsOptions = {
// 	    origin: 'http://localhost:3000',
// 	    credentials: true,
// }
// app.use(cors(corsOptions))


app.use(morgan('dev')) ; 






app.set('port', process.env.PORT || 3002);
app.set('view engine', 'ej');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());




mongo.connect(mongoURL, function(db){
	controller(app , db ) ; 
})






http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

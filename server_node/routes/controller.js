var bcrypt = require('bcrypt');
var passport = require('passport');
var authenticate = require('../middleware/authenticateMiddleware');
require('../middleware/passport')(passport);
var session = require('express-session');


//mongo connection
var mongoURL =        "mongodb://localhost:27017/272_Auction_Project";
var mongoSessionURL = "mongodb://localhost:27017/272_Auction_Project_Session";
var mongo = require("../middleware/mongo");
const MongoStore = require('connect-mongo')(session);
var ObjectID = require('mongodb').ObjectID


var axios  = require ('axios');


module.exports = function(app , db ){
	
	app.use(session({
		secret: 'fdghghjhjlfggnhmjmffsfdscdffbvgfgfg',
		  resave: false,
		  saveUninitialized: false,
		  duration: 1 * 60 * 1000,
		  activeDuration: 5 * 6 * 1000,
		  store : new MongoStore({
			  url: mongoSessionURL
		  })
	}))
	app.use(passport.initialize());
	app.use(passport.session());
	
	var collection = db.collection('user');
	
	
	app.get('/getAllProduct' , function(req , res){
		
	})
	
	
	app.post('/checkIfAlreadyLoggedIn' , authenticate , function(req,res){
		 var user = req.user ; 
		 console.log('user ' , user ); 
		 user = new ObjectID(user) ; 
		 
		 collection.find({_id : user}).toArray(function(err , result){
			 console.log(result[0]); 
			 if(result[0]){
				 console.log("User already loggedIn ");
				 res.status(200).json({loggedIn : true, user : { username : result[0].username ,
					 												fname : result[0].fname ,
					 												lname : result[0].lname ,
					 											dob : result[0].dob ,
					 											gender : result[0].gender}})
			 }else{
				 console.log('No vali session exist ') ; 
				 res.status(200).json({loggedIn : false , user : null })
			 }
		})
	})
	
	
	app.post('/register' , function(req,res)
	{
		var email = req.body.email ;
		var password = req.body.password ; 
		var firstName = req.body.firstName ; 
		var lastName = req.body.lastName ; 
		var balance = req.body.balance ;
		var className =  req.body.class ; 
		
		const saltRounds = 10;
		console.log(email , password , firstName , lastName , balance , className );
		
		bcrypt.hash(password, saltRounds, function(err, hash) {
			var apiObject = {
					 "$class": className,
					  "balance": balance,
					  "email": email,
					  "firstName": firstName,
					  "lastName": lastName ,
					  "password" : hash	
			}
			
			
			axios.post('http://localhost:3004/api/org.cmpe272.evergreen.auction.Member', apiObject)
			  .then(function (response) {
			    console.log(response.data);
			    res.status(200).json({})
			  })
			  .catch(function (error) {
			    console.log("This is error calling Composer API");
			    res.status(200).json({})
			  });
			
			
		});
	})
		
	
	  
		
	app.post('/login' , function(req , res){
		
			passport.authenticate('login', function(err, user) {
				console.log('User ' , user ) ; 
		        if(user === false ){
		        	res.status(200).json({loggedIn : false , user : null})
		        }else{
		        	req.login(user.username , function(err ){
			        	console.log(' ...Requesting');
			        	res.status(200).json({loggedIn : true , user : user})
			        })
		        }
		        
		    })(req, res)
			
			
	});
		
	
	app.post('/logout' , function(req , res){
		console.log('Logout called ') ; 
		
		req.logout();
		req.session.destroy();
		res.status(200).json({loggedIn : false , user : null }); 
		
	});
	
};

	
	
	

passport.serializeUser(function(user_id, done) {
	console.log('serializeUser')  ;
	done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
		console.log('Deserialize user ');
	    done(null, user_id);
	  
});

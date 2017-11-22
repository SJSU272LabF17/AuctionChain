var bcrypt = require('bcrypt');
var passport = require('passport');
var authenticate = require('../middleware/authenticateMiddleware');
require('../middleware/passport')(passport);
var session = require('express-session');
var Guid = require('guid');
var urlencode = require('urlencode');

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
	
	
	app.post('/addNewProduct' , function(req , res){
		
		var pid = Guid.raw();;
		var name = req.body.productName ; 
		var description = req.body.productDesc ; 
		var category = req.body.productCategory ; 
		var imageurl = req.body.imageurl;
		var owner =  req.body.email; 

		var apiObject = {
			"$class": "org.cmpe272.evergreen.auction.Product",
			 "pid": pid,
			 "name": name,
			 "description": description,
			 "category": category,
			 "imageurl": "imageurl",
			 "owner" : owner,
			 "state" : "ADDED"	
  		};
		
		axios.post('http://localhost:3004/api/org.cmpe272.evergreen.auction.Product', apiObject)
		.then(function (response) {			

			getAllUserProducts(owner, function(bSuccessful, arrProducts){

				if(bSuccessful){
					console.log(arrProducts);
					res.status(200).json({products: arrProducts});
					return;
				}
				res.status(500).json({error: "Internal server error."})
				
			});

		})
		.catch(function (error) {
			console.log("This is error calling Composer API", error);
			res.status(500).json({error: "Internal server error."})
		});		
	});

	app.post('/getAllUserProducts' , function(req , res){
		var email =  req.body.email; 

		getAllUserProducts(email, function(bSuccessful, arrProducts){
			if(bSuccessful){
				res.status(200).json({products: arrProducts});
				return;
			}
			res.status(500).json({error: "Internal server error."})
		});

	});

	app.post('/getAllProductsByCategory' , function(req , res){
		var category =  req.body.category; 
		var strRequestQuery = "";

		console.log("category", category)
		if(category != null && category != undefined && category != ""){
			strRequestQuery = "http://localhost:3004/api/queries/GetAllProductsByCategory?category=" + category;
		}
		else{
			strRequestQuery = "http://localhost:3004/api/org.cmpe272.evergreen.auction.ProductListing";
		}

		console.log(strRequestQuery);
		
		axios.get(strRequestQuery, {})
		.then(function (response) {	
			//callback(true, response.data);
			console.log("getAllProductsByCategory response arrived ")
			console.log(response.data)

			var arrRes = [];
			for(var i=0 ; i < response.data.length; i++){

				var maxBid = response.data[i].reservePrice;
				for (var j = 0 ; j < response.data[i].offers.length; j++){
					if(response.data[i].offers[j].bidPrice > maxBid){
						maxBid = response.data[i].offers[j].bidPrice;
					}
				}

				var product = {};
				product.productName = response.data[i].name;
				product.productDesc = response.data[i].description;
				product.productCategory = response.data[i].category;
				product.productListingId = response.data[i].listingId;
				product.numberOfBids = response.data[i].offers.length;
				product.maxBidPrice = maxBid;
				arrRes.push(product);
			}

			res.status(200).json(arrRes);
		})
		.catch(function (error) {
			console.log("This is error calling Composer API: Product added Could not fetch all user products");
			//console.log(error)
			res.status(500).json({error: "Internal server error."})
		});
	});

		
	
	app.post('/putProductOnAuction' , function(req,res){
		var listingId = Guid.raw();
		var reservePrice = req.body.reservePrice;
		var productName = req.body.productName;
		var productDesc = req.body.productDesc;
		var productCategory = req.body.productCategory ;
		var pid = req.body.pid;
		var email =  req.body.email;
		var productState = 'FOR_SALE';
		var offers = [];

		var apiObject = {
			"$class": "org.cmpe272.evergreen.auction.ProductListing",
			"listingId": listingId,
			"reservePrice": reservePrice,
			"name": productName,
			"description": productDesc,
			"category": productCategory,
			"state": productState,
			"offers": offers,
			"owner": email,
			"product": pid
		  }

		axios.post('http://localhost:3004/api/org.cmpe272.evergreen.auction.ProductListing', apiObject)
		.then(function (response) {

			console.log("Product Listing Added.");
			var apiObject = {
				"$class": "org.cmpe272.evergreen.auction.Product",
				 "pid": pid,
				 "name": productName,
				 "description": productDesc,
				 "category": productCategory,
				 "imageurl": "imageurl",
				 "owner" : email,
				 "state" : "FOR_SALE"	
			  };
	
			axios.put('http://localhost:3004/api/org.cmpe272.evergreen.auction.Product/' + pid, apiObject)
			.then(function (response) {
				console.log("Product State Updated.");
				res.status(200).json({});
			})
			.catch(function (error) {
				console.log("Could not update product State. ", error);
				res.status(200).json({});
			});

		})
		.catch(function (error) {
			console.log("This is error calling Composer API", error);
			res.status(500).json({error: "Internal server error."})
		});		

	});
		
	app.post('/login' , function(req , res){
		
			passport.authenticate('login', function(err, user) {
				console.log('User ' , user ) ; 
		        if(user === false ){
		        	res.status(200).json({loggedIn : false , user : null})
		        }else{
		        	req.login(user.email , function(err ){
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

	
	app.post('/checkIfAlreadyLoggedIn' , authenticate , function(req,res){
		var email = req.user ; 
		console.log('user ' , email ); 

		axios.get('http://localhost:3004/api/org.cmpe272.evergreen.auction.Member/' + email, {})
		.then(function (response) {
			console.log("User already exists with this email.");
			  console.log(response.data);
				   
			  res.status(200).json({loggedIn : true, user : {email : response.data.email , 
			   fname : response.data.firstName , 
			   lname : response.data.lastName
		   }});

		})
		.catch(function (error) {
			
				
		   res.status(200).json({loggedIn : false, user : null});
		});
   	});
	
	app.post('/register' , function(req,res){
		var email = req.body.email ;
		var password = req.body.password ; 
		var firstName = req.body.firstName ; 
		var lastName = req.body.lastName ; 
		var balance = req.body.balance ;
		var className =  req.body.class ; 
		
		const saltRounds = 10;
		//console.log(email , password , firstName , lastName , balance , className );
		
		
		
		
		
		bcrypt.hash(password, saltRounds, function(err, hash) {
			var apiObject = {
					 "$class": className,
					  "balance": balance,
					  "email": email,
					  "firstName": firstName,
					  "lastName": lastName ,
					  "password" : hash	
			}
			

			axios.get('http://localhost:3004/api/org.cmpe272.evergreen.auction.Member/' + email, {})
			.then(function (response) {
				console.log("User already exists with this email.");
			  	console.log(response.data);
				  res.status(200).json({registered: false, registeredError: "Email already exists."
				  , isAuthenticated: false, user: null})
			})
			.catch(function (error) {
				
				console.log("No user found with this email.");
				
				axios.post('http://localhost:3004/api/org.cmpe272.evergreen.auction.Member', apiObject)
				.then(function (response) {
					console.log(response.data);

					res.status(200).json({registered: true, registeredError: ""
					, isAuthenticated: false, user: null});
					//, isAuthenticated: true, user: {email: email, fname: firstName, lname: lastName}});
				})
				.catch(function (error) {
					console.log("This is error calling Composer API");
					res.status(400).json({registered: false, registeredError: "Internal server error."
					, isAuthenticated: false, user: null})
				});

			});
		});
	})
	
};


	

function getAllUserProducts(email, callback){

	var strEmail = urlencode("resource:org.cmpe272.evergreen.auction.Member#" + email);
	axios.get('http://localhost:3004/api/queries/GetAllUserProducts?owner=' + strEmail, {})
	.then(function (response) {	
		callback(true, response.data);
	})
	.catch(function (error) {
		console.log("This is error calling Composer API: Product added Could not fetch all user products");
		callback(false, []);
	});
}	
	

passport.serializeUser(function(user_id, done) {
	console.log('serializeUser')  ;
	done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
		console.log('Deserialize user ');
	    done(null, user_id);
	  
});

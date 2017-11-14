var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/login_project";
var bcrypt = require('bcrypt');
var axios  = require ('axios');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(email   , password, done) {
        try {
			console.log('Username ZXZZZZZZZZZZZZZZ' , email , password ) ; 
			

			axios.get('http://localhost:3004/api/org.cmpe272.evergreen.auction.Member/' + email, {})
			.then(function (response) {
				console.log("RESPONSE DATA:");
				console.log(response.data);


				bcrypt.compare(password, response.data.password, function(err, result1) {
					if(result1 == true){
						done(null, {email : response.data.email , 
							fname : response.data.firstName , 
							lname : response.data.lastName
						});
					}else{
						done(null, false);
					}
				});

				//res.status(200).json({registered: true, registeredError: ""})
			})
			.catch(function (error) {
				console.log("Username/Email not found.");
				//console.log(error);
				done(null, false);
				//res.status(400).json({registered: false, registeredError: "Internal server error."})
			});
        }
        catch (e){
            done(e,{});
        }
    }));
};
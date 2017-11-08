var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/login_project";
var bcrypt = require('bcrypt');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username   , password, done) {
        try {
        	console.log('Username ZXZZZZZZZZZZZZZZ' , username , password ) ; 
            mongo.connect(mongoURL, function(){
                var collection = mongo.collection('user');
                
                collection.find({username : username} , {username : 1 , fname : 1 , lname : 1 , gender : 1 , password : 1 , dob : 1  } ).toArray(function(err , result){
                	console.log(result[0]); 
                	if(result[0]){
                		bcrypt.compare(password, result[0].password, function(err, result1) {
                    		if(result1 == true){
                    			done(null, {user_id : result[0]._id , username : result[0].username , 
                    						fname : result[0].fname , dob :  result[0].dob , 
                    						lname : result[0].lname , gender : result[0].gender});
                    		}else{
                    			done(null, false);
                    		}
                    	})
                	}else{
                		  done(null, false);
                	}
                })
            });
        }
        catch (e){
            done(e,{});
        }
    }));
};
import axios from 'axios';
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002'

const headers = {
    'Accept': 'application/json'
};

export function register(username , password , fname , lname , dob , gender ){
	console.log(username , password , fname , lname , dob , gender ) ; 

		return function(dispatch){
			fetch('http://localhost:3000/api/org.cmpe272.evergreen.auction.Member', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include',
	   	    body: JSON.stringify({
	   	    			"$class": "org.cmpe272.evergreen.auction.Member",
						  "balance": 5000,
						  "email": username,
						  "firstName": fname,
						  "lastName": lname ,
						  "password" : password
	   	    })

	  		}).then(function (response) {
			        console.log("Response from server " , response);
			      response.json().then(res => {
			      	console.log("res " , res );
			      	


			      	
				})
																		        
	   		})
	        .catch(error => {
	            console.log("This is error");
	            
	        })
		}


		
	

}



export function setBackRegisteredSuccess(){
	return({
		type : 'SET_BACK_REGISTER',
		payload : {user : '' , registerSuccessful : false}
	})
}



export function login(username , password ){
	
		return function(dispatch){
			fetch('http://localhost:3002/login', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include',
	   	    body: JSON.stringify({username: username, password: password})

	  		}).then(function (response) {
			        console.log("Response from server " , response);
			      response.json().then(res => {
			      	dispatch({ type : 'USER_LOGGED_IN' , payload : res})
				})
																		        
	   		})
	        .catch(error => {
	            console.log("This is error");
	            
	        })
		}
	
}


export function checkIfAlreadyLoggedIn( ){
	
		return function(dispatch){
			fetch('http://localhost:3002/checkIfAlreadyLoggedIn', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include'
	  		}).then(response => {
			        
			        response.json().then(res => {
			        	console.log(res);
			      		dispatch({ type : 'USER_ALREADY_LOGGED_IN' , payload : res})
					})
	   		})
	        .catch(error => {
	            console.log("This is error");
	            
	        })
		}
}





export function logout( ){
	
		return function(dispatch){
			fetch('http://localhost:3002/logout', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include'
	  		}).then(response => {
			        
			        response.json().then(res => {
			        	console.log(res);
			      		dispatch({ type : 'USER_LOGGED_OUT' , payload : res})
					})
	   		})
	        .catch(error => {
	            console.log("This is error");
	            
	        })
		}
	
		
	

}
var url = "http://0c2e7d60.ngrok.io/" ; 
const headers = {
    'Accept': 'application/json'
};

export function placeBid(email , amount , listingId  ){
	console.log(email  , amount , listingId ) ; 

		return function(dispatch){
			fetch(url + 'placeBid', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include',
	   	    body: JSON.stringify({
	   	    			"email" : email ,
	   	    			"bidPrice" : amount,
	   	    			"listingId" : listingId 
	   	    })

	  		}).then(function (response) {
			        console.log("Response from server " , response);
			      response.json().then(res => {
					dispatch({ type : 'BID_SUCCESS'  })
				})
																		        
	   		})
	        .catch(error => {
	        	dispatch({ type : 'BID_FAILURE'  })
	            
	        })
		}
}



export function closeBid(listingId , callback  ){
	

		
			fetch(url + 'closeBidding', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include',
	   	    body: JSON.stringify({
	   	    		
	   	    			"listingId" : listingId 
	   	    })

	  		}).then(function (response) {
	  			console.log("Wait for the response ")
			    callback(null , true )
			})
	        .catch(error => {
	        	console.log("Error Response ")
	        	callback(error , false)
	        })
		
}

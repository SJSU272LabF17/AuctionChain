var url = "http://5f9cb3b3.ngrok.io/" ; 
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
					dispatch({ type : 'PRODUCT_ADD_SUCCESS' , payload : true })
				})
																		        
	   		})
	        .catch(error => {
	        	dispatch({ type : 'PRODUCT_ADD_FAILURE' , payload : false})
	            
	        })
		}
}



export function closeBid(listingId  ){
	

		return function(dispatch){
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
			        console.log("Response from server " , response);
			      response.json().then(res => {
					dispatch({ type : 'BIDDING_END_SUCCESS' , payload : true })
				})
																		        
	   		})
	        .catch(error => {
	        	dispatch({ type : 'PRODUCT_ADD_FAILURE' , payload : false})
	            
	        })
		}
}

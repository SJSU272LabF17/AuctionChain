var api = "http://0c2e7d60.ngrok.io/" ; 

const headers = {
    'Accept': 'application/json'
};

export function getAllProducts(category){
		return function(dispatch){
			fetch(api + 'getAllProductsByCategory', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include',
	   	    body: JSON.stringify({
	   	    			category : category,			
	   	    })

	  		}).then(function (response) {

			      	response.json().then(res => {
					dispatch({ type : 'GET_ALL_PRODUCTS' , payload : res})
				})
																		        
	   		})
	        .catch(error => {
				console.log("****************ERROR - Response from server " , error);
	        	dispatch({ type : 'GET_ALL_PRODUCTS' , payload : []})
	            
	        })
		}
}



export function getCurrentProductAuctioned(listing){
		return function(dispatch){
			fetch(api + 'getProductDetailsById', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include',
	   	    body: JSON.stringify({
	   	    			listingId : listing,			
	   	    })

	  		}).then(function (response) {
			        response.json().then(res => {
			        	console.log("Response for auction " , res.error) ; 

			        	if(res.error === "Internal server error."){

			        	}else{
			        		dispatch({ type : 'GET_CURRENT_AUCTIONED_PRODUCT_SUCCESS' , payload : res})
			        	}
					
				})
																		        
	   		})
	        .catch(error => {
				console.log("****************ERROR - Response from server " , error);
	        	
	            
	        })
		}
}
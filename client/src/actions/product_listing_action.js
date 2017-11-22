var url = "http://5f9cb3b3.ngrok.io/" ; 

const headers = {
    'Accept': 'application/json'
};

export function getAllProducts(category){
		return function(dispatch){
			fetch(url + 'getAllProductsByCategory', {
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
			        console.log("Response from server " , response);
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
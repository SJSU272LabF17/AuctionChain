const headers = {
    'Accept': 'application/json'
};

export function addNewProduct(email , productName , productDesc , productCategory  ){
	console.log( email , productName , productDesc , productCategory ) ; 

		return function(dispatch){
			fetch('http://localhost:3002/addNewProduct', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include',
	   	    body: JSON.stringify({
	   	    			"email" : email ,
	   	    			"productName" : productName,
	   	    			"productDesc" : productDesc ,
	   	    			"productCategory" : productCategory
	   	    })

	  		}).then(function (response) {
			        console.log("Response from server " , response);
			      response.json().then(res => {
			      	
			      	
			      dispatch({ type : 'PRODUCT_ADDED' , payload : res})

			      	
				})
																		        
	   		})
	        .catch(error => {
	        	var res = {
	        		registered : false ,
	        		registeredError : "Internal Server error "
	        	}
	        	 dispatch({ type : 'REGISTERED_FAIL' , payload : res})
	        	
	            console.log("This is error");
	            
	        })
		}


		
	

}

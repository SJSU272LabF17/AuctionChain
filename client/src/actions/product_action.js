var url = "http://0c2e7d60.ngrok.io/" ; 

const headers = {
    'Accept': 'application/json'
};




//delete Product

export function deleteProduct(id  ){
		
		return function(dispatch){


			fetch(url + 'deleteProduct', {
	        method: 'POST',
	        credentials:'include',

			body :    JSON.stringify({
	   	    			"pid" : id ,
	   	    	})
			}).then(function (response) {
			        
			    if(response.status == 200){
			    	dispatch({ type : 'PRODUCT_DELETE_SUCCESS' , payload : true })
			    }else{
			    	dispatch({ type : 'PRODUCT_DELETE_FAILURE' , payload : false})
			    }
												        
	   		})
	        .catch(error => {
	        	dispatch({ type : 'PRODUCT_DELETE_FAILURE' , payload : false})
	            
	        })
		}
}
















//add Product


export function setBackProductSuccess(){
	return {type : 'PRODUCT_ADD_SET_BACK' }
}

export function addNewProduct(email , productName , productDesc , productCategory, pic  ){
		return function(dispatch){

			var data = new FormData();
			data.append('file', pic);
			data.append('email', email);
			data.append('productName', productName);
			data.append('productDesc', productDesc);
			data.append('productCategory', productCategory);

			fetch(url + 'addNewProduct', {
	        method: 'POST',
	        credentials:'include',
			body: data
			}).then(function (response) {
			       if(response.status == 200){
			       		 dispatch({ type : 'PRODUCT_ADD_SUCCESS' })
			       }else{
			       		dispatch({ type : 'PRODUCT_ADD_FAILURE' })
			       }	
			     
			})
	        .catch(error => {
	        	dispatch({ type : 'PRODUCT_ADD_FAILURE' })
	            
	        })
		}
}



//Get All User Products

export function getAllUserProduct(email  ){
		return function(dispatch){
			fetch(url + 'getAllUserProducts', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include',
	   	    body: JSON.stringify({
	   	    			"email" : email ,
	   	    			
	   	    })

	  		}).then(function (response) {
			        console.log("Response from server " , response);
			      response.json().then(res => {
			      	
			      	
			      dispatch({ type : 'GET_ALL_USER_PRODUCS' , payload : res})

			      	
				})
																		        
	   		})
	        .catch(error => {
	        	console.log(error)
	            
	        })
		}
}



export function setBackPutProductOnAuction(){
	return { type : 'SETBACK_PUT_PRODUCT_ON_AUCTION_SUCCESS' , payload : null}
}

export function putProductOnAuction(email , pid , name , desc , category , price, imageurl ){
	console.log(email , pid , name , desc , category , price)
	return function(dispatch){
			fetch(url + 'putProductOnAuction', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include',
	   	    body: JSON.stringify({
	   	    			"email" : email ,
	   	    			"pid" : pid , 
	   	    			"productName" : name ,
	   	    			"productDesc" : desc ,
	   	    			"productCategory" : category,
						"reservePrice" : price,
						"imageurl" : imageurl
	   	    })

	  		}).then(function (response) {
			        console.log("Response from server " , response);
			      response.json().then(res => {
			      	
			      	dispatch({ type : 'PUT_ON_AUCTION_SUCCESS' , payload : true })
			     console.log(res) ; 

			      	
				})
																		        
	   		})
	        .catch(error => {
	        	console.log(error)
	            	dispatch({ type : 'PUT_ON_AUCTION_FAILURE' , payload : false })
	        })
		}
}


export function getSingleProductForAuction(id ){
	
	return function(dispatch){
			fetch(url + 'getProduct', {
	        method: 'POST',
	        headers: {
	            ...headers,
	            'Content-Type': 'application/json'
	        },
	        credentials:'include',
	   	    body: JSON.stringify({
	   	    			pid : id 
	   	    })

	  		}).then(function (response) {
			       
			      response.json().then(res => {
			      	
			      	
			    	dispatch({ type : "GET_SINGLE_PRODUCT_SUCCESS" , payload : res })

			      	
				})
																		        
	   		})
	        .catch(error => {
	        	console.log(error)
	            
	        })
		}
}
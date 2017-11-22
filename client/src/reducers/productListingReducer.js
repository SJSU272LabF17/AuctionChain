const initialState = {
	
	productList :  [] 
}



export default function productListingReducer (state=initialState , action )  {


	console.log("Redicer");
	console.log(action.payload);

	switch(action.type){
		case 'GET_ALL_PRODUCTS' : {
			return  {...state , productList :  action.payload} ; 
		}

		default :
			return state ; 

	}


}
const initialState = {
	
	myProduct :  [] 
}



export default function productReducer (state=initialState , action )  {


	console.log("Redicer");
	console.log(action.payload);

	switch(action.type){
		case 'GET_PRODUCT_SUCCESS' : {
			return  {...state , myProduct :  action.payload.products} ; 
		}
		case 'PRODUCT_ADDED' : {
			return  {...state , myProduct :  action.payload.products} ; 
		}



		default :
			return state ; 

	}


}
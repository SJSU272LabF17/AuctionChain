const initialState = {
	
	myProduct :  [] ,
	productAddSuccess : null 
}



export default function productReducer (state=initialState , action )  {


	
	switch(action.type){
		case 'GET_ALL_USER_PRODUCS' : {
			return  {...state , myProduct :  action.payload.products} ; 
		}
		case 'PRODUCT_ADD_SUCCESS' : {
			return  {...state , productAddSuccess :  action.payload} ; 
		}
		case 'PRODUCT_ADD_FAILURE' : {
			return  {...state , productAddSuccess :  action.payload} ; 
		}
		case 'PRODUCT_ADD_SET_BACK' : {
			return  {...state , productAddSuccess :  action.payload} ; 
		}



		default :
			return state ; 

	}


}
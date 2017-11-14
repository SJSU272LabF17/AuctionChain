const initialState = {
	
	myProduct :  [] 
}



export default function productReducer (state=initialState , action )  {
	switch(action.type){
		case 'GET_ALL_USER_PRODUCS' : {
			return  {...state , myProduct :  action.payload.products} ; 
		}
		case 'ADD_PRODUCT' : {
			return  {...state , myProduct :  action.payload.products} ; 
		}



		default :
			return state ; 

	}


}
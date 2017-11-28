const initialState = {
	
	bidSuccess : null 
}



export default function productListingReducer (state=initialState , action )  {


	

	switch(action.type){
		case 'BID_SUCCESS' : {
			return  {...state , bidSuccess :  true} ; 
		}
		case 'BID_FAILURE' : {
			return  {...state , bidSuccess :  false} ; 
		}
		case 'SET_BACK_BID_SUCCESS' : {
			return  {...state , bidSuccess :  null} ; 
		}


		default :
			return state ; 

	}


}
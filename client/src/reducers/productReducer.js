const initialState = {
	
	myProduct :  [] ,
	productAddSuccess : null ,
	singleProduct : [] ,
	putOnAuctionSuccess : null 
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
		case 'GET_SINGLE_PRODUCT_SUCCESS' : {
			return  {...state , singleProduct :  action.payload} ; 
		}
		case 'PUT_ON_AUCTION_SUCCESS' : {
			return  {...state , putOnAuctionSuccess :  action.payload} ; 
		}
		case 'PUT_ON_AUCTION_FAILURE' : {
			return  {...state , putOnAuctionSuccess :  action.payload} ; 
		}
		case 'SETBACK_PUT_PRODUCT_ON_AUCTION_SUCCESS' : {
			return  {...state , putOnAuctionSuccess :  action.payload} ; 
		}



		default :
			return state ; 

	}


}
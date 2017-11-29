const initialState = {
	
	myProduct :  null ,
	productAddSuccess : null ,
	singleProduct : [] ,
	putOnAuctionSuccess : null ,
	productDeleteSuccess : null 
}



export default function productReducer (state=initialState , action )  {


	
	switch(action.type){
		
		// Getting my Products
		case 'GET_ALL_USER_PRODUCS' : {
			return  {...state , myProduct :  action.payload.products } ; 
		}
		
		// Add Product
		case 'PRODUCT_ADD_SUCCESS' : {
			return  {...state , productAddSuccess :  true} ; 
		}
		case 'PRODUCT_ADD_FAILURE' : {
			return  {...state , productAddSuccess : false} ; 
		}
		case 'PRODUCT_ADD_SET_BACK' : {
			return  {...state , productAddSuccess :  null} ; 
		}
		

		// Get Single Product
		case 'GET_SINGLE_PRODUCT_SUCCESS' : {
			return  {...state , singleProduct :  action.payload , myProduct : null } ; 
		}

		//Put on Auction
		case 'PUT_ON_AUCTION_SUCCESS' : {
			return  {...state , putOnAuctionSuccess :  true} ; 
		}
		case 'PUT_ON_AUCTION_FAILURE' : {
			return  {...state , putOnAuctionSuccess :  false} ; 
		}
		case 'SETBACK_PUT_PRODUCT_ON_AUCTION_SUCCESS' : {
			return  {...state , putOnAuctionSuccess :  null} ; 
		}

		//Delete Product
		case 'PRODUCT_DELETE_SUCCESS' : {
			return  {...state , productDeleteSuccess :  true} ; 
		}
		case 'PRODUCT_DELETE_FAILURE' : {
			return  {...state , productDeleteSuccess :  false} ; 
		}
		case 'PRODUCT_DELETE_SETBACK' : {
			return  {...state , productDeleteSuccess :  null} ; 
		}


		default :
			return state ; 

	}


}
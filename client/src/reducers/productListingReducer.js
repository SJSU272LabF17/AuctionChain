const initialState = {
	
	productList :  null ,
	currentAuctionedProduct : null
}



export default function productListingReducer (state=initialState , action )  {


	

	switch(action.type){
		case 'GET_ALL_PRODUCTS' : {
			return  {...state , productList :  action.payload , currentAuctionedProduct : null} ; 
		}
		case 'GET_CURRENT_AUCTIONED_PRODUCT_SUCCESS' : {
			return  {...state , currentAuctionedProduct :  action.payload , productList : []} ; 
		}



		default :
			return state ; 

	}


}
const initialState = {
	
	productList :  [] ,
	currentAuctionedProduct : null
}



export default function productListingReducer (state=initialState , action )  {


	

	switch(action.type){
		case 'GET_ALL_PRODUCTS' : {
			return  {...state , productList :  action.payload} ; 
		}
		case 'GET_CURRENT_AUCTIONED_PRODUCT_SUCCESS' : {
			return  {...state , currentAuctionedProduct :  action.payload} ; 
		}



		default :
			return state ; 

	}


}
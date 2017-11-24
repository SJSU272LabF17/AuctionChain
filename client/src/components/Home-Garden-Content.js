import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import { getAllProducts } from '../actions/product_listing_action';

class HomeGardenContent extends Component {
  
    constructor(props){
      super(props);

      this.state={
        category : this.props.location.pathname.indexOf('/home-garden/category/') === -1 ? '' : 
                   this.props.location.pathname.replace('/home-garden/category/' , '')
      }
    }

    componentWillMount(){
      this.props.getAllProducts(this.state.category);
  }


    render() {
      
      const listOfProducts = this.props.productList.map((product , key ) => {
          return <div  onClick={() => {
                                          var url = '/productDetails/' + product.productListingId ; 
                                          this.props.history.push(url) ; 
                                      }}  key={key} className="singleProductDiv col-lg-4 col-sm-4 col-md-4 col-xs-4">
                          <div className="DivForSingleImageAllAuction  textColorBlack">
                             <div >
                               <div className="DivForImageInfoName col-lg-10 col-sm-10 col-md-10 col-xs-10">
                                   {product.productName}
                                   <div className="ImageDescription">
                                   {product.productDesc} 
                                  </div> 
                               </div>
                            </div>
                          </div>

                         <div className="singleImageDiv ">
                              <img className="singleImageAuctioned" alt="" src={require("../assets/placeholder.png")} />
                         </div>
                         
                          <div className="AuctionPriceDiv">
                             <a className="auctionPrice"> <i className="fa fa-usd fa-lg" aria-hidden="true"> ${product.maxBidPrice}</i> </a>
                          </div>

                           <div className="AuctionPriceDiv">
                             <a className="auctionPrice"> Total # of Bids : {product.numberOfBids} </a>
                          </div>

                    </div>
      })

      return (
          <div className="rightDivForAllProducts">
            
                  <div className="allProductsDiv">
                    {
                      listOfProducts
                    }  
                  </div>
            </div>
      )
    }
  }

function mapDispatchToProps(dispatch){
    return {
      getAllProducts : (category) => dispatch(getAllProducts(category))
    }
  }

  function mapStateToProps(state) {
      return {
        productList :state.ProductListingReducer.productList,
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(HomeGardenContent) ; 
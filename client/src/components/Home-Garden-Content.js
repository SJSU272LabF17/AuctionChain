import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import { getAllProducts } from '../actions/product_listing_action';
import Loader from 'react-loader'

class HomeGardenContent extends Component {
  
    constructor(props){
      super(props);

      this.state={
        category : this.props.location.pathname.indexOf('/home-garden/category/') === -1 ? '' : 
                   this.props.location.pathname.replace('/home-garden/category/' , ''),

        isLoaded : false  ,
        loaderOptions : {
            color: '#894EA2',
            
        }


      }
    }

    componentDidMount(){
       console.log("New files found Did mount "  , this.props.listOfProducts  ) ; 
      if(this.props.listOfProducts == null ){
         this.props.getAllProducts(this.state.category);
         this.setState({isLoaded : true })
      }
     
    }


    componentWillReceiveProps(newProps){
      console.log("New files found "  , newProps.listOfProducts  ) ; 
      if(newProps.listOfProducts != null ){
        this.setState({ isLoaded : false })
      }
    }


    render() {
      
      

      return (

          <div className="rightDivForAllProducts">
                  
                   <div>
                      <Loader loaded={!this.state.isLoaded} options={this.state.loaderOptions} >
                        <div className="loaded-contents"></div>
                      </Loader>
                    </div>


                  <div className="allProductsDiv">
                    {
                       this.props.productList == null ?  <span /> : 

                       this.props.productList.map((product , key ) => {
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
                                                  <img className="singleImageAuctioned" alt="" src={this.props.serverURL + product.imageurl} />
                                             </div>
                                             
                                              <div className="AuctionPriceDiv">
                                                 <a className="auctionPrice"> <i className="fa fa-usd fa-lg" aria-hidden="true"> {product.maxBidPrice}</i> </a>
                                              </div>

                                               <div className="AuctionPriceDiv">
                                                 <a className="auctionPrice"> Total # of Bids : {product.numberOfBids} </a>
                                              </div>

                                        </div>
                                  })
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
        serverURL : state.AuthReducer.nodeServerURL
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(HomeGardenContent) ; 
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import {getCurrentProductAuctioned} from '../actions/product_listing_action'
import {placeBid , closeBid } from '../actions/bidding'

class LiveAuction extends Component {
  
    constructor(props){
      super(props);

      this.state={
        listingId : this.props.location.pathname.indexOf('/productDetails/') === -1 ? '' : 
                   this.props.location.pathname.replace('/productDetails/' , '')  , 
        bidAmount : 0 
      }
    }

    componentWillMount(){
      if(this.state.listingId !== ""){
        console.log("Calling all the data " , this.state.listingId) ;
        this.props.getCurrentProductAuctioned(this.state.listingId)
      }
    }

    componentWillReceiveProps(newProps){
     /* var self = this ; 
             setInterval(function(){
                self.props.getCurrentProductAuctioned(self.state.listingId)
             } , 15000)*/
    
    }

    render() {
      console.log("Current suction product " , this.props.currentAuctionedProduct)
     
      return (
        <div className="auction-main-div">
          


            {
                 this.props.currentAuctionedProduct != null ? 
                 <div className="auction-main-div-container row">
                    <div className="auction-main-div-container-subdiv col-md-4 col-lg-4 col-sm-4 col-xs-4">
                      <div>
                           <img className="mainAuctionImage" alt="" src={require("../assets/placeholder.png")} /> 
                      </div>
                     
                      <div className="bid-action-div">
                        {
                          this.props.user == null ? 
                           (<div> 
                              <span className="text-red">Login To Bid</span>
                            </div> )
                           : 


                             ( this.props.user.email === this.props.currentAuctionedProduct.owner ? 
                              <div >
                                <button className="btn btn-danger sharpCorner" onClick={() => {
                                  this.props.closeBid(this.state.listingId) ; 
                                }}>Close Bid</button>
                              </div>
                              :

                               <div className="bid-action-div-content"> 
                                  
                                  <div className="current-max-bid-div">
                                    Current Bid : {this.props.currentAuctionedProduct.offers[0].bidPrice}
                                  </div>
                                  <div>
                                          <span><i className="fa fa-gavel fa-lg bidImage" aria-hidden="true"></i></span>
                                          <input className="bidPriceTextBox" id="carid" type="number"  onChange={(e) => {
                                            this.setState({
                                              bidAmount : e.target.value
                                            })
                                          }} aria-describedby="basic-addon1"  placeholder="Enter Bid Amount" />
                                      <label onClick={() => {
                                        this.props.placeBid(this.props.user.email , this.state.bidAmount , this.state.listingId)
                                      }}className="btn btn-primary btn-circle btn-xs lable-margin"><span className="glyphicon glyphicon-ok"></span></label>
                                  </div>
                                  <div className="bid-suggestion">
                                    Enter US {this.props.currentAuctionedProduct.offers[0].bidPrice * 1.01} or more
                                  </div>
                                  <div className="shipping">
                                    Shipping: $23.00 Economy Shipping
                                  </div>
                           </div> )
                        }
                      </div>
                     
                    </div>
                    <div className="auction-main-div-container-subdiv2 col-md-3 col-lg-3 col-sm-3 col-xs-3">
                      
                       <div>
                        <span className="name">{this.props.currentAuctionedProduct.productName }</span> 
                       </div>
                       <div>
                        <span className="desc">{this.props.currentAuctionedProduct.productDesc } </span>
                       </div>
                       <div>
                        <span className="desc">{this.props.currentAuctionedProduct.productCategory } </span>
                       </div>

                    </div>
                    <div className="auction-main-div-container-subdiv3 col-md-5 col-lg-5 col-sm-5 col-xs-5">
                      {
                          this.props.currentAuctionedProduct.offers.map((offer , key) => {
                            
                            return <div className="individualAuctionDiv" key={key}> 
                              
                              <span className="glyphicon glyphicon-circle-arrow-right individualAuctionGlyph"></span>
                              <span className="individualAuctionGlyph">{offer.email}</span>
                              <span className="individualAuctionGlyph"><span className="dollarSign">$</span>{offer.bidPrice}</span> 
                              <input className="offer-timestamp" type="text" onChange={() => {

                              }} value={offer.timestamp} />
                               </div>
                            })  

                        } 
                    </div>
                </div>

                :

                <div>
                </div>
            }



        
            
          
       </div> 
      );
    }
  }

function mapDispatchToProps(dispatch){
    return {
      getCurrentProductAuctioned : (listingId) => dispatch(getCurrentProductAuctioned(listingId)),
      placeBid : (email , amount , listingId) => dispatch(placeBid(email , amount , listingId)) , 
      closeBid : (listingId) => dispatch(closeBid(listingId))
    }
  }

  function mapStateToProps(state) {
      return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        currentAuctionedProduct : state.ProductListingReducer.currentAuctionedProduct ,
        user : state.AuthReducer.user
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(LiveAuction) ; 
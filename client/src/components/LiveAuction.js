import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import {getCurrentProductAuctioned} from '../actions/product_listing_action'
import {placeBid , closeBid } from '../actions/bidding'
import  NotificationSystem from 'react-notification-system'
import Loader from 'react-loader'

class LiveAuction extends Component {
  
    constructor(props){
      super(props);

      this._notificationSystem = null ; 

      this.state={
        listingId : this.props.location.pathname.indexOf('/productDetails/') === -1 ? '' : 
        this.props.location.pathname.replace('/productDetails/' , '')  , 
        bidAmount : 0 ,
        bidError : '' ,
        isLoaded: false ,

        loaderOptions : {
            color: '#894EA2'
        }
        
      }

      this._addNotification = this._addNotification.bind(this) ; 
    }

    

    _addNotification( type, message ) {
      switch(type) {
            case  'Success' : {
               this._notificationSystem.addNotification({
                            message: message,
                            level: 'info',
                            position : 'bc' ,
                            autoDismiss : 4
              });
               break
             }
              case  'Error' : {
               this._notificationSystem.addNotification({
                            message: message,
                            level: 'error',
                            position : 'bc',
                            autoDismiss : 4
              });
               break
             }
        }
    }


    componentDidMount(){

      if(this.props.currentAuctionedProduct == null){
        this.setState({ isLoaded : true })
      }

      if(this.state.listingId !== ""){
        this.props.getCurrentProductAuctioned(this.state.listingId)
      }
    }



    componentWillReceiveProps(newProps){
    
      if(newProps.bidSuccess != null && newProps.bidSuccess == true ){
        this._addNotification("Success" , "Bid Submitted Successfully") ;
        this.setState({ bidAmount : 0  , isLoaded : false})

        newProps.getCurrentProductAuctioned(this.state.listingId) ;
        newProps.setBackBidSuccess() ;
      }

      if(newProps.bidSuccess != null && newProps.bidSuccess == false){
        this.setState({ isLoaded : false  }) ;
        this._addNotification("Error" , "Failed to Submit the Bid") ;
        newProps.setBackBidSuccess() ;
      }


     

       if(newProps.currentAuctionedProduct != null){
          this.setState({ isLoaded : false })
        }

     /* var self = this ; 
             setInterval(function(){
                self.props.getCurrentProductAuctioned(self.state.listingId)
              } , 15000)*/
    
    }


    placeBid(){
          var priceToCompare ;

          this.props.currentAuctionedProduct.offers[0] == undefined ? 
          priceToCompare = this.props.currentAuctionedProduct.maxBidPrice :
          priceToCompare = Math.ceil(this.props.currentAuctionedProduct.offers[0].bidPrice * 1.05 )


          
          if(this.state.bidAmount < priceToCompare){
            this._addNotification("Error" , "Please check the expected least amount to bid") ;
            return 
          }
          
          if(this.state.bidAmount > this.props.user.balance){
            this._addNotification("Error" , "Not Enough funds to proceed!!") ;
            return 
          }


          this.setState({ isLoaded : true,   } );
        this.props.placeBid(this.props.user.email , this.state.bidAmount , this.state.listingId)
    }




   

    render() {
      
     
      console.log("CUrrent Prout " , this.props.currentAuctionedProduct) ; 

      return (
        <div className="auction-main-div">
          
            <NotificationSystem ref={n => this._notificationSystem = n} />

            <div>
              <Loader loaded={!this.state.isLoaded} options={this.state.loaderOptions} >
                <div className="loaded-contents"></div>
              </Loader>
            </div>

            {
                 this.props.currentAuctionedProduct != null ? 

                 <div className="auction-main-div-container row">
                    <div className="auction-main-div-container-subdiv col-md-4 col-lg-4 col-sm-4 col-xs-4">
                      <div>
                           <img className="mainAuctionImage" alt="" src={this.props.serverURL + this.props.currentAuctionedProduct.imageurl} /> 
                      </div>
                     
                      <div className="bid-action-div">
                        {
                          this.props.user == null ? 
                           (<div> 
                                <h4 className="text-red">Login To Bid</h4>
                            </div> )
                           : 


                             ( this.props.user.email === this.props.currentAuctionedProduct.owner ? 
                              <div >
                              {
                                this.props.currentAuctionedProduct.state == "SOLD" ? 
                                <h4 className="text-red">Congrats !!! You are the owner of the product</h4>
                                :
                                  <button className="btn btn-danger closeBidButton" onClick={() => {
                                      this.props.closeBid(this.state.listingId) ; 
                                    }}>Close Bid</button>
                                 
                              }
                              </div>
                              
                              :

                              (

                               
                                  this.props.currentAuctionedProduct.state =="SOLD" ? 
                                  <div><h3 className="text-brown">Sorry !! The Product is already Sold</h3></div>
                                  :
                                  
                                    <div className="bid-action-div-content"> 
                                   
                                       <div className="current-max-bid-div">

                                        Current Bid-Price : { this.props.currentAuctionedProduct.offers[0] == undefined ? 
                                                              this.props.currentAuctionedProduct.maxBidPrice :
                                                              this.props.currentAuctionedProduct.offers[0].bidPrice

                                                          }
                                      </div>
                                      <div>
                                              
                                              <input className="bidPriceTextBox" id="carid" type="number" value={this.state.bidAmount}  onChange={(e) => {
                                                this.setState({
                                                  bidAmount : e.target.value
                                                })
                                              }} aria-describedby="basic-addon1"  />
                                              <span onClick={this.placeBid.bind(this)}><i className="fa fa-gavel fa-lg bidImage" aria-hidden="true"></i></span>

                                               
                                        
                                      </div>
                                      <div className="bid-suggestion">
                                        <span className="text-red">Enter USD { this.props.currentAuctionedProduct.offers[0] == undefined ? 
                                                              this.props.currentAuctionedProduct.maxBidPrice :
                                                              Math.ceil(this.props.currentAuctionedProduct.offers[0].bidPrice * 1.05 )

                                                          } or more</span>
                                      </div>
                                      <div className="bid-suggestion">
                                        <span className="text-red">{this.state.bidError}</span>
                                      </div>
                                      <div className="shipping">
                                        Shipping: $23.00 Economy Shipping
                                      </div>
                                  </div> 
                  
                              



                              )
                           )
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

                    <div className="individualAuctionDivHead" > 
                        <span className="auction-heading">Auction Status</span>
                    </div>

                         <div className="scrollable-div">
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
      closeBid : (listingId) => dispatch(closeBid(listingId)) ,
      setBackBidSuccess : () => dispatch({ type : 'SET_BACK_BID_SUCCESS' })
    }
  }

  function mapStateToProps(state) {
      return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        currentAuctionedProduct : state.ProductListingReducer.currentAuctionedProduct ,
        user : state.AuthReducer.user,
        serverURL : state.AuthReducer.nodeServerURL ,
        bidSuccess : state.bidding.bidSuccess

      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(LiveAuction) ; 
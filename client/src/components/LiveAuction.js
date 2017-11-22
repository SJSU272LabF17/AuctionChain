import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import {getCurrentProductAuctioned} from '../actions/product_listing_action'
import {placeBid} from '../actions/bidding'

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


    render() {
      
     
      return (
        <div className="rightDiv">

          <div className="rightDiv">
            <section className="sectionattr backGroundWhite ">
             
                {
                 this.props.currentAuctionedProduct != null ? 
                  <div >
                 <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 LiveAucionMainDiv">
                        <img className="mainAuctionImage" alt="" src={require("../assets/1.jpg")} /> 
                 </div>
                 <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 LiveAucionMainDiv2 ">
                       <div><span>{this.props.currentAuctionedProduct.productName }</span> | <span></span>
                       <span>{this.props.currentAuctionedProduct.productCategory } </span>| <span></span>
                       <span>{this.props.currentAuctionedProduct.productDesc } </span> 
                       </div>

                       <div> 
                          <input className="form-control sharpCorner bidPriceTextBox" id="carid" type="number"  onChange={(e) => {
                            this.setState({
                              bidAmount : e.target.value
                            })
                          }} aria-describedby="basic-addon1"  placeholder="$" />
                          <label onClick={() => {
                            this.props.placeBid(this.props.user.email , this.state.bidAmount , this.state.listingId)
                          }}className="btn btn-primary btn-circle btn-md lable-margin"><span className="glyphicon glyphicon-ok"></span></label>
                       </div>
                 </div>


                 <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 LiveAucionStatusDiv">
                        

                        {
                          this.props.currentAuctionedProduct.offers.map((offer , key) => {
                            


                          return <div className="individualAuctionDiv" key={key}> 
                            
                            <span className="glyphicon glyphicon-circle-arrow-right individualAuctionGlyph"></span>
                              <span className="individualAuctionGlyph">{offer.email}</span>
                           
                            
                             
                            <span className="individualAuctionGlyph"><span className="dollarSign">$</span>{offer.bidPrice}</span> 
                           
                           
                                <span className="individualAuctionGlyph">{offer.timestamp}</span> 
                           
                            
                            <hr></hr>
                             </div>
                        })  

                        } 

                </div> 
                </div>
                :
                <p> </p>
                }
                
              
            
            </section>
          </div>
          
       </div> 
      );
    }
  }

function mapDispatchToProps(dispatch){
    return {
      getCurrentProductAuctioned : (listingId) => dispatch(getCurrentProductAuctioned(listingId)),
      placeBid : (email , amount , listingId) => dispatch(placeBid(email , amount , listingId))
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
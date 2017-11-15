import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 


class LiveAuction extends Component {
  
    constructor(props){
      super(props);

      this.state={
        sampleArray : ['name' , 'age']
      }
    }


    render() {
      return (
        <div className="rightDiv">

          <div className="DivForImageInfo">
            BRAND-NEW-Apple-iPhone-6-Plus-5-5-Display-16GB-GSM-UNLOCKED-Smartphone
          </div>

          <div className="row">
          <div className="divForLiveAuctionImage">
            <a>
              <div>
                <img className="divForLiveAuctionimageAttr" alt="" src={require("../assets/1.jpg")} />
              </div>
            </a>
          </div>

          <div className="divForAuctionInfo">
            <ul>
              <li>$400 FLOOR</li>
              <li>New Ask Price $500</li>
              <li>$400 FLOOR</li>
              <li>New Ask Price $500</li>
              <li>$400 FLOOR</li>
              <li>New Ask Price $500</li>
            </ul> 
          </div>  
        
          <div className="divForGraph">
            <a>
              <div>
                <img className="divForLiveAuctionimageAttr" alt="" src={require("../assets/1.jpg")} />
              </div>
            </a>
          </div>
          </div>

          <div className="row">

          <div className="divForRemainingLots">681 of 1037 Lots</div>

          <div className="divForBidOption">
            <button>Bid Now</button>
            <h6>By bidding, you agree to buy this item if you win.</h6>
              <div>
                <a href="#">Sign in to bid</a>
              </div>
          </div> 

          <div className="divForMetrix">
            <ul>
              <li>
                <div>21</div>
                <div>Bids</div>
              </li>

              <li>
                <div>00:89</div>
                <div>Time Elapsed</div>
              </li>
            </ul>
          </div>
          </div>
       </div> 
      );
    }
  }

function mapDispatchToProps(dispatch){
    return {
    
    }
  }

  function mapStateToProps(state) {
      return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(LiveAuction) ; 
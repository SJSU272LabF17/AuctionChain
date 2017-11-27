import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 

class MyProductList extends Component {
  
    render() {

      const displayNone = {
        display : "none"
      }
      

      return (
        <li className="liAttr">
                  <div className="row">
                    
                    <div className="divForImage col-lg-3 col-sm-3 col-md-3 col-xs-3">
                      <img className="imageAttr" alt="" src={this.props.serverURL + this.props.product.imageurl} />
                    </div>
                    
                    
                    <div className="DivForImageInfo col-lg-7 col-sm-7 col-md-7 col-xs-7 textColorBlack">
                      <div >
                         <div className="DivForImageInfoName col-lg-10 col-sm-10 col-md-10 col-xs-10">
                              {this.props.product.name }
                             <div className="ImageDescription">
                              {this.props.product.description}  
                            </div> 
                            <div className="ImageCategory">
                              <i className="fa fa-hand-o-right rightHandFa" aria-hidden="true"></i> {this.props.product.category} 
                            </div>
                         </div>
                         <div className=" col-lg-2 col-sm-2 col-md-2 col-xs-2">
                            <a className="cross"> <i className="fa fa-times" aria-hidden="true"></i></a>
                         </div>
                        
                      </div>
                    </div>
                      


                     <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 putonAuctionButtonDiv textColorBlack">
                          {
                            this.props.product.state === "FOR_SALE" ? 
                             <a ><i className="fa fa-university fa-usd auctionImage" aria-hidden="true"></i></a>
                            :
                            <Link to={ "/setUpAuction/" +  this.props.product.pid}><i className="fa fa-gavel fa-lg auctionImage" aria-hidden="true"></i></Link>
                          }
                    </div>

                  </div>
         </li>
                
      );
    }
  }

function mapDispatchToProps(dispatch){
    return {
    
    }
  }

  function mapStateToProps(state) {
      return {
        serverURL : state.AuthReducer.nodeServerURL
      };
  }

export default connect(mapStateToProps,mapDispatchToProps)(MyProductList) ; 
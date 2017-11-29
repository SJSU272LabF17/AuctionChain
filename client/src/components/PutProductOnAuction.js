import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import {putProductOnAuction , getSingleProductForAuction , setBackPutProductOnAuction } from '../actions/product_action'
import  NotificationSystem from 'react-notification-system'
import Loader from 'react-loader'

class AuctionProduct extends Component {
  
    constructor(props){
      super(props);

      this.state={
        productId : this.props.location.pathname.indexOf('/setUpAuction/') === -1 ? '' : 
                  this.props.location.pathname.replace('/setUpAuction/' , '') ,
        productObj : null ,
        reservedPrice : 0  ,
        putOnAuctionError : '' ,

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
                              position : 'tr' ,
                              autoDismiss : 4
                });
                 break
               }
                case  'Error' : {
                 this._notificationSystem.addNotification({
                              message: message,
                              level: 'error',
                              position : 'tr',
                              autoDismiss : 4
                });
                 break
               }
          }
      }


    componentWillMount(){
        this.props.getSingleProductForAuction(this.state.productId) ; 
    }

    componentWillReceiveProps(newProps){
        if(newProps.putOnAuctionSuccess === true ){
          this.setState({isLoaded : false })
         newProps.getSingleProductForAuction(this.state.productId) ; 
          this._addNotification("Success" , "Item Assigned for Auction")
          newProps.setBackPutProductOnAuction() ; 
        }

        if(newProps.putOnAuctionSuccess === false ){
          this.setState({isLoaded : false })
          this._addNotification("Error" , "Error while placing the item for auction")
          newProps.setBackPutProductOnAuction() ; 
        }


    }





    render() {
       
       console.log("this.props.singleProduct " , this.props.singleProduct) ; 
      return (
         <div>
            <NotificationSystem ref={n => this._notificationSystem = n} />
             <div>
                  <Loader loaded={!this.state.isLoaded} options={this.state.loaderOptions} >
                    <div className="loaded-contents"></div>
                  </Loader>
                </div>


            {
              this.props.singleProduct != undefined ? 

                <div className="PutOnAuctionDiv">
                  
                   <div className="rightDiv sectionForPutProductOnAuction">
                    
                      <div >
                   
                             <div className="  col-md-12 col-sm-12 col-lg-12 ">
                                <div className="col-md-2 col-sm-2 col-lg-2">
                                  <img className="outline" alt="loading Image" src={this.props.serverURL + this.props.singleProduct.imageurl}  height="100px" width="100px" />
                                </div>
                                <div className="col-md-10 col-sm-10 col-lg-10">
                                  <h3>{this.props.singleProduct.name} </h3>
                                </div>
                                <div>
                                  <span className="descForProductOnAuction">{ this .props.singleProduct.description}</span>
                                </div>
                            </div>
                           
                            

                            {
                              this.props.singleProduct.state == "ADDED" ? 
                                 <div>
                              
                                    <div className="margin30 col-md-12 col-sm-12 col-lg-12 ">
                                          <div className="form-group input-group">
                                                  <label htmlFor="Auction-Amount">Enter Minimum amount for Bid</label>
                                                 <input  type="number"   className="form-control" onChange={(e) => {
                                                    this.setState({reservedPrice : e.target.value})
                                                  }} placeholder="Amount" aria-describedby="basic-addon1"  required />                                        
                                          </div>
                                      </div>
                                      
                                      <div className="margin15 col-md-12 col-sm-12 col-lg-12 ">
                                          <div className="input-group">
                                                  <button className="btn btn-success sharpButton" onClick={() => {
                                                    this.setState({isLoaded : true })
                                                        this.props.putProductOnAuction(this.props.user.email , this.props.singleProduct.pid ,
                                                          this.props.singleProduct.name , this.props.singleProduct.description , 
                                                          this.props.singleProduct.category , this.state.reservedPrice, this.props.singleProduct.imageurl)
                                                       
                                                  }}>Submit</button>                                        
                                             </div>
                                      </div>

                                       

                                </div>
                              :

                              <span/>
                            

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
      putProductOnAuction : (email , pid , name , desc , category , price, imageurl) => dispatch(putProductOnAuction(email , pid , name , desc , category, price, imageurl )) , 
      getSingleProductForAuction : (id) => dispatch(getSingleProductForAuction(id)) , 
      setBackPutProductOnAuction : ( ) => dispatch(setBackPutProductOnAuction())
    }
  }

  function mapStateToProps(state) {
      return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        myProducts : state.ProductReducer.myProduct,
        user : state.AuthReducer.user , 
        singleProduct : state.ProductReducer.singleProduct  ,
        putOnAuctionSuccess : state.ProductReducer.putOnAuctionSuccess,
        serverURL : state.AuthReducer.nodeServerURL,
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(AuctionProduct) ; 
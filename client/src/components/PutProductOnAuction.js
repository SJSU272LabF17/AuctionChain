import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import {putProductOnAuction } from '../actions/product_action'

class AuctionProduct extends Component {
  
    constructor(props){
      super(props);

      this.state={
        productId : this.props.location.pathname.indexOf('/setUpAuction/') === -1 ? '' : 
                  this.props.location.pathname.replace('/setUpAuction/' , '') ,
        productObj : null ,
        reservedPrice : 0
      }
    }


    componentWillMount(){
      for(var i=0 ; i< this.props.myProducts.length ; i++){
        var obj = this.props.myProducts[i] ; 
        console.log("Checking current object " , this.props.myProducts[i] )
        if(obj.pid === this.state.productId){
            this.setState({
              productObj : obj
            })
        }
      }

      console.log("Object to auction " , this.state.productObj );
    }



    render() {
      return (
          
          <div className ='container marginLeft outline'>
            <div >
             
               <div className="  col-md-12 col-sm-12 col-lg-12 ">
                  <div className="col-md-2 col-sm-2 col-lg-2">
                    <img className="outline" alt="image" src={require("../assets/shopping.jpg")}  height="100px" width="100px" />
                  </div>
                  <div className="col-md-10 col-sm-10 col-lg-10">
                    <h3>Samsung </h3>
                  </div>
              </div>
             
              <div className="margin30 col-md-12 col-sm-12 col-lg-12 ">
                  <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                          <input  type="date" name='dob' id='dob'   className="form-control"  placeholder="DOB..." aria-describedby="basic-addon1"  required />                                        
                     </div>
              </div>
              
              <div className="margin30 col-md-12 col-sm-12 col-lg-12 ">
                  <div className="input-group">
                          <span className="input-group-addon"><i>$</i></span>
                          <input  type="number"   className="form-control" onChange={(e) => {
                            this.setState({reservedPrice : e.target.value})
                          }} placeholder="Amount" aria-describedby="basic-addon1"  required />                                        
                  </div>
              </div>
              
              <div className="margin30 col-md-12 col-sm-12 col-lg-12 ">
                  <div className="input-group">
                          <button className="btn btn-success" onClick={() => {
                            this.props.putProductOnAuction(this.props.user.email , this.state.productObj.pid ,
                            this.state.productObj.name , this.state.productObj.description , this.state.productObj.category )
                          }}>Submit</button>                                        
                     </div>
              </div>
              
              
            </div>
          </div>

      );
    }
  }

function mapDispatchToProps(dispatch){
    return {
      putProductOnAuction : (email , pid , name , desc , category ) => dispatch(putProductOnAuction(email , pid , name , desc , category ))
    }
  }

  function mapStateToProps(state) {
      return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        myProducts : state.ProductReducer.myProduct,
        user : state.AuthReducer.user
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(AuctionProduct) ; 
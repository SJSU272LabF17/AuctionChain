import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 


class AuctionProduct extends Component {
  
    constructor(props){
      super(props);

      this.state={
        product : this.props.location.pathname.indexOf('/setUpAuction/') === -1 ? '' : 
                  this.props.location.pathname.replace('/setUpAuction/' , '')
      }
    }


    componentWillMount(){
      console.log("Product " , this.state.product) ; 
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
                          <input  type="number"   className="form-control"  placeholder="Amount" aria-describedby="basic-addon1"  required />                                        
                  </div>
              </div>
              
              <div className="margin30 col-md-12 col-sm-12 col-lg-12 ">
                  <div className="input-group">
                          <button className="btn btn-success">Submit</button>                                        
                     </div>
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

  export default connect(mapStateToProps,mapDispatchToProps)(AuctionProduct) ; 
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import {putProductOnAuction , getSingleProductForAuction , setBackPutProductOnAuction } from '../actions/product_action'

class AuctionProduct extends Component {
  
    constructor(props){
      super(props);

      this.state={
        productId : this.props.location.pathname.indexOf('/setUpAuction/') === -1 ? '' : 
                  this.props.location.pathname.replace('/setUpAuction/' , '') ,
        productObj : null ,
        reservedPrice : 0  ,
        putOnAuctionError : ''
      }
    }


    componentWillMount(){
        this.props.getSingleProductForAuction(this.state.productId) ; 
    }

    componentDidUpdate(){
      console.log("HAHAHAH") ; 
      if(this.props.putOnAuctionSuccess === false ){
        this.setState({putOnAuctionError : 'Error occured while trying to auction the product'}) ;

        this.props.setBackPutProductOnAuction() ; 
      }

      if(this.props.putOnAuctionSuccess === true ){
        this.props.history.push('/myProduct')
      }


    }





    render() {
      console.log("Palashh hhhh h .. " , this.props.singleProduct) ; 
      return (
         <div>
      {
        this.props.singleProduct != undefined ? 

          <div className="PutOnAuctionDiv">
            
             <div className="rightDiv sectionForPutProductOnAuction">
              
                <div >
             
                       <div className="  col-md-12 col-sm-12 col-lg-12 ">
                          <div className="col-md-2 col-sm-2 col-lg-2">
                            <img className="outline" alt="image" src={require("../assets/placeholder.png")}  height="100px" width="100px" />
                          </div>
                          <div className="col-md-10 col-sm-10 col-lg-10">
                            <h3>{this.props.singleProduct.name} </h3>
                          </div>
                          <div>
                            <span className="descForProductOnAuction">{ this .props.singleProduct.description}</span>
                          </div>
                      </div>
                     
                      

                      {
                        this.props.putOnAuctionSuccess === true ? 
                        <div />
                        :

                        <div>
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
                                  <button className="btn btn-success sharpButton" onClick={() => {
                                    this.setState({putOnAuctionError : ''})
                               this.props.putProductOnAuction(this.props.user.email , this.props.singleProduct.pid ,
                                          this.props.singleProduct.name , this.props.singleProduct.description , this.props.singleProduct.category , this.state.reservedPrice )
                                       
                                  }}>Submit</button>                                        
                             </div>
                      </div>

                       <div className="text-red col-md-12 col-sm-12 col-lg-12 ">
                          
                                 {this.state.putOnAuctionError}                                

                      </div>



                      </div>
                      

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
      putProductOnAuction : (email , pid , name , desc , category , price ) => dispatch(putProductOnAuction(email , pid , name , desc , category, price )) , 
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
        putOnAuctionSuccess : state.ProductReducer.putOnAuctionSuccess
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(AuctionProduct) ; 
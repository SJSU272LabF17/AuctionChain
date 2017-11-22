import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 



class MyProductList extends Component {
  
    constructor(props){
      super(props);

      
    }


    render() {

      const displayNone = {
        display : "none"
      }
      console.log("My current Products " , this.props.myProducts.length) ; 

      return (
         <li className="liAttr">
                  <div className="row">
                    <div className="divForImage col-lg-3 ">
                      <a>
                        <div >
                          <img className="imageAttr" alt="" src={require("../assets/1.jpg")} />
                        </div>
                        
                      </a>
                    </div>
                    <div className="DivForImageInfo col-lg-7 textColorBlack">
                      {this.props.product.name } : {this.props.product.description} 
                    </div>
                     <div className="col-lg-2 textColorBlack">
                       <button className="btn btn-info sharpButton"><Link to={ "/setUpAuction/" +  this.props.product.pid}>Put on Auction</Link></button>
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
        isAuthenticated : state.AuthReducer.isAuthenticated,
        myProducts : state.ProductReducer.myProduct
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(MyProductList) ; 
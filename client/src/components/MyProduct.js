import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import {myProductList} from './MyProductList'
import {getAllUserProduct  } from '../actions/product_action'

class myProduct extends Component {
  
    constructor(props){
      super(props);

      this.state={
        productName : '' ,
        pic : {name : ''} ,
        desc : '' ,
        category : ''
      }
    }


    componentWillMount(){
      this.props.getAllUserProduct(this.props.user.email)
    }


    render() {


      const listOfProducts = this.props.myProducts.map((product , key) => {
        return <myProductList key={key} product={product}></myProductList>
      })

      const displayNone = {
        display : "none"
      }
      console.log("My current Products " , this.props.myProducts.length) ; 

      return (
         <div className="rightDiv">
            <section className="sectionattr">
              <ul className="ulattr">
                
                {  listOfProducts }
              
              

                
              </ul>
            
            </section>
          </div>

      );
    }
  }

function mapDispatchToProps(dispatch){
    return {
      getAllUserProduct : (email) => dispatch(getAllUserProduct(email))
    }
  }

  function mapStateToProps(state) {
      return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        myProducts : state.ProductReducer.myProduct,
        user : state.AuthReducer.user
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(myProduct) ; 
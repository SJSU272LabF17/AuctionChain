import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import {myProductList} from './MyProductList'


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
    
    }
  }

  function mapStateToProps(state) {
      return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        myProducts : state.ProductReducer.myProduct
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(myProduct) ; 
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import {getAllUserProduct  } from '../actions/product_action'
import MyProductList from './MyProductList'
import Loader from 'react-loader'


class myProduct extends Component {
  
    constructor(props){
      super(props);

      this.state={
        productName : '' ,
        pic : {name : ''} ,
        desc : '' ,
        category : '' ,

        isLoaded: false ,

        loaderOptions : {
            color: '#894EA2'
        }

      }

    }


   


    componentDidMount(){
      if(!this.props.isAuthenticated){
        this.props.history.push('/')
      }else{
        this.setState({isLoaded : true })
        this.props.getAllUserProduct(this.props.user.email);
      }
    }

  

    componentWillReceiveProps(newProps){
        if(newProps.myProducts != null){
          this.setState({isLoaded : false })
        }
    }


    render() {


     
      
      
      return (
         <div className="rightDiv">
            <section className="sectionattr">

               
                <div>
                  <Loader loaded={!this.state.isLoaded} options={this.state.loaderOptions} >
                    <div className="loaded-contents"></div>
                  </Loader>
                </div>

                <ul className="ulattr">
                  
                 {
                     this.props.myProducts == null ? <span></span> :

                     this.props.myProducts.map((product , key) => {
                                  return <MyProductList key={key} product={product}></MyProductList>
                                })              
                 }
          
                  
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
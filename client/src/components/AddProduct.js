import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import {addNewProduct } from '../actions/product_action'

class addProduct extends Component {
  
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

      const displayNone = {
        display : "none"
      }


      return (
          <div className ='container addProductDiv '>
            <div className="row  addProductChildDiv">
              <div className="  col-md-12 col-sm-12 col-lg-12 text-center">
                <h3>Enter the product details you wish to auction</h3>
              </div>
              
              <div className=" outline col-md-12 col-sm-12 col-lg-12 ">
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
                <div className="form-group col-md-6 col-sm-6 col-lg-6">
                    <label htmlFor="name">Product Name</label>
                    <input type="text"   onChange={(e) => {
                              this.setState({
                                productName : e.target.value
                              })
                            }}  className="form-control" id="name"/>
                 </div>
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
              </div>
              
              <div className=" outline col-md-12 col-sm-12 col-lg-12 ">
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
                <div className="form-group col-md-6 col-sm-6 col-lg-6">
                    <label htmlFor="upload">Upload Photo</label>
                    <label className="btn btn-primary btn-file btn-block">
                    Upload <input type="file" onChange={(e) => {
                                          var file = e.target.files[0];
                                          console.log('File to be uploaded ' , file ) ; 

                                          this.setState({
                                            pic : file
                                          })
                                          
                                        }} accept=".jpg,.jpeg,.png" style={displayNone}/>
                  </label>
                 </div>
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
              </div>



              <div className="  col-md-12 col-sm-12 col-lg-12 text-right">
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
                 <div className="form-group col-md-6 col-sm-6 col-lg-6">{this.state.pic.name}</div>
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
              </div>
              
              
              
              <div className=" outline col-md-12 col-sm-12 col-lg-12 ">
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
                <div className="form-group col-md-6 col-sm-6 col-lg-6">
                    <label htmlFor="desc">Description</label>
                    <textarea rows="3"   onChange={(e) => {
                              this.setState({
                                desc : e.target.value
                              })
                            }} className="form-control textarea" id="desc"></textarea>
                 </div>
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
              </div>
              
              <div className=" outline col-md-12 col-sm-12 col-lg-12 ">
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
                <div className="form-group col-md-6 col-sm-6 col-lg-6">
                    <label htmlFor="category">Category</label>
                    <select onChange={(e) => {
                              this.setState({
                                category : e.target.value
                              })
                            }} className="form-control selectpicker" id="category">
                      <option  className="selected disabled hidden">Select</option>
                      <optgroup label="Electronics">
                        <option>Mobiles</option>
                        <option>Camera</option>
                        <option>Hard drive</option>
                        <option>Consumer Electronics</option>
                      </optgroup>
                      <optgroup label="Fashion">
                        <option>Men</option>
                        <option>Women</option>
                        <option>Watches</option>
                        <option>Shoes</option>
                      </optgroup>
                      <optgroup label="Sports">
                        <option>Football</option>
                        <option>Soccer</option>
                        <option>Cricket</option>
                        <option>Tennis</option>
                      </optgroup>
                  </select>
                 </div>
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
              </div>
              
              <div className=" outline col-md-12 col-sm-12 col-lg-12 ">
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
                <div className="form-group col-md-6 col-sm-6 col-lg-6">
                    <button className="btn btn-success"  onClick={() => {
                     
                        this.props.addNewProduct(this.props.user.email 
                        , this.state.productName , this.state.desc , this.state.category) ;
                      

                    }} >Submit</button>
                 </div>
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
              </div>
              
              
              
            </div>
          </div>

      );
    }
  }

function mapDispatchToProps(dispatch){
    return {
      addNewProduct : (email , name , desc , category) => dispatch(addNewProduct(email , name , desc , category)),
    }
  }

  function mapStateToProps(state) {
      return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        user : state.AuthReducer.user
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(addProduct) ; 
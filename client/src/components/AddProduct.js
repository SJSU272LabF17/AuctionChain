import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import {addNewProduct  , setBackProductSuccess} from '../actions/product_action'
import Loader from 'react-loader'
import  NotificationSystem from 'react-notification-system'

class addProduct extends Component {
  
    constructor(props){
      super(props);

      this.state={
        productName : '' ,
        pic : '' ,
        picName : '',
        desc : '' ,
        category : '' ,
        addProductClientError : '' , 
        addProductServerError : '' ,
        loading : false ,

        isLoaded: false ,

        loaderOptions : {
            color: '#894EA2'
        },

        fileValue : '' 

      }

       this._addNotification = this._addNotification.bind(this) ; 
    }

    componentDidMount(){
      if(this.props.isAuthenticated !== true ){
        this.props.history.push('/')
      }
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




    componentWillReceiveProps(newProps) {    
      if(newProps.productAddSuccess === true && newProps.productAddSuccess != null){
        this.setState({
          productName : '' ,
          pic : '' ,
          desc : '' ,
          category : '' ,
          isLoaded : false ,
          picName : ''
        })
        this._addNotification("Success" , "Product Added Successfully")
        newProps.setBackProductSuccess() ; 
      }


      if(newProps.productAddSuccess === false){

        this.setState({
          isLoaded : false
        })
        this._addNotification("Error" , "Error occured while adding the product")
        newProps.setBackProductSuccess() ; 
      }

    }



      submitProduct(){

        if(this.state.productName === ""){
          this.setState({ addProductClientError : 'Please specify Product Name '});
          return
        }
        if(this.state.desc === ""){
          this.setState({ addProductClientError : 'Please provide some description '})
          return
        }
        if(this.state.category === ""){
         this.setState({ addProductClientError : 'Category is must'})
         return
       }
       if(this.state.pic=== ""){
         this.setState({ addProductClientError : 'Uploading photo of the product is mandatory'})
         return
       }

       this.setState({ addProductClientError : '' , isLoaded : true})


       this.props.addNewProduct(this.props.user.email , this.state.productName , this.state.desc , this.state.category, this.state.pic) ;
     }
     
    render() {

      const displayNone = {
        display : "none"
      }

    
      return (
          <div className ='container addProductDiv '>
            <div className="row  addProductChildDiv">
              <div className="  col-md-12 col-sm-12 col-lg-12 text-center">
                <h3 className="enter-product-details">Enter the product details you wish to auction</h3>
              </div>

               <div>
                  <Loader loaded={!this.state.isLoaded} options={this.state.loaderOptions} >
                    <div className="loaded-contents"></div>
                  </Loader>
                </div>
                 <NotificationSystem ref={n => this._notificationSystem = n} />
              
              <div className=" outline col-md-12 col-sm-12 col-lg-12 ">
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
                <div className="form-group col-md-6 col-sm-6 col-lg-6">
                    <label htmlFor="name" className="text-category">Product Name</label>
                    <input type="text" value={this.state.productName}  onChange={(e) => {
                              this.setState({
                                productName : e.target.value
                              })
                            }}  className="form-control " id="name"/>
                 </div>
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
              </div>
              
              <div className=" outline col-md-12 col-sm-12 col-lg-12 ">
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
                <div className="form-group col-md-6 col-sm-6 col-lg-6">
                    
                    <label htmlFor="name" className="text-category">Upload</label>
                    <div className="row">    
                        <div className="col-xs-12 col-md-12  col-sm-12 col-lg-12">  
                           <div className="input-group image-preview">

                                <input type="text" value={this.state.picName} className="form-control image-preview-filename" disabled="disabled"/>
                                <span className="input-group-btn">
                                   {
                                        this.state.pic != '' ? 
                                         <button type="button"  onClick={() => {
                                                                    this.setState({picName : '' , pic : '' , fileValue : ''})
                                                                }} className="btn btn-default image-preview-clear clearButton">
                                            <span className="glyphicon glyphicon-remove"></span> Clear
                                        </button>
                                        :
                                        <span />
                                    }

                                    <div className="btn btn-default image-preview-input">
                                        <span className="glyphicon glyphicon-folder-open"></span>
                                        <span className="image-preview-input-title">Browse</span>
                                        <input type="file" className="browseButton" accept="image/png, image/jpeg, image/gif" value={this.state.fileValue} onChange={(e) => {
                                                                                      console.log("Hola")
                                                                                      var file = e.target.files[0];
                                                                                      console.log('File to be uploaded ' , file ) ; 

                                                                                      this.setState({
                                                                                        pic : file  , picName : file.name
                                                                                      })
                                                                                      
                                                                                    }} accept=".jpg,.jpeg,.png" name="input-file-preview"/> 
                                    </div>


                                </span>
                            </div>
                        </div>
                    </div>


                 </div>
                 
              </div>



              
              
              
              <div className=" outline col-md-12 col-sm-12 col-lg-12 ">
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
                <div className="form-group col-md-6 col-sm-6 col-lg-6">
                    <label htmlFor="desc" className="text-category">Description</label>
                    <textarea rows="3"  value={this.state.desc}  onChange={(e) => {
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
                    <label htmlFor="category" className="text-category">Category</label>
                    <select value={this.state.category}  onChange={(e) => {
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
              
              <div className=" col-md-12 col-sm-12 col-lg-12 ">
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
                <div className="form-group col-md-6 col-sm-6 col-lg-6">
                    <p className="text-red">{this.state.addProductClientError}</p>
                    <p className="text-red">{this.state.addProductServerError}</p>
                    
                 </div>
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
              </div>


              <div className=" col-md-12 col-sm-12 col-lg-12 ">
                 <div className="form-group col-md-3 col-sm-3 col-lg-3"></div>
                <div  className="add-product-submit-div form-group col-md-6 col-sm-6 col-lg-6">
                    <button className="btn btn-success btn-block sharpButton add-product-submit"  onClick={this.submitProduct.bind(this)} >Submit</button>
                  </div>
                 <div className="form-group col-md-3 col-sm-3 col-lg-3 "></div>
              </div>
              
              
              
            </div>
          </div>

      );
    }
  }

function mapDispatchToProps(dispatch){
    return {
      addNewProduct : (email , name , desc , category, pic) => dispatch(addNewProduct(email , name , desc , category, pic)),
      setBackProductSuccess : () => dispatch(setBackProductSuccess())
    }
  }

  function mapStateToProps(state) {
      return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        user : state.AuthReducer.user , 
        productAddSuccess : state.ProductReducer.productAddSuccess,
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(addProduct) ; 
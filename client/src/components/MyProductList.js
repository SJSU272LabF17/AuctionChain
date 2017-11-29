import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import  NotificationSystem from 'react-notification-system'
import { Modal } from 'react-bootstrap';
import {deleteProduct, getAllUserProduct} from '../actions/product_action'


class MyProductList extends Component {
  
     constructor(props){
      super(props);

      this.state = {
        openDeleteModal : false
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



      componentWillReceiveProps(newProps){

        if(newProps.productDeleteSuccess === true ){
           this._addNotification("Success" , "Product Deleted Successfully") ;
           newProps.setBackDeleteSuccess() ;
           newProps.getAllUserProduct(this.props.user.email);
        }

        if(newProps.productDeleteSuccess === false){
           this._addNotification("Error" , "Failed to Delete Product") ;
           newProps.setBackDeleteSuccess() ;
        }
      }

    deleteProduct(){
      if(this.props.product.state === "FOR_SALE"){
        this._addNotification("Error" , "Item is on Sale, First CLose the Auction")
        return ; 
      }

      this.setState({ openDeleteModal : true })
    }


    deleteProductApi(){
      this.setState({ openDeleteModal : false })
      this.props.deleteProduct(this.props.product.pid)
    }


    render() {
     
      return (
        <li className="liAttr">
                  <div className="row">
                    <NotificationSystem ref={n => this._notificationSystem = n} />

                    <div className="divForImage col-lg-3 col-sm-3 col-md-3 col-xs-3">
                      <img className="imageAttr" alt="" src={this.props.serverURL + this.props.product.imageurl} />
                    </div>
                    
                    <Modal show={this.state.openDeleteModal}  id="carModal" className="deleteCarModal">
                        <Modal.Body>
                            <b>Are you sure to delete {this.props.product.name } ?  </b>
                        </Modal.Body>
                        <Modal.Footer className="carDeleteFooter">
                            <button className="btn btn-primary " onClick={this.deleteProductApi.bind(this)}>YES</button>
                            <button className="btn btn-default " onClick={() => { this.setState({openDeleteModal : false})}}>NO</button>
                        </Modal.Footer>
                    </Modal>

                    <div className="DivForImageInfo col-lg-7 col-sm-7 col-md-7 col-xs-7 textColorBlack">
                      <div >
                         <div className="DivForImageInfoName col-lg-10 col-sm-10 col-md-10 col-xs-10">
                              {this.props.product.name }
                             <div className="ImageDescription">
                              {this.props.product.description}  
                            </div> 
                            <div className="ImageCategory">
                              <i className="fa fa-hand-o-right rightHandFa" aria-hidden="true"></i> {this.props.product.category} 
                            </div>
                         </div>
                         <div className=" col-lg-2 col-sm-2 col-md-2 col-xs-2">
                            <a className="cross" onClick={this.deleteProduct.bind(this)}> <i className="fa fa-times" aria-hidden="true"></i></a>
                         </div>
                        
                      </div>
                    </div>
                      


                     <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 putonAuctionButtonDiv textColorBlack">
                          {
                            this.props.product.state === "FOR_SALE" ? 
                             <span />
                            :
                            <Link to={ "/setUpAuction/" +  this.props.product.pid}><i className="fa fa-gavel fa-lg auctionImage" aria-hidden="true"></i></Link>
                          }
                    </div>

                  </div>
         </li>
                
      );
    }
  }

function mapDispatchToProps(dispatch){
    return {
      deleteProduct : (id) => dispatch(deleteProduct(id)) ,
      setBackDeleteSuccess : () => dispatch({ type : "PRODUCT_DELETE_SETBACK"}),
       getAllUserProduct : (email) => dispatch(getAllUserProduct(email))
    }
  }

  function mapStateToProps(state) {
      return {
        serverURL : state.AuthReducer.nodeServerURL ,
        productDeleteSuccess : state.ProductReducer.productDeleteSuccess,
        user : state.AuthReducer.user
      };
  }

export default connect(mapStateToProps,mapDispatchToProps)(MyProductList) ; 
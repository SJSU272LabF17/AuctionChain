import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 



export default function(InnerComponent){

    class HomeGarden extends Component {
  
    constructor(props){
      super(props);

      this.state={
        sampleArray : ['name' , 'age']
      }
    }


    render() {




      return (
        <div className="content-section">
          <div className="container-fluid">
            <div className ='foo container CategoryDiv'>
              
              <div >
                <h4 className="textColorBlack">Shop by Category</h4>
              </div>
              
              <div className="margin15">
                <ul className="list-group">
                <li className="list-group-item padd">
                  <h4>Electronics</h4>
                </li>
                <li className="list-group-item padd">
                  <Link className="padd" to="/home-garden/product/Mobiles">Mobiles</Link>
                </li>
                <li className="list-group-item padd">
                  
                  <Link className="padd" to="/home-garden/product/Camera">Camera</Link>
                </li>
                <li className="list-group-item padd">
                  
                  <Link className="padd" to="/home-garden/product/Hard drive">Hard drive</Link>
                </li>
                <li className="list-group-item padd">
                  
                  <Link className="padd" to="/home-garden/product/Consumer Electronics">Consumer Electronics</Link>
                </li>
                
                <li className="list-group-item padd">
                  <h4>Fashion</h4>
                </li>
                <li className="list-group-item padd">
                  
                  <Link className="padd" to="/home-garden/product/Men">Men</Link>
                </li>
                <li className="list-group-item padd">
                  
                  <Link className="padd" to="/home-garden/product/Women">Women</Link>
                </li>
                <li className="list-group-item padd">
                  
                  <Link className="padd" to="/home-garden/product/Watches">Watches</Link>
                </li>
                <li className="list-group-item padd">
                  
                  <Link className="padd" to="/home-garden/product/Shoes">Shoes</Link>
                </li>
                
                
                
                <li className="list-group-item padd">
                  <h4>Sports</h4>
                </li>
                <li className="list-group-item padd">
                  
                  <Link className="padd" to="/home-garden/product/Football">Football</Link>
                </li>
                <li className="list-group-item padd">
                  
                  <Link className="padd" to="/home-garden/product/Soccer">Soccer</Link>
                </li>
                <li className="list-group-item padd">
                  
                  <Link className="padd" to="/home-garden/product/Cricket">Cricket</Link>
                </li>
                <li className="list-group-item padd">
                  
                  <Link className="padd" to="/home-garden/product/Tennis">Tennis</Link>
                </li>
                
              </ul>
              </div>
              


              
          </div>
            <InnerComponent   {...this.props}></InnerComponent>
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

  return connect(mapStateToProps,mapDispatchToProps)(HomeGarden) ; 


}




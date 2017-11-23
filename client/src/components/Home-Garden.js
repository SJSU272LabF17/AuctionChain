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
              
              <div className="Panel-header">
                <h4 className="headingLeftPanel">Shop by Category</h4>
                <hr></hr>
              </div>
              
              <div className="margin15">
              <ul className="list-group">
              <li className="list-group-item padd">
                <h4 className="bold">Electronics</h4>
              </li>
              <li className="list-group-item padd">
                <Link className="padd" to="/home-garden/category/Mobiles">Mobiles</Link>
              </li>
              <li className="list-group-item padd">
                
                <Link className="padd" to="/home-garden/category/Camera">Camera</Link>
              </li>
              <li className="list-group-item padd">
                
                <Link className="padd" to="/home-garden/category/Hard drive">Hard drive</Link>
              </li>
              <li className="list-group-item padd">
                
                <Link className="padd" to="/home-garden/category/Consumer Electronics">Consumer Electronics</Link>
              </li>
             <hr></hr> 
              <li className="list-group-item padd">
                <h4>Fashion</h4>
              </li>
              <li className="list-group-item padd">
                
                <Link className="padd" to="/home-garden/category/Men">Men</Link>
              </li>
              <li className="list-group-item padd">
                
                <Link className="padd" to="/home-garden/category/Women">Women</Link>
              </li>
              <li className="list-group-item padd">
                
                <Link className="padd" to="/home-garden/category/Watches">Watches</Link>
              </li>
              <li className="list-group-item padd">
                
                <Link className="padd" to="/home-garden/category/Shoes">Shoes</Link>
              </li>
              <hr></hr>
              <li className="list-group-item padd">
                <h4>Sports</h4>
              </li>
              <li className="list-group-item padd">
                
                <Link className="padd" to="/home-garden/category/Football">Football</Link>
              </li>
              <li className="list-group-item padd">
                
                <Link className="padd" to="/home-garden/category/Soccer">Soccer</Link>
              </li>
              <li className="list-group-item padd">
                
                <Link className="padd" to="/home-garden/category/Cricket">Cricket</Link>
              </li>
              <li className="list-group-item padd">
                
                <Link className="padd" to="/home-garden/category/Tennis">Tennis</Link>
              </li>
              <hr></hr>
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




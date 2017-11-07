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
        <div >
          <div className="container-fluid">
            <div className ='foo container'>
              
              <div >
                <h4 className="textColorBlack">Shop by Category</h4>
              </div>
              
              <div className="margin15">
                <ul className="list-group">
                <li className="list-group-item padd">
                  <h4>Electronics</h4>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Mobiles</a>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Camera</a>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Hard drive</a>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Consumer Electronics</a>
                </li>
                
                <li className="list-group-item padd">
                  <h4>Fashion</h4>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Men</a>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Women</a>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Watches</a>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Shoes</a>
                </li>
                
                
                
                <li className="list-group-item padd">
                  <h4>Sports</h4>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Football</a>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Soccer</a>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Cricket</a>
                </li>
                <li className="list-group-item padd">
                  <a className="padd" href="">Tennis</a>
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




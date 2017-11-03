import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 


class HomeGardenContent extends Component {
  
    constructor(props){
      super(props);

      this.state={
        sampleArray : ['name' , 'age']
      }
    }


    render() {




      return (
          <div className="rightDiv">
            <section className="sectionattr">
              <ul className="ulattr">
                <li className="liAttr">
                  <div className="row">
                    <div className="divForImage col-lg-3">
                      <a>
                        <div >
                          <img className="imageAttr" alt="" src={require("../assets/1.jpg")} />
                        </div>
                        
                      </a>
                    </div>
                    <div className="DivForImageInfo col-lg-9 textColorBlack">
                      BRAND-NEW-Apple-iPhone-6-Plus-5-5-Display-16GB-GSM-UNLOCKED-Smartphone
                    </div>
                  </div>
                </li>
                
                <li className="liAttr">
                  <div className="row">
                    <div className="divForImage col-lg-3 ">
                      <a>
                        <div >
                          <img className="imageAttr" alt="" src={require("../assets/shopping.jpg")} />
                        </div>
                        
                      </a>
                    </div>
                    <div className="DivForImageInfo col-lg-9 textColorBlack">
                      Samsung Galaxy S8
                    </div>
                  </div>
                </li>
              
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
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(HomeGardenContent) ; 
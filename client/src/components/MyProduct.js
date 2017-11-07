import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 


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

      const displayNone = {
        display : "none"
      }


      return (
         <div className="rightDiv">
            <section className="sectionattr">
              <ul className="ulattr">
                <li className="liAttr">
                  <div className="row">
                    <div className="divForImage col-lg-3 ">
                      <a>
                        <div >
                          <img className="imageAttr" alt="" src={require("../assets/1.jpg")} />
                        </div>
                        
                      </a>
                    </div>
                    <div className="DivForImageInfo col-lg-7 textColorBlack">
                      BRAND-NEW-Apple-iPhone-6-Plus-5-5-Display-16GB-GSM-UNLOCKED-Smartphone
                    </div>
                     <div className="col-lg-2 textColorBlack">
                       <button className="btn btn-info"><Link to="/setUpAuction/samsung">Put on Auction</Link></button>
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

  export default connect(mapStateToProps,mapDispatchToProps)(myProduct) ; 
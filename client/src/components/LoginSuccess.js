import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {register} from '../actions/register_action'
import {login, timepass , logout} from '../actions/register_action'
import { connect } from 'react-redux' ; 


class LoginSuccess extends Component {
 
 
  componentWillMount(){
    if(!this.props.isAuthenticated){
      this.props.history.push('/login');
    }
  }



   componentDidUpdate(prevProps, prevState) {
      if(!this.props.isAuthenticated){
      this.props.history.push('/login');
    }
   }

   


  render() {
    console.log('User '  , this.props.user) ; 

    return (
    
         <div className="container padd">

         {
           this.props.user === null ? <b></b> : 
           <div>
           <div className="col-lg-2 col-md-2 col-sm-12"></div>
                <div className="col-lg-8 col-md-8 col-sm-12">
                  
                  <div className="panel panel-primary">
                    <div className="panel-heading text-center ">
                      <h2>Data of  the user</h2>
                    </div>
                    <div className="panel-body">
                      <div className="text-center font" >
                        
                        <div className="text-center font col-sm-12 col-lg-12 col-md-12">
                          <div className="col-sm-2 col-lg-2 col-md-2"></div>
                          <div className="col-sm-4 col-lg-4 col-md-4" >
                          </div>
                          <div className="col-sm-4 col-lg-4 col-md-4">
                          </div>
                          <div className="col-sm-2 col-lg-2 col-md-2"><button className="btn btn-danger pull-right" onClick={() => {
                            this.props.logout(); 
                          }}>Logout</button></div>
                        </div>


                        <div className="text-center font col-sm-12 col-lg-12 col-md-12">
                          <div className="col-sm-2 col-lg-2 col-md-2"></div>
                          <div className="col-sm-4 col-lg-4 col-md-4"  ><label >Name :</label>
                          </div>
                          <div className="col-sm-4 col-lg-4 col-md-4" ><label >{this.props.user.fname}</label>
                          </div>
                          <div className="col-sm-2 col-lg-2 col-md-2"></div>
                        </div>
                        
                        <div className="text-center font col-sm-12 col-lg-12 col-md-12">
                          <div className="col-sm-2 col-lg-2 col-md-2"></div>
                          <div className="col-sm-4 col-lg-4 col-md-4" ><label >Last Name :</label>
                          </div>
                          <div className="col-sm-4 col-lg-4 col-md-4"><label >{this.props.user.lname}</label>
                          </div>
                          <div className="col-sm-2 col-lg-2 col-md-2"></div>
                        </div>
                        
                        <div className="text-center font col-sm-12 col-lg-12 col-md-12">
                          <div className="col-sm-2 col-lg-2 col-md-2"></div>
                          <div className="col-sm-4 col-lg-4 col-md-4" ><label >DOB :</label>
                          </div>
                          <div className="col-sm-4 col-lg-4 col-md-4"><label >{this.props.user.dob}</label>
                          </div>
                          <div className="col-sm-2 col-lg-2 col-md-2"></div>
                        </div>
                        
                        <div className="text-center font col-sm-12 col-lg-12 col-md-12">
                          <div className="col-sm-2 col-lg-2 col-md-2"></div>
                          <div className="col-sm-4 col-lg-4 col-md-4" ><label >Gender : </label>
                          </div>
                          <div className="col-sm-4 col-lg-4 col-md-4"><label >{this.props.user.gender}</label>
                          </div>
                          <div className="col-sm-2 col-lg-2 col-md-2"></div>
                        </div>
                        
                      
                        
                        
                      
                      
                      </div>
                            
                      
                    </div>
                  <div className="panel-footer">
                  
                  </div>
                  </div>
                      
                
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12"></div>
                </div>
  
         }


          

        </div>





    );
  }
}



function mapDispatchToProps(dispatch){
  return {
    logout : () => dispatch(logout()),
  }
}


function mapStateToProps(state) {
    return {
         user : state.AuthReducer.userObj,
        isAuthenticated : state.AuthReducer.isAuthenticated,
    };
}



export default connect(mapStateToProps , mapDispatchToProps)(LoginSuccess) ;

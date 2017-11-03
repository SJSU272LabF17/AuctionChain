import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {register} from '../actions/register_action'
import {login, timepass} from '../actions/register_action'
import { connect } from 'react-redux' ; 


class RegistrationSuccess extends Component {
 
 
  componentWillMount(){
    if(this.props.user === ''){
      this.props.history.push('/login');
    }
  }


  render() {


    return (
    
          <div className="container">


            <div className="text-center">
                  <div className="col-sm-6 col-sm-offset-3 col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 ">
                  <br></br> <h2 className="text-green">Registration Successful</h2>
                  <h3>Dear, {this.props.user} </h3>
                  <p className="font-20">Thank you for registering with us, Please click below to login </p>
                  <Link className='btn btn-success' to="/login">Click here to Login</Link>
                  <br></br>
                  </div>
                  
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
         user : state.AuthReducer.user,
       
    };
}



export default connect(mapStateToProps , mapDispatchToProps)(RegistrationSuccess) ;

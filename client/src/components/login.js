import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {register , setBackRegisteredSuccess , login , checkIfAlreadyLoggedIn} from '../actions/register_action'
import { connect } from 'react-redux' ; 


class Login extends Component {
 
  constructor(props){
    super(props) ;

    this.state = {
      username : '' , 
      password : '' ,
      
    }
  }


  onChangeUsername(e){
    
    this.setState({
      username : e.target.value
    })
  }
  onChangePassword(e){
    this.setState({
      password : e.target.value
    })
  }
  
  handleSubmit(e) {
      e.preventDefault()
    }
  

     componentWillMount() {
      console.log('Component WILL MOUNT!')
      this.props.setBackRegisteredSuccess();
      if(this.props.isAuthenticated){
      this.props.history.push('/LoginSuccess');
    }
      

   }

  

  

   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!');
      if( this.props.isAuthenticated){
        this.props.history.push('/loginSuccess');
      }
   }

   



  render() {


    console.log("Is Authenticated " , this.props.isAuthenticated);

    return (
    

        <div>
          {
            this.props.isAuthenticated === false ? 
             <div className="container">
                      <div className="col-lg-2">
                      </div>
                      <div className="col-lg-8">



                      <div className="panel panel-primary " id='panelMargin'>
                      <div className="panel-heading"><h3>LOGIN</h3>
                      </div>



                      <div className="panel-body">


                      <div>

                        <div className='col-sm-12 form-group'>
                          <div className='col-lg-2  col-md-2  ' ></div>
                          <div className='col-lg-2  col-md-2  col-sm-12 ' >
                            <label htmlFor='username' className="label label-primary" >Username :</label>
                          </div>
                          <div className='col-sm-4 col-md-4  col-sm-12 '>
                            <input type="text" onChange={this.onChangeUsername.bind(this)} name='username' id='username'   className="form-control"  placeholder="Username..." aria-describedby="basic-addon1" required />
                          </div>
                          <div className='col-lg-1  col-md-1  col-sm-12 '> </div>
                        </div>
                        
                        <div className='col-sm-12 form-group'>
                          <div className='col-lg-2  col-md-2  ' ></div>
                          <div className='col-lg-2  col-sm-2  col-sm-12 ' >
                            <label htmlFor='pwd' className="label label-primary" >Password :</label>
                          </div>
                          <div className='col-sm-4 col-sm-4  col-sm-12 '>
                            <input type="password"  onChange={this.onChangePassword.bind(this)} name='password' id='pwd'   className="form-control"  placeholder="Password..." aria-describedby="basic-addon1"  required/>
                          </div>
                          <div className='col-lg-1  col-md-1  col-sm-12 '> </div>
                        </div>
                        
                        <div className='col-sm-12 form-group'>
                          <div className='col-sm-4 text-right'>
                          </div>
                          <div className='col-sm-2'>
                            <button className='btn btn-info' onClick={() => {
                              this.props.login(this.state.username , this.state.password)
                            }}> Login</button>
                          </div>
                        </div>

                      </div>

                      </div>

                      </div>

                      </div>

                      <div className="col-lg-2">
                      </div>

                  </div>
                  : 
                  <b></b>
               }

             </div>    




    );
  }
}



function mapDispatchToProps(dispatch){
  return {
    setBackRegisteredSuccess : () => dispatch(setBackRegisteredSuccess()),
    login : (username , password) => dispatch(login(username , password)),
    checkIfAlreadyLoggedIn : () => dispatch(checkIfAlreadyLoggedIn())
  }
}


function mapStateToProps(state) {
    return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
       
    };
}



export default connect(mapStateToProps , mapDispatchToProps)(Login) ;

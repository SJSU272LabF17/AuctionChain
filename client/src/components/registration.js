import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {register , setBackRegisteredSuccess} from '../actions/register_action'
import { connect } from 'react-redux' ; 


class Registration extends Component {
 
  constructor(props){
    super(props) ;

    this.state = {
      username : '' , 
      password : '' ,
      fname : '' ,
      lname : '',
      dob : '' ,
      gender : '',
      error : ''
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
  onChangeFname(e){
    console.log(e.target.value)
    this.setState({
      fname : e.target.value
    })
  }
  onChangeLname(e){
    this.setState({
      lname : e.target.value
    })
  }
  onChangeDOB(e){
    this.setState({
      dob : e.target.value
    })
  }
  onChangeGender(e){
  
    this.setState({
      gender : e.target.value
    })
  }

  handleSubmit(e) {
      e.preventDefault()
    }
  

   componentWillMount() {
      
      this.props.setBackRegisteredSuccess();
   }

  

   componentDidUpdate(prevProps, prevState) {
      
       
      if( this.props.registerSuccessful){
        this.props.history.push('/registrationSuccess')
      }
   }

  


  render() {

    


    return (
     <div className="panel panel-primary " id="registrationdiv">
        <div className="panel-heading">
                <h3 className="panel-title">Registration Form</h3>
        </div>
       
       <div className="panel-body">
       
        
        
        <div>
        
          <div className="row padd">
            <div className='form-group'>
            <div className='col-lg-3'></div>
              <div className='col-lg-1 col-md-1 col-sm-12' >
                <label htmlFor='username' className="label label-primary" >Username :</label>
              </div>
              <div className='col-lg-2 col-md-2 col-sm-12'>
                <input type="text" name='username'    id='username'   className="form-control" onChange={this.onChangeUsername.bind(this)} placeholder="Username..." aria-describedby="basic-addon1" required />
              </div>
              <div className='col-lg-6 '> </div>
            </div>
          </div>
          
          <div className="row padd">
            <div className='form-group'>
              <div className='col-lg-3'></div>
              <div className='col-lg-1 col-md-1 col-sm-12'>
                <label htmlFor='password' className="label label-primary" >Password :</label>
              </div>
              <div className='col-lg-2 col-md-2 col-sm-12'>
                <input type="password"   name='password' id='pwd' onChange={this.onChangePassword.bind(this)}  className="form-control"  placeholder="Password ..." aria-describedby="basic-addon1" required />
              </div>
              <div className='col-lg-6 '></div>
            </div>
          </div>
          
          
          
          
          <div className="row padd">
          <div className='form-group'>
            <div className='col-lg-3'></div>
            <div className='col-sm-1 col-md-1 col-sm-12' >
              <label htmlFor='fname' className="label label-primary" >First Name :</label>
            </div>
            <div className='col-sm-2 col-md-2 col-sm-12'>
              <input type="text" name='fname'  id='fname' onChange={this.onChangeFname.bind(this)}  className="form-control"  placeholder="First Name..." aria-describedby="basic-addon1"  required />
            </div>
            <div className='col-lg-6'></div>
          </div>
          </div>
          
          <div className="row padd">
          <div className='form-group'>
          <div className='col-lg-3'></div>
            <div className='col-sm-1 col-md-1 col-sm-12' >
              <label htmlFor='lname' className="label label-primary" >Last Name :</label>
            </div>
            <div className='col-lg-3 col-md-2 col-sm-12'>
              <input type="text" name='lname' id='lname'  onChange={this.onChangeLname.bind(this)} className="form-control"  placeholder="Last Name..." aria-describedby="basic-addon1"  required />
            </div>
            <div className='col-lg-5'></div>
          </div>
          </div>
          
          /*<div className="row padd">
          <div className='form-group'>
          <div className='col-lg-3'></div>
            <div className='col-sm-1 col-md-1 col-sm-12'>
              <label htmlFor='lname' className="label label-primary" >DOB :</label>
            </div>
            <div className='col-sm-2 col-md-2 col-sm-12'>
              <input type="date" onChange={this.onChangeDOB.bind(this)}  name='dob' id='fname'   className="form-control"  aria-describedby="basic-addon1"  required/>
            </div>
            <div className='col-lg-6'></div>
          </div>
          </div>
          
          <div className="row padd">
          <div className='form-group'>
          <div className='col-lg-3'></div>
            <div className='col-sm-1 col-md-1 col-sm-12'>
              <label htmlFor='lname' className="label label-primary" >GENDER :</label>
            </div>
            <div className='col-sm-4 col-md-4 col-sm-12'>
              <div className="radio-group" >
                      <div className="radio">

                        <label ><input type="radio" name="optradio" required value='Male' onChange={this.onChangeGender.bind(this)}/>Male </label>
                        <label><input type="radio" name="optradio" required value='Female'onChange={this.onChangeGender.bind(this)}/>Female </label>
                        <label><input type="radio" name="optradio" required value='Other' onChange={this.onChangeGender.bind(this)}/>Other </label>
                      </div >
                    </div>
            </div>
            <div className='col-lg-4'></div>
          </div>
          </div>*/
          
          
          <div className="row padd">
          <div className='form-group'>
          <div className='col-lg-3'></div>
            <div className='col-sm-1 col-md-1 col-sm-12'>
            </div>
            <div className='col-sm-2 col-md-2 col-sm-12'>
              <button className='btn btn-info' onClick={() => {
                      
                      var username_regex = /^[a-z0-9]{5,20}$/i ; 
                      var name_regex = /^[a-z]{3,20}$/i ;
                      var lname_regex = /^[a-z]{3,20}$/i ;
                      var password_regex = /^[a-z0-9]{5,20}$/i ; 

                      console.log(this.state.username,
                                this.state.password,
                                this.state.fname,
                                this.state.lname,
                                this.state.dob,
                                this.state.gender)


                     /* if(!username_regex.test(this.state.username)){
                        this.setState({
                          error : 'Username should be alpha-numeric and 5-20 characters'
                        })
                        return ;
                      }
                      if(!password_regex.test(this.state.password)){
                        this.setState({
                          error : 'Password should be alpha-numeric and 5-20 characters'
                        })
                        return ;
                      }
                      if(!name_regex.test(this.state.fname)){
                        this.setState({
                          error : 'First Name should contain only letters and 5-20 characters only'
                        })
                        return ;
                      }
                      if(!lname_regex.test(this.state.lname)){
                        this.setState({
                          error : 'Last Name should contain only letters and 5-20 characters only'
                        })
                        return ;
                      }
                      if(this.state.dob === ''){
                        this.setState({
                          error : 'Select Date of Birth'
                        })
                        return ;
                      }
                      if(this.state.gender === ''){
                        this.setState({
                          error : 'Select Gender'
                        })
                        return ;
                      }
                      */

                      
                      this.setState({
                          error : ''
                        })


                      this.props.register(this.state.username,
                                this.state.password,
                                this.state.fname,
                                this.state.lname)


                    }}>Submit</button>
            </div>
            <div className='col-lg-6'></div>
          </div>
          </div>
          
        
        
        </div>
        
        
        
      
      </div>
      <div className="panel-footer panel-info"><h3 className="panel-title"><b>Trademark ***</b></h3></div>


      <div className="row padd">
        <div className='form-group'>
        <div className='col-lg-3'></div>
          
          <div className='col-lg-7 col-md-7 col-sm-12' id="usernameExistDiv">
            <span className="text-red"> <b>{this.state.error}</b>  </span>
          </div>
          <div className='col-lg-2 col-md-2 col-sm-2'></div>
        </div>
      </div>

      </div>


    );
  }
}



function mapDispatchToProps(dispatch){
  return {
    register : (username , password , fname , lname ) => dispatch(register(username , password , fname , lname )),
    setBackRegisteredSuccess : () => dispatch(setBackRegisteredSuccess()),
  }
}


function mapStateToProps(state) {
    return {
        registerSuccessful : state.AuthReducer.registerSuccessful,
       
    };
}



export default connect(mapStateToProps , mapDispatchToProps)(Registration) ;


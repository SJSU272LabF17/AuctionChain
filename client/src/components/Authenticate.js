import React, { Component } from 'react';
import { connect } from 'react-redux' ; 
import {register , setBackRegisteredSuccess , login , checkIfAlreadyLoggedIn , logout } from '../actions/register_action'
import Modal from 'react-modal'
import { Modal as BootStrapModal } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function(InnerComponent){
	


   class Authenticate extends Component{

   	constructor(props){
		super(props);
		this.state = {
			modalIsOpen: false,
			 username : '' , 
		      password : '' ,
		      fname : '' ,
		      lname : '',
		      dob : '' ,
		      gender : '',
		      error : '',
		      modalIsOpenLogin : false ,
		      usernameLogin : '' , 
      		  passwordLogin : '' ,
		}
	}


	componentWillMount(){
		console.log("Initial")
	}

	 componentWillReceiveProps(newProps) {    
      console.log("CHeck " , this.props.register_success) ;
      if(newProps.register_success){
      	this.setState({
      		modalIsOpen : false
      	})

      	this.props.setBackRegisteredSuccess();

      	if(newProps.isAuthenticated){
      		this.setState({
      		modalIsOpenLogin : false
      	})
      	}


      }
   }


   








	onChangeUsernameLogin(e){
    
    this.setState({
      usernameLogin : e.target.value
    })
  }
 
 	 onChangePasswordLogin(e){
    this.setState({
      passwordLogin : e.target.value
    })
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
	    this.setState({
	      fname : e.target.value
	    })
	  }
	 
	  onChangeLname(e){
	    this.setState({
	      lname : e.target.value
	    })
	  }
	 
	

	  handleSubmit(e) {
      	e.preventDefault()
   	  }

	
   render(){

   		const customStyles = {
	      content : {
	        top                   : '50%',
	        left                  : '50%',
	        right                 : '50%',
	        bottom                : 'auto',
	        marginRight           : '-50%',
	        transform             : 'translate(-50%, -50%)'
	      }
	    };
		return(
			<div className="totalBackGround">
				 <div >
		            <nav className="navbar navbar-inverse ">
		              <div className="container-fluid">
			                <div className="navbar-header">
			                  
			                	{
			                		this.props.isAuthenticated === true ? 
			                		 <a className="navbar-brand" onClick={()=> {
			                		 	this.props.logout();
			                		 }}>Logout</a>
			                  	
			                		:
			                		 <div>
			                		 <a className="navbar-brand" onClick={() => {
	                      				this.setState({modalIsOpenLogin: true});
	                      				}} >Sign in</a>
			                  	   	 <a className="navbar-brand" onClick={() => {
			                  	   	 	this.setState({
			                  	   	 		modalIsOpen : true
			                  	   	 	})
			                  	   	 }}>Register</a>
			                  	   	 </div>
			                	}
			                 
			                </div>
			                <ul className="nav navbar-nav">
			                  <li className="active"><a href="/">Home</a></li>
			                  <li><Link to="/home-garden">Products</Link></li>
			                  <li><a href="#">Gift Cards</a></li>
			                  <li><a href="#">Help & Contact</a></li>
			                </ul>

			               <ul className="nav navbar-nav navbar-right">
			                <li>      <Link to="/addProduct">Sell</Link>     </li>
			                <li><Link to="/myProduct">My eBay</Link></li>
			              </ul>
		              </div>
		            </nav>
		        </div>
		         <div>
		        	<InnerComponent {...this.props}></InnerComponent>
		        </div>

	            <BootStrapModal show={this.state.modalIsOpen}>

	            	<BootStrapModal.Footer>



                        <div  id="registrationdiv topPadd">
					        <div>
					        
					          <div className="row padd">
					            <div className='form-group'>
					            <div className='col-lg-3 col-md-3 col-sm-3'></div>
					             
					              <div className='input-group col-lg-6 col-md-6 col-sm-6'>
					                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
					                <input type="text" name='username'    id='username'   className="form-control" onChange={this.onChangeUsername.bind(this)} placeholder="Username..." aria-describedby="basic-addon1" required />
					              </div>
					              <div className='col-lg-3 col-md-3 col-sm-3'> </div>
					            </div>
					          </div>
					          
					          <div className="row padd">
					            <div className='form-group'>
					              <div className='col-lg-3 col-md-3 col-sm-3'></div>
					              
					              <div className='input-group col-lg-6 col-md-6 col-sm-6'>
					                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
					                <input type="password"   name='password' id='pwd' onChange={this.onChangePassword.bind(this)}  className="form-control"  placeholder="Password ..." aria-describedby="basic-addon1" required />
					              </div>
					              <div className='col-lg-3 col-md-3 col-sm-3'></div>
					            </div>
					          </div>
					          
					          
					          
					          
					          <div className="row padd">
					          <div className='form-group'>
					            <div className='col-lg-3 col-md-3 col-sm-3'></div>
					            
					            <div className='input-group col-lg-6 col-md-6 col-sm-6'>
					              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
					              <input type="text" name='fname'  id='fname' onChange={this.onChangeFname.bind(this)}  className="form-control"  placeholder="First Name..." aria-describedby="basic-addon1"  required />
					            </div>
					            <div className='col-lg-3 col-md-3 col-sm-3'></div>
					          </div>
					          </div>
					          
					          <div className="row padd">
					          <div className='form-group'>
					          <div className='col-lg-3 col-md-3 col-sm-3'></div>
					            
					            <div className='input-group col-lg-6 col-md-6 col-sm-6'>
					              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
					              <input type="text" name='lname' id='lname'  onChange={this.onChangeLname.bind(this)} className="form-control"  placeholder="Last Name..." aria-describedby="basic-addon1"  required />
					            </div>
					            <div className='col-lg-3 col-md-3 col-sm-3'></div>
					          </div>
					          </div>
					          
					          
					          
					          
					          
					          <div className="row topPadd">
					          <div className='form-group'>
					           
					            <div className='col-lg-6 col-md-6 col-sm-6'>
					            </div>
					            <div className='col-lg-2 col-md-2 col-sm-2'>
					              <button className='btn btn-info sharpButton' onClick={() => {
					                      
					                      var username_regex = /^[a-z0-9]{3,20}$/i ; 
					                      var name_regex = /^[a-z]{3,20}$/i ;
					                      var lname_regex = /^[a-z]{3,20}$/i ;
					                      var password_regex = /^[a-z0-9]{5,20}$/i ; 

					                      console.log(this.state.username,
					                                this.state.password,
					                                this.state.fname,
					                                this.state.lname,
					                                this.state.dob,
					                                this.state.gender)


					                      if(!username_regex.test(this.state.username)){
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
					                      
					                      
					                      this.props.register(this.state.username,
					                                this.state.password,
					                                this.state.fname,
					                                this.state.lname)


					                    }}>Submit</button>
					            </div>
					            <div className='col-lg-2 col-md-2 col-sm-2'>
					            	<button onClick={() => {
                      				this.setState({modalIsOpen: false});
                      				}} className="btn btn-danger sharpButton">Close</button>
					            </div>
					          </div>
					          </div>
					      </div>
					      


					      <div className="row padd">
					        <div className='form-group'>
					        <div className='col-lg-3 col-md-3 col-sm-3'></div>
					          
					          <div className='col-lg-7 col-md-7 col-sm-7' id="usernameExistDiv">
					            <span className="text-red"> <b>{this.props.registration_error}</b>  </span>
					          </div>
					          <div className='col-lg-2 col-md-2 col-sm-2'></div>
					        </div>
					      </div>

					      </div>
                      
                      </BootStrapModal.Footer>  
						
                </BootStrapModal>


                <BootStrapModal show={this.state.modalIsOpenLogin}>
                		

					             <BootStrapModal.Footer>

					                      <div className="topPadd">

					                        <div className='col-sm-12 col-lg-12 col-md-12 form-group'>
						                          <div className="col-md-2 col-lg-2 col-sm-2"></div>
						                           <div className="input-group col-md-8 col-lg-8 col-sm-8">
								                           <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
								                           <input type="text" onChange={this.onChangeUsername.bind(this)} name='username' id='username'   className="form-control"  placeholder="Username..." aria-describedby="basic-addon1" required />
								                  </div>
						                           <div className="col-md-2 col-lg-2 col-sm-2"></div>
						                         
					                        </div>
					                        
					                        <div className='col-sm-12 col-lg-12 col-md-12 form-group'>
						                          
					                        	

								                  <div className="col-md-2 col-lg-2 col-sm-2"></div>
						                           <div className="input-group col-md-8 col-lg-8 col-sm-8">
								                           <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
								                           <input type="password"  onChange={this.onChangePassword.bind(this)} name='password' id='pwd'   className="form-control"  placeholder="Password..." aria-describedby="basic-addon1"  required/>
								                  </div>
						                           <div className="col-md-2 col-lg-2 col-sm-2"></div>

						                            
						                          
					                        </div>
					                        
					                        <div className='col-sm-12 col-lg-12 col-md-12 form-group'>
					                          <div className='col-lg-4 col-sm-12 col-md-4 '></div>
					                          <div className='col-sm-12 col-lg-2 col-md-2 text-right'>
					                            <button className='btn btn-info sharpButton' onClick={() => {
					                              this.props.login(this.state.username , this.state.password)
					                            }}> Login</button>
					                          </div>
					                            <div className='col-lg-2 col-md-2 col-sm-12 text-right'>
											            	<button onClick={() => {
						                      				this.setState({modalIsOpenLogin: false});
						                      				}} className="btn btn-default sharpButton">Close</button>
											    </div>
					                        </div>

					                     </div>
					             </BootStrapModal.Footer>
                      
                 </BootStrapModal>


	       
		</div>
			)
		}
	}

	function mapDispatchToProps(dispatch){
	  return {
	  	checkIfAlreadyLoggedIn : () => dispatch(checkIfAlreadyLoggedIn()),
	  	register : (username , password , fname , lname  ) => dispatch(register(username , password , fname , lname  )),
	  	setBackRegisteredSuccess : () => dispatch(setBackRegisteredSuccess()),
	  	login : (username , password ) => dispatch(login(username , password )),
	  	logout : () => dispatch(logout())
	  }
	}

	function mapStateToProps(state) {
	    return {
	    	isAuthenticated : state.AuthReducer.isAuthenticated,
	    	register_success : state.AuthReducer.register_success , 
	    	registration_error : state.AuthReducer.registration_error
	    };
	}

	return connect(mapStateToProps,mapDispatchToProps)(Authenticate) ; 


}



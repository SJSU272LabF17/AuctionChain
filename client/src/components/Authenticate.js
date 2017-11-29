import React, { Component } from 'react';
import { connect } from 'react-redux' ; 
import {register , setBackRegisteredSuccess , login , checkIfAlreadyLoggedIn , logout , setBackLoginSuccess } from '../actions/register_action'
import Modal from 'react-modal'
import { Modal as BootStrapModal } from 'react-bootstrap';
import { Link } from 'react-router-dom' ;
import Loader from 'react-loader'
import  NotificationSystem from 'react-notification-system'

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
      		  loginError : '' ,
      		  errorLoginServer : '' ,

      		  isLoaded: false ,

	        loaderOptions : {
	            color: '#D5E0E8'
	        }
		}
		 this._addNotification = this._addNotification.bind(this) ; 
	}

	 _addNotification( type, message ) {
      switch(type) {
            case  'Success' : {
               this._notificationSystem.addNotification({
                            message: message,
                            level: 'info',
                            position : 'tr' ,
                            autoDismiss : 4
              });
               break
             }
              case  'Error' : {
               this._notificationSystem.addNotification({
                            message: message,
                            level: 'error',
                            position : 'tr',
                            autoDismiss : 4
              });
               break
             }
             case  'Info' : {
               this._notificationSystem.addNotification({
                            message: message,
                            level: 'success',
                            position : 'tr',
                            autoDismiss : 4
              });
               break
             }
        }
    }

	

	 componentWillReceiveProps(newProps) {    
     
	 	if(newProps.register_success == true ){
	 		this.setState({
	 			modalIsOpen : false , 
	 			isLoaded : false
	 		})

	 		this.props.setBackRegisteredSuccess();
	 		this._addNotification("Success" , "Successfully Registered !!! Please login")
	 	}

	 	if(newProps.register_success == false ){
	 		this.setState({
	 			isLoaded : false , 

	 		})
	 		this.props.setBackRegisteredSuccess();
		}

	 	if(this.props.isAuthenticated === true ){
	 		
	 		this.setState({
	 			modalIsOpenLogin : false ,
	 			errorLoginServer : '',
	 			isLoaded : false 
	 		})

	 	}

	 	

	 	if(this.props.isAuthenticated === false){
	 		this.setState({ errorLoginServer : 'Username or password is incorrect' , isLoaded : false })
	 		
	 	}

	 	


   }

   componentDidUpdate(){
   		if(this.props.isAuthenticated === false){
      		this.setState({ errorLoginServer : 'Username or password is incorrect'})
      		this.props.setBackLoginSuccess() ; 
     	 }

     	 if(this.props.isAuthenticated === true &&  this.state.modalIsOpenLogin === true ){
     	 	console.log("Hiii 1")
	      	this.setState({
	      		modalIsOpenLogin : false ,
	      		errorLoginServer : '',
	      		isLoaded : false 
	      	})
	      	this._addNotification("Success" , "Welcome " + this.props.user.email  ) ;
	      }


	 	if(this.props.isAuthenticated == null && this.props.logoutVar == true ){
	 		this._addNotification("Info" , "Successfully logged out");
	 		this.props.setBackLoggedOut() ; 

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


   	  login(){
   	  	this.props.setBackLoginSuccess() ; 
   	  	this.setState({ errorLoginServer : '' , isLoaded : true })
   	  	this.props.login(this.state.username , this.state.password)
	  }

   	  

   	  register(){
   	  	this.props.setBackRegisteredSuccess();
		var username_regex = /^[a-z0-9]{3,20}$/i ; 
   	  		var name_regex = /^[a-z]{3,20}$/i ;
   	  		var lname_regex = /^[a-z]{3,20}$/i ;
   	  		var password_regex = /^[a-z0-9]{5,20}$/i ; 

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

   	  		this.setState({error : '' , isLoaded : true })

   	  		this.props.register(this.state.username,
   	  			this.state.password,
   	  			this.state.fname,
   	  			this.state.lname)
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

			 <div className="loader-div">
              <Loader loaded={!this.state.isLoaded}  options={this.state.loaderOptions} >
                <div className="loaded-contents"></div>
              </Loader>
            </div>

             <NotificationSystem ref={n => this._notificationSystem = n} />

			{
				this.props.isAuthenticated === true ? 
				<span> </span>

				:
				<div>
				<a className="navbar-brand" onClick={() => {
					this.setState({modalIsOpenLogin: true});
				}} >Sign in</a>
				<a className="navbar-brand" onClick={() => {
					this.setState({modalIsOpen : true})
				}}> Register</a>
				</div>
			}

			</div>
			<ul className="nav navbar-nav">
				<li className="active"><a href="/">Home</a></li>
				<li><Link to="/home-garden">Products</Link></li>
				<li><a href="#">Help & Contact</a></li>
			</ul>

			<ul className="nav navbar-nav navbar-right">

				{
					this.props.isAuthenticated === true ?
					<li><Link to="/addProduct">Add Product</Link></li>
					: <span></span>
				}

				<li><Link to="/myProduct">My Products</Link></li>
				<li><a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" id="dropdownMenu1"><i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i></a>
					<ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
						
						

						{
							this.props.isAuthenticated === true ?
							<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">{this.props.user.email}</a></li>
							: <span></span>

						}
						<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Bids</a></li>
						<li role="presentation"><Link to="/myProduct">Purchase History</Link></li>

						<li role="presentation"><Link to="/addProduct">Sell</Link></li>

						{
							this.props.isAuthenticated === true ?
							<li role="presentation"><a onClick={() => {this.props.logout()}}>Logout</a></li>
							: <span></span>
						}

						
					</ul>
				</li>
			</ul>

			</div>
			</nav>
			</div>
		         <div>
		        	<InnerComponent {...this.props}></InnerComponent>
		        </div>

	            <BootStrapModal show={this.state.modalIsOpen}>

	            	<BootStrapModal.Footer>

	            		<div className="registration-main-div col-md-12 col-lg-12 col-sm-12 col-xs-12">
					             					<div className="registerTextModal col-md-4 col-lg-4 col-sm-4 col-xs-4">

					             							<span className="RegisterHeading"><h3 className="273Heading">CMPE 272</h3></span>

					             					</div>

					             					 <div className="registrationDiv col-md-8 col-lg-8 col-sm-8 col-xs-8">

					             					 		<div className="row padd">
														            <div className='form-group'>
														            
														             
														              <div className='input-group '>
														                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
														                <input type="text" name='username'    id='username'   className="form-control" onChange={this.onChangeUsername.bind(this)} placeholder="Username..." aria-describedby="basic-addon1" required />
														              </div>
														              
														            </div>
														          </div>
														          
														          <div className="row padd">
														            <div className='form-group'>
														            
														              
														              <div className='input-group '>
														                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
														                <input type="password"   name='password' id='pwd' onChange={this.onChangePassword.bind(this)}  className="form-control"  placeholder="Password ..." aria-describedby="basic-addon1" required />
														              </div>
														             
														            </div>
														          </div>
														          
														          
														          
														          
														          <div className="row padd">
														          <div className='form-group'>
														           
														            
														            <div className='input-group'>
														              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
														              <input type="text" name='fname'  id='fname' onChange={this.onChangeFname.bind(this)}  className="form-control"  placeholder="First Name..." aria-describedby="basic-addon1"  required />
														            </div>
														            
														          </div>
														          </div>
														          
														          <div className="row padd">
														          <div className='form-group'>
														        
														            
														            <div className='input-group '>
														              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
														              <input type="text" name='lname' id='lname'  onChange={this.onChangeLname.bind(this)} className="form-control"  placeholder="Last Name..." aria-describedby="basic-addon1"  required />
														            </div>
														           
														          </div>
														          </div>
														          
														          
														          
														          
														          
														          <div className="row topRightPadd">
														          <div className='form-group'>
														           
														            <div className='col-lg-5 col-md-5 col-sm-5'>
														            </div>
														            <div className='col-lg-4 col-md-4 col-sm-4'>
														              
														              <button onClick={() => {
														            		this.props.setBackRegisteredSuccess(); 
									                      					this.setState({modalIsOpen: false , isLoaded : false});
									                      				}} className="btn btn-danger register-cancel sharpButton">Close</button>
														            </div>
														            <div className='col-lg-3 col-md-3 col-sm-3'>
														            	<button className='btn btn-info sharpButton' onClick={this.register.bind(this)}>Submit</button>
														            </div>
														          </div>
														          </div>
														      </div>
														      


														      <div className="row padd">
														        <div className='form-group'>
														        <div className='col-lg-5 col-md-5 col-sm-5'></div>
														          
														          <div className='col-lg-7 col-md-7 col-sm-7' id="usernameExistDiv">
														            <span className="text-red"> <b>{this.props.registration_error}{this.state.error}</b>  </span>
														          </div>
														          
														        </div>
									                        

									                  </div>
					             			</div>


                      
                      </BootStrapModal.Footer>  
						
                </BootStrapModal>


                <BootStrapModal show={this.state.modalIsOpenLogin}>
                		

					             <BootStrapModal.Footer>

					             			

					             			<div className="login-div col-md-12 col-lg-12 col-sm-12 col-xs-12">
					             					<div className="loginTextModal col-md-4 col-lg-4 col-sm-4 col-xs-4">

					             							<span className="loginHeading">CMPE 272</span>

					             					</div>

					             					 <div className="loginModal">

									                        <div className='form-group'>
										                          
										                           <div className="input-group">
												                           <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
												                           <input type="text" onChange={this.onChangeUsername.bind(this)} name='username' id='username'   className="form-control"  placeholder="Username..." aria-describedby="basic-addon1" required />
												                  </div>
										                          
										                         
									                        </div>
									                        
									                        <div className='form-group'>
										                          
										                           <div className="input-group">
												                           <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
												                           <input type="password"  onChange={this.onChangePassword.bind(this)} name='password' id='pwd'   className="form-control"  placeholder="Password..." aria-describedby="basic-addon1"  required/>
												                  </div>
										                          
															</div>

									                        
									                         <div className='form-group'>
										                          <div className="input-group ">
												                          <p className="text-red">{this.state.errorLoginServer}</p>
												                  </div>
										                           <div className=""></div>
															</div>


									                        <div className='row '>
									                        
										                          
										                          <div className='col-lg-9 col-sm-9 col-md-9 col-xs-9'>
										                            	<button onClick={() => {
											                      				this.setState({modalIsOpenLogin: false , errorLoginServer : ''});
											                      				}} className="btn btn-default login-close sharpButton">Close</button>
										                          </div>
										                           
										                            <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 '>
																            	
										                            		<button className='btn btn-info sharpButton login' onClick={this.login.bind(this)}> Login</button>
																            	
																    </div>
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
	  	logout : () => dispatch(logout()) , 
	  	setBackLoginSuccess : () => dispatch(setBackLoginSuccess()),
	  	setBackLoggedOut : () => dispatch({type : 'USER_LOGGED_OUT_SET_BACK'})
	  }
	}

	function mapStateToProps(state) {
	    return {
	    	isAuthenticated : state.AuthReducer.isAuthenticated,
	    	register_success : state.AuthReducer.register_success , 
	    	registration_error : state.AuthReducer.registration_error,
	    	user : state.AuthReducer.user , 
	    	logoutVar : state.AuthReducer.logout
	    };
	}

	return connect(mapStateToProps,mapDispatchToProps)(Authenticate) ; 


}



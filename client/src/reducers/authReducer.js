const initialState = {
	
	isAuthenticated : null ,
	error : null ,
	
	user : null ,
	register_success : null ,
	registration_error : null,
	nodeServerURL: "http://0c2e7d60.ngrok.io/" , 
	logout : null 
}


export default function reducer (state=initialState , action )  {
	switch(action.type){
		case 'CASE_LOGIN' : {
			return  {...state , isAuthenticated : action.payload.loggedIn,
								user : action.payload.user} ; 
		}
		case 'SET_BACK_LOGIN' : {
			return  {...state , isAuthenticated : action.payload.loggedIn,
								user : null } ; 
		}
		case 'REGISTERED' : {
			return  {...state , register_success : action.payload.registered,
								registration_error : action.payload.registeredError,
								} ; 
		}
		case 'REGISTERED_FAIL' : {
			return  {...state , register_success : action.payload.registered,
								registration_error : action.payload.registeredError} ; 
		}
		case 'SET_BACK_REGISTER' : {
			return  {...state , register_success : null,
								registration_error : null} ; 
		}
		case 'USER_ALREADY_LOGGED_IN_SUCCESS' : {
			return  {...state , isAuthenticated : action.payload.loggedIn,
								user : action.payload.user} ; 
		}
		case 'USER_LOGGED_OUT' : {
			return  {...state , isAuthenticated : null,
								user : action.payload.user,
								logout : true } ; 
		}
		case 'USER_LOGGED_OUT_SET_BACK' : {
			return  {...state , logout : null } ; 
		}



		default :
			return state ; 

	}


}


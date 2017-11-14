const initialState = {
	
	isAuthenticated : null ,
	error : null ,
	
	user : null ,
	register_success : null ,
	registration_error : null
}


export default function reducer (state=initialState , action )  {
	switch(action.type){
		case 'CASE_LOGIN' : {
			return  {...state , isAuthenticated : action.payload.loggedIn,
								user : action.payload.user} ; 
		}
		case 'REGISTERED' : {
			return  {...state , register_success : action.payload.registered,
								registration_error : action.payload.registeredError,
								isAuthenticated : action.payload.isAuthenticated ,
							    user : action.payload.user} ; 
		}
		case 'REGISTERED_FAIL' : {
			return  {...state , register_success : action.payload.registered,
								registration_error : action.payload.registeredError} ; 
		}
		case 'SET_BACK_REGISTER' : {
			return  {...state , register_success : null,
								registration_error : null} ; 
		}



		default :
			return state ; 

	}


}


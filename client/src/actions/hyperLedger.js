var url = "http://0c2e7d60.ngrok.io/" ; 

const headers = {
    'Accept': 'application/json'
};




export function getLedger(callback){
		
		fetch(url + 'getLedger', {
	        method: 'GET',
	        credentials:'include',

			body :    JSON.stringify()
			}).then(function (response) {
			   console.log("Checking response " , response)
				response.json().then(res => {
					callback(res.data)
				})
	   		})
	        .catch(error => {
	        	
	        	callback([])
	        })
		
}
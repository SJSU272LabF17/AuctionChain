import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import Registration from './components/registration';
import Login from './components/login';
import registerServiceWorker from './registerServiceWorker';
import {checkIfAlreadyLoggedIn} from './actions/register_action'


import { BrowserRouter ,   Switch, Route  } from 'react-router-dom'
import Authenticate from './components/Authenticate';
import store from './store'
import {Provider } from 'react-redux'
import RegistrationSuccess from './components/RegistrationSuccess'
import LoginSuccess from './components/LoginSuccess'
import HomeGarden from './components/Home-Garden'
import HomeGardenContent from './components/Home-Garden-Content'
import addProduct from './components/AddProduct'
import myProduct from './components/MyProduct'
import liveAuction from './components/LiveAuction'
import AuctionProduct from './components/PutProductOnAuction'

const Main = () => (
  
    <Switch>
          <Route exact path="/" component={Authenticate(Home)}/>
          <Route exact path="/home-garden" component={Authenticate(HomeGarden(HomeGardenContent))}/>
          <Route exact path="/addProduct" component={Authenticate(HomeGarden(addProduct))}/>
          <Route exact path="/myProduct" component={Authenticate(HomeGarden(myProduct))}/>
          <Route exact path="/liveAuction" component={Authenticate(HomeGarden(liveAuction))}/>
          <Route exact path="/setUpAuction/:productId" component={Authenticate(HomeGarden(AuctionProduct))}/>
          <Route exact path="/home-garden/product/:category" component={Authenticate(HomeGarden(HomeGardenContent))}/>
    </Switch>
  
)


store.dispatch(checkIfAlreadyLoggedIn()) ; 




ReactDOM.render( 
		
		<Provider store={store}>
				<BrowserRouter >
		        	<Main />
		        </BrowserRouter>
		</Provider>
        , document.getElementById('root')
        );

registerServiceWorker();

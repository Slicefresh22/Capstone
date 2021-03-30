import './App.css';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import {Security, SecureRoute , LoginCallback } from '@okta/okta-react';
import {OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'; 
import { oktaAuthConfig, oktaSignInConfig } from './components/auth/config';
import { useHistory } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';
import Home from './components/Home'

const oktaAuth = new OktaAuth(oktaAuthConfig);

function App() {
  const history = useHistory();

  const customAuthHandler = (oktaAuth) => {
    history.push('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    try{
      history.replace(toRelativeUrl(originalUri, 'restoreOriginalUri '));
    }
    catch(err){
      console.log(err);
    }
  };

  return (
   <Router>
      <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Navbar></Navbar>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/dashboard' component={Dashboard} />
        <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
        <Route path='/login/callback' component={LoginCallback} />
      </Switch>
    </Security>
   </Router>
  );
}

export default App;

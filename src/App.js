import './App.css';
import {Route, Switch} from "react-router-dom";
import {Security, SecureRoute , LoginCallback } from '@okta/okta-react';
import {OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'; 
import { oktaAuthConfig, oktaSignInConfig } from './components/auth/config';
import { useHistory } from 'react-router-dom';
import Dashboard from './components//dashboard/Dashboard';
import Login from './components/auth/Login';
import Home from './components/home/Home'
import Navabar from './components/navbar/Navbar';

const oktaAuth = new OktaAuth(oktaAuthConfig);

function App() {
  let history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
      <Security
        oktaAuth={oktaAuth}
        onAuthRequired={customAuthHandler}
        restoreOriginalUri={restoreOriginalUri}
        >
       <Navabar></Navabar>
      <Switch>
        <SecureRoute path='/dashboard' component={Dashboard} />
        <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
        <Route path='/login/callback' component={LoginCallback} />
        <Route path='/' exact={true} component={Home} />
      </Switch>
    </Security>
  );
}

export default App;

import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';


function Navabar () {
    const history = useHistory();
    const { oktaAuth, authState } = useOktaAuth();

    if (authState.isPending) return null;

    const login = async () => history.push('/login');
    
    const logout = async () => {
        oktaAuth.signOut();
        if(!authState.isAuthenticated) <Redirect to= {{pathname: '/login'}}></Redirect>
    }
    const button = authState.isAuthenticated ? 
        <Link className="nav-link" to={"#"} onClick={logout}>Logout</Link>:
        <Link className="nav-link" to={"#"} onClick={login}>Login</Link>
    return (
        <div className="container-fluid mb-4">
            <nav className="navbar navbar-expand-sm navbar-default">
                <div className="navbar-brand">
                    <h3 className="ml-4">Capstone</h3>
                </div>
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="nav-item ml-auto">
                        {button}
                    </li>
                </ul>
            </nav>
        </div>
    );
        
}

export default Navabar ;


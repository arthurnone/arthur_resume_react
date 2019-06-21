import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from '../components/home';


function AppRouter() {
    return (
        <Router>
            <div>
                <Route path="/" exact component={Home}/>
                <Route path="/cn" exact component={Home}/>
                <Route path="/en" exact component={Home}/>
                <Route path="/nld" exact component={Home}/>
            </div>
        </Router>
    );
}

export default AppRouter;
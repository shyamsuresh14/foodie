import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

export default class Main extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        {
                            sessionStorage.getItem("username") ? 
                            <Redirect to="/dashboard/orders" /> : <Redirect to="/login" />
                        }
                    </Route>
                    <Route path="/login">
                        {
                            sessionStorage.getItem("username") ? 
                            <Redirect to="/" /> : <Login /> 
                        }
                    </Route>
                    <Route path="/dashboard">
                        {
                            sessionStorage.getItem("username") ? 
                            <Home /> : <Login /> 
                        }
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
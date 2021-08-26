import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from './auth/authContext'
import PrivateRoute from './auth/privateRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import ResetPass from './pages/ResetPass'
import Dashboard from './pages/Dashboard'

function Routes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route exact path={"/login"} component={Login} />
                    <Route exact path={"/register"} component={Register} />
                    <Route exact path={"/reset-pass"} component={ResetPass} />

                    <PrivateRoute path={"/dashboard"} component={Dashboard} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Routes;

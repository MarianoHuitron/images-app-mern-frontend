import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { Loading } from '../components/loading/Loading';
import { HomePage } from '../pages/home/HomePage';
import { LoginPage } from '../pages/login/LoginPage';
import { RegisterPage } from '../pages/register/RegisterPage';
import { UploadPage } from '../pages/upload/UploadPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {


    const dispatch = useDispatch();

    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);

    if(checking) {
        return (<Loading />);
    }

    

    return (
        <Router>
            <div>
                <Switch>
                    
                    <PublicRoute
                        exct
                        path="/login"
                        component={ LoginPage }
                        isAuth={ !!uid }
                    />
                    <PublicRoute
                        exct
                        path="/register"
                        component={ RegisterPage }
                        isAuth={ !!uid }
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        component={ HomePage }
                        isAuth={ !!uid }
                    />
                    <PrivateRoute
                        exact
                        path="/upload"
                        component={ UploadPage }
                        isAuth={ !!uid }
                    />

                    <Redirect to="/" />

                </Switch>
            </div>
        </Router>
    )
}

import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';

export const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  
    return (
        <>
            <Navbar />
             <Route 
                {...rest} 
                component={ (props) => (
                    (isAuth)
                    ? <Component { ...props } />
                    : <Redirect to="/login" />
                )}   
            />
        </>

       
    );
    
}

import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startLogin } from '../../actions/auth';
import { uiSetLoading } from '../../actions/ui';
import { Button } from '../../components/ui/Button';


export const LoginPage = () => {

    const { errorForm, loading } = useSelector(state => state.ui)
    const dispatch = useDispatch();

    const { register, handleSubmit, errors} = useForm();

    const handleLogin = (data) => {
        if(!loading) {
            console.log('loading...');
            dispatch( uiSetLoading() );
            dispatch( startLogin(data) )

        }
    }


    return (
        <div className="w-full h-screen flex bg-gray-400 " >
            
            <div className="container mx-auto p-2 my-24">
                <div className="max-w-sm mx-auto bg-white px-5 py-10 rounded shadow-xl animate__animated animate__fadeInDown">
                    <div className="text-center mb-8">
                        <h1 className="font-bold text-2xl" >Welcome to <span className="text-green-500"> Login App </span> </h1>
                        {
                            (errorForm.ok) && <p className="text-red-400" > { errorForm.msg } </p>
                        }
                    </div>
                    <form onSubmit={ handleSubmit( handleLogin ) } >
                      
                        <div className="mt-5">
                            <label>Email</label>
                            <input 
                                type="email" 
                                className="block w-full p-2 border rounded border-gray-500 outline-none" 
                                placeholder="example@emal.com"
                                autoComplete="off"
                                name="email"
                                ref={ register({
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'invalid email address'
                                    }
                                })}
                            />
                            <p className="text-red-500" >
                                { errors.email && 'invalid email address' } 
                            </p>
                        </div>
                        <div className="mt-5">
                            <label>Password</label>
                            <input 
                                type="password"
                                placeholder="********" 
                                className="block w-full p-2 border rounded border-gray-500 outline-none" 
                                name="password"
                                ref={register({
                                    required: true,
                                    minLength: 6
                                })}
                            />
                             <p className="text-red-500" >
                                { errors.password && 'Password must be at least 6 characters' } 
                            </p>
                        </div>
                        <div className="mt-10 text-center">
                           <Button text="Login" />
                           {
                               loading && <i className="fas fa-spinner fa-spin mt-2"></i>
                           }
                        </div>
                        <div className="mt-5">
                            <p className="text-gray-600">
                                Don't have an account? 
                                <Link to="/register" className="text-green-400" > Sign up here </Link>
                           </p>
                        </div>
                    </form>
                </div>
            </div>  
        </div>
    )
}


import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../../actions/auth';
import { startFilterImages } from '../../actions/images';

export const Navbar = () => {

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const val = e.target.value;
        dispatch( startFilterImages(val) );
    }

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <nav className="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-16 items-center" style={{zIndex: '100'}}>
            <div className="w-full max-w-screen-xl relative mx-auto px-6">
                <div className="flex items-center -mx-6">
                    <div className="lg:w-1/4 xl:w-1/5 pl-6 pr-6 lg:pr-8" >
                        <div className="flex items-center">
                            <Link to="/" className="block lg:mr-4 font-bold" >Images App</Link>
                        </div>
                    </div>
                    <div className="flex flex-grow min-w-0 lg:2-3/4 xl:2-4/5">
                        <div className="w-full min-w-0 lg:px-6 xl:w-3/4 xl:px-12">
                            <div className="relative">
                                <input 
                                    type="text"
                                    className="transition-colors duration-100 ease-in-out text-gray-600 py-2 pr-4 pl-10 block w-full appearence-none leading-normal border boder-transparent rounded-log focus:outline-none text-left select-none truncate focus:bg-white focus:border-gray-300 bg-gray-200"    
                                    placeholder="Search"
                                    onChange={ handleInputChange } 
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
                                    <i  className="fas fa-search text-gray-600" ></i>
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex lg:items-center lg:justify-between xl:w-1/4 px-6">
                            <div className="relative mr-4">
                                <button onClick={handleLogout} className="block lg:mr-4 text-red-600" >Logout</button>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        </nav>
    )
}

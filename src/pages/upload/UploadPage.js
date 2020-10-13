import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm } from '../../../node_modules/react-hook-form/dist/index';
import { startImageUpload } from '../../actions/images';
import { uiSetLoading } from '../../actions/ui';
import { Button } from '../../components/ui/Button'

export const UploadPage = () => {
    
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);
    const { redirect } = useSelector(state => state.images);

    const [imgPath, setImgPath] = useState(null);
    const { register, handleSubmit, errors } = useForm();

    const handleSaveImage = (data) => {
         

        if(!loading && !!imgPath) {
            dispatch( uiSetLoading() );
            dispatch( startImageUpload(data) )
        }
    }

  

    const handlePictureClick = () => {
        document.getElementById('imgage_field').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImgPath(window.URL.createObjectURL(file));
        }
    }

    
    if(redirect) {
        return (
            <Redirect to={redirect} />
        )
    }


    return (
        <div className='w-full py-24 mx-auto px-1 md:px-12'>
            <div className="flex flex-col md:flex-row ">
                <div className="px-4 py-2 m-2 flex-1">

                    {
                        !!!imgPath &&
                        <div className="w-full h-full bg-gray-200 text-gray-600 flex flex-col justify-center items-center">
                            <i 
                                className="fas fa-upload fa-3x cursor-pointer"
                                onClick={ handlePictureClick }
                                ></i>
                                <p className="pt-2">
                                    Upload an image
                                </p>
                        </div>
                    }
                    {
                        !!imgPath &&
                        <div className="relative" >
                             <img 
                                src={ imgPath } 
                                alt=""
                                className="rounded shadow" />
                               <button
                                    className="bg-red-600 text-white h-8 w-8 absolute rounded-full cursor-pointer focus:outline-none"
                                    style={{top: '-2%', right: '-2%'}}
                                    onClick={() => !loading && setImgPath(null)}
                                > 
                                    <i className="fas fa-times"></i>
                                </button>
                        </div>
                       
                    }
                   
                </div>
                <div className="m-2 flex-1 ">
                    <form  onSubmit={ handleSubmit( handleSaveImage ) }  >
                        <div className="w-full px-3 py-2">
                            <input 
                                type="file" 
                                className="hidden" 
                                id="imgage_field"
                                accept="image/*"
                                onChange={ handleFileChange }
                                name="img"
                                ref={register({required: true})} />
                                <p className="text-red-500" >
                                    { errors.img && 'The image is required' } 
                                </p>
                        </div>
                       
                        <div className="w-full px-3 py-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Title
                            </label>
                            <input 
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                type="text" 
                                autoComplete="off"
                                placeholder="Title"
                                name="title"
                                ref={register({required: true})} 
                            />
                            <p className="text-red-500" >
                                { errors.title && 'Title is required' } 
                            </p>
                        </div>
                        <div className="w-full px-3 py-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Description
                            </label>
                            <textarea 
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                 name="description"
                                 ref={ register() }
                            ></textarea>
                          
                        </div>
                        <div className="w-full px-3 py-2 text-center">
                            <Button text="Upload Image" />
                            {
                               loading && <i className="fas fa-spinner fa-spin mt-2"></i>
                            }
                        </div>  
                    </form>
                </div>
            </div>
        </div>
    )
}

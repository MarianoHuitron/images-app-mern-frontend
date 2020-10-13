import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.sass';
import { Link } from 'react-router-dom';
import { startDeleteImage, startGetImages } from '../../actions/images';

export const HomePage = () => {

    const dispatch = useDispatch();
    const { images_filtered: images } = useSelector(state => state.images)
    const [isSelected, setIsSelected] = useState(null)

    useEffect( () => {
        dispatch( startGetImages() );
    }, [dispatch])

    const handleSelecteImage = (id) => {
        if(isSelected && isSelected === id) {
            setIsSelected(null)
        } else {
            setIsSelected(id)
        }
    }

    const handleDeleteImage = () => {
        dispatch( startDeleteImage( isSelected ) );
    } 

    return (
        <div className="w-full flex py-24 mx-auto px-2 md:px-12">
            
            <div className="masonry-gallery mx-auto ">
                {
                    images.map((img) => (
                        <div 
                            key={img.asset_id} 
                            className="masonry-gallery-item relative"
                            onClick={ () => handleSelecteImage(img._id) }
                        > 
                            <img 
                                src={img.img_path} 
                                alt={img.title} 
                                className={ `rounded  ${(isSelected === img._id) && 'is-selected'}` } /> 

                            {
                                (isSelected && img._id === isSelected) 
                                    &&
                                <button
                                    className="bg-red-600 text-white h-8 w-8 absolute rounded-full cursor-pointer focus:outline-none"
                                    style={{top: '2%', right: '2%'}}
                                    onClick={ handleDeleteImage }
                                > 
                                    <i className="fas fa-trash"></i>
                                </button>                            
                            }
                                
                        </div>
                    ))
                }
            </div>
            <Link to="/upload" className="bg-red-500  fixed bottom-0 delete-btn"> 
                <i className="fas fa-plus"></i>
            </Link>
        </div>
    )
}

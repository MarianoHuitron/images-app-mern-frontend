import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

export const Image = ( {image} ) => {
    return (
        <LazyLoadImage
            // alt={ image }
            src={ image }
            effect="blur"
        />
    )
}

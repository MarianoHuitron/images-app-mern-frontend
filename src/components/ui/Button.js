import React from 'react'
import PropTypes from 'prop-types';

export const Button = ({ text, ...props }) => {
    return (
        <button
            className="py-3 bg-green-500 text-white w-full hover:bg-green-600 cursor-pointer rounded outline-none" 
            {...props}
        >

            { text }
            
        </button>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired
}

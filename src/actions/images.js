import { tokenFetch, tokenFetchMultipart } from "../services/fetch"
import { uiStopLoading } from "./ui";
import { types } from "../types/types";



export const startImageUpload = ({img, title, description = ''}) => {
    return async (dispatch, getState) => {
        dispatch( startUploadingLoading() );
        
        const formData = new FormData();
        formData.append('img', img[0]);
        formData.append('title', title);
        formData.append('description', description);

        const resp = await tokenFetchMultipart('img/new', formData, 'POST');
        const body = await resp.json();

        if(body.ok) {
            dispatch( imageUploaded(body.image) );
            
        } else {
            alert(body.msg);
        }
        dispatch( uiStopLoading() )
    }
}

export const startGetImages = () => { 

    return async (dispatch) => {

        const resp = await tokenFetch('img/');
        const body = await resp.json();
        
        if(body.ok) {
            dispatch( getImages(body.images) );  
        } else {
            console.log(body.msg)
        }

    }

}

export const startDeleteImage = (image) => {
    return async (dispatch) => {

        const resp = await tokenFetch(`img/${image}`, {}, 'DELETE');
        const body = await resp.json();

        if(body.ok) {
            dispatch( imageDeleted( image ) );
        } else {
            alert( body.msg )
        }

    }
}

const startUploadingLoading = () => ({
    type: types.imageStartLoading
});

export const startFilterImages = (value) => ({
    type: types.imageFilter,
    payload: value
});


const imageUploaded = (image) => ({
    type: types.imageUploaded,
    payload: image
});

const getImages = (images) => ({
    type: types.imageGet,
    payload: images
});

const imageDeleted = (image) => ({
    type: types.imageDeleted,
    payload: image
});

export const imagesLogout = () => ({type: types.imagesLogout});
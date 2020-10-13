import { types } from "../types/types";

const initState = {
    images: [],
    images_filtered: [],
    uploading: false,
    redirect: null
}


export const imageReducer = (state = initState, action) => {

    switch (action.type) {
        case types.imageStartLoading:
            return {
                ...state,
                uploading: true
            }

        case types.imageUploaded:
            return {
                ...state,
                images: [...state.images, action.payload],
                images_filtered: [...state.images, action.payload],
                uploading: false,
                redirect: '/'
            }

        case types.imageDeleted:
            return {
                ...state,
                images: state.images.filter(
                    i => (i._id !== action.payload)
                ),
                images_filtered: state.images_filtered.filter(
                    i => (i._id !== action.payload)
                )
            }
    
        case types.imageGet:
            return {
                ...state,
                images: [...action.payload],
                images_filtered: [...action.payload],
                redirect: null
            }
        
        case types.imageFilter:
            const value = action.payload;
            const filtered = state.images.filter((val) => val.title.toLowerCase().includes(value));
            return {
                ...state,
                images_filtered: filtered
            }

        case types.imagesLogout:
            return initState;

        default:
            return state;
    }

}
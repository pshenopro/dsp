import {ADVERT_POST, CURRENTPAGE, PRELOADER, REMOVE_MODAL} from "./type";

const initial = {
    posts: {
        adverts: []
    },
    preloader: false,
    currentPage: 1,
    removeItem: {
        id: '',
        name: '',
        bool: false,
    }
}

export const postRedux = (state = initial, action) => {
    switch (action.type) {
        case ADVERT_POST:
            return { ...state, posts: { adverts: state.posts.adverts.concat([action.payload])}};

        case PRELOADER:
            return {
                ...state,
                preloader: action.payload
            }

        case CURRENTPAGE:
            return {
                ...state,
                currentPage: action.payload
            }

        case REMOVE_MODAL:
            return {
                ...state,
                removeItem: {
                    ...action.payload,
                },
            }

        default: return state
    }
}
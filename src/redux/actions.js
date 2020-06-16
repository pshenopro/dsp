import {ADVERT_POST, CURRENTPAGE, PRELOADER, REMOVE_MODAL, SORT_BY} from "./type";

export function advertsFetch (post) {
    return {
        type: ADVERT_POST,
        payload: post,
    }
}

export function preloader(bool) {
    return {
        type: PRELOADER,
        payload: bool,
    }
}

export function setCurrentPage(num) {
    return {
        type: CURRENTPAGE,
        payload: num,
    }
}

export function sortingBy(val) {
    return {
        type: SORT_BY,
        payload: val
    }
}

export function removeModal(id, name, bool) {
    document.getElementsByTagName('body')[0].style.overflow = bool ? 'hidden' : 'visible';

    return {
        type: REMOVE_MODAL,
        payload: {
            id: id,
            name: name,
            bool: bool
        },
    }
}
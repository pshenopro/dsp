import React from "react";
import PropTypes from 'prop-types';

const Modal = ({src, close, txt}) => {


    return (
        <div className={'modal-wrapper'}>
            <div id="modal1" className="modal open">
                <i onClick={() => close()} className="material-icons small right close">close</i>
                <div className="wrapper-fields">
                    <ul>{txt.length > 1 ? txt.map((el, index) => <li key={index}>{el}</li>) : null}</ul>
               </div>
                {txt.length > 1 ? <a href={src} className='waves-effect waves-light btn-small'>СКАЧАТЬ</a> : ''}
            </div>
        </div>
    )
}

Modal.prototype = {
    src: PropTypes.string,
    close: PropTypes.func,
    txt: PropTypes.array,
}

export default Modal;
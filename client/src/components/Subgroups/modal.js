import React from "react";
import PropTypes from 'prop-types';

const Modal = ({src, close}) => {


    return (
        <div className={'modal-wrapper'}>
            <div id="modal1" className="modal open">
                <i onClick={() => close()} className="material-icons small right close">close</i>
                <div className="wrapper-fields">
                   <iframe src={src} width='100%' height='400' frameBorder='0' id="frame">
                   </iframe>
               </div>
            </div>
        </div>
    )
}

Modal.prototype = {
    src: PropTypes.string,
    close: PropTypes.func,
}

export default Modal;
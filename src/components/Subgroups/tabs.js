import React, {useRef, useState} from "react";
import Modal from './modal';
import axios from 'axios';
import Item from './tab.item'
import PropTypes from 'prop-types';

const Tabs = ({path, file}) => {
    const [modal, setModal] = useState(false);
    const [target, setTarget] = useState({
        positive: {...file.positiveTargeting},
        negative: {...file.negativeTargeting},
    });
    const [txt, setTxt] = useState([]);
    const [src, setSrc] = useState('');
    const [tab, setTab] = useState(true)

    const handlerModal = async (val) => {
        setTxt([]);
        const post = await fetch('http://92.42.15.118:80/api' + path + '/' + val, {
            method: 'GET',
            body: null,
            headers: {
                'content-type': 'text/plain; charset=utf-8',
            }
        }).then(function (res) {
            return res.text().then(function (text) {
                return text.split(/\n/ig)
            })
        })
        setSrc('http://92.42.15.118:80/api' + path + '/' + val);
        setTxt(post);
        setModal(!modal)
    }

    const close = () => {
        setModal(!modal)
    }

    const changePos = (event, http, flag) => {
        event.persist();

        const _formdata = new FormData();
        _formdata.append(http, event.target.files[0]);

        axios.post( 'http://92.42.15.118:80/api' + path + '/' + http.toLowerCase() + '?' + flag, _formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    return (
        <div className="tabs">
            {/*<input id={'pos'} type="radio" name={''} className={tab ? 'active' : ''} hidden onClick={setTab(true)}/>*/}
            {/*<input id={'neg'} type="radio" name={''} className={!tab ? 'active' : ''} hidden onClick={setTab(false)}/>*/}

            <div className="control">
                <label htmlFor="pos" onClick={() => setTab(true)} className={`${tab ? 'active' : ''} waves-effect waves-light btn-middle btn teal lighten-1`}>Positive targetings</label>
                <label htmlFor="neg" onClick={() => setTab(false)} className={`${!tab ? 'active' : ''} waves-effect waves-light btn-middle btn teal lighten-1`}>Negative targetings</label>
            </div>

            <form className={'output'}>
                {tab ? <Item target={target.positive} changePos={changePos} handlerModal={handlerModal} keyItem={'positive'}/> : null}
                {!tab ? <Item target={target.negative} changePos={changePos} handlerModal={handlerModal} keyItem={'negative'}/> : null}

            </form>

            {modal ? <Modal src={src} txt={txt} close={close}/> : null}
        </div>
    )


};

Tabs.propsType = {
    path: PropTypes.string,
    file: PropTypes.Object,
    post: PropTypes.func,
};

export default Tabs;

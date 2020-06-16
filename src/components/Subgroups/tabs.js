import React, {useRef, useState} from "react";
import Modal from './modal';
import axios from 'axios';
import PropTypes from 'prop-types';

const Tabs = ({path, file}) => {
    const [modal, setModal] = useState(false);
    const [target, setTarget] = useState([
        {name:'positive', ...file.positiveTargeting},
        {name:"negative", ...file.negativeTargeting},
    ]);
    const [txt, setTxt] = useState([]);
    const [src, setSrc] = useState('')

    const handelrModal = async (val) => {
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
        console.log(event.target.files[0]);

        const _formdata = new FormData();
        _formdata.append(http, event.target.files[0]);

        axios.post( 'http://92.42.15.118:80/api' + path + '/' + http.toLowerCase() + '?' + flag, _formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }


    if (file.positiveTargeting || file.negativeTargeting) {
        return (
            <div className="tabs">
                <input id={'pos'} type="radio" name={'tab'} hidden readOnly/>
                <input id={'neg'} type="radio" name={'tab'} hidden readOnly/>

                <div className="control">
                    {file.positiveTargeting ? <label htmlFor="pos" className='btn waves-effect waves-light btn-middle btn teal lighten-1'>Positive targetings</label> : null}
                    {file.negativeTargeting ? <label htmlFor="neg" className='btn waves-effect waves-light btn-middle btn teal lighten-1'>Negative targetings</label> : null}
                </div>

                <form className={'output'}>
                    {target.map((el, index, arr) =>
                        Object.keys(el).length > 1 ? <div className={`item ${el.name}-label`} key={index}>
                            <div className="item-inner">
                                <div className="line">
                                    <h6>apps:</h6>
                                    <span>{el.apps.length} приложений</span>
                                    <label
                                        htmlFor={el.name + 'new'}
                                        className={'waves-effect waves-light btn-small'}>
                                        <input id={el.name + 'new'}
                                               type="file"
                                               onChange={(event) => changePos(event, el.name + `Apps`, '')}
                                               hidden />
                                        добавить
                                    </label>
                                    <label
                                        htmlFor={el.name + 'add'}
                                        className={'waves-effect waves-light btn-small'}>
                                        <input id={el.name + 'add'}
                                               type="file"
                                               onChange={(event) => changePos(event, el.name + `Apps`, true)}
                                               hidden />
                                        Перезаписать
                                    </label>
                                    <a className={'waves-effect waves-light btn-small'}
                                        onClick={() => handelrModal(el.name + `apps`)}>
                                        просмотр
                                    </a>
                                </div>
                                <div className="line">
                                    <h6>domains:</h6>
                                    <span>{el.domains.length} доменов</span>
                                    <label
                                        htmlFor={el.name + 'newD'}
                                        className={'waves-effect waves-light btn-small'}>
                                        <input
                                            id={el.name + 'newD'}
                                            type="file"
                                            onChange={(event) => changePos(event, el.name + `Domains`, '')}
                                            hidden />
                                        добавить
                                    </label>
                                    <label
                                        htmlFor={el.name + 'addD'}
                                        className={'waves-effect waves-light btn-small'}>
                                        <input id={el.name + 'addD'}
                                               type="file"
                                               onChange={(event) => changePos(event, el.name + `Domains`, true)}
                                               hidden />
                                        Перезаписать
                                    </label>
                                    <a className={'waves-effect waves-light btn-small'}
                                        onClick={() => handelrModal(el.name + `domains`)}>
                                        просмотр
                                    </a>
                                </div>
                                <div className="line">
                                    <div className="geo">
                                        <h6>geo:</h6>
                                        <div className={'geo-inner'}>{JSON.stringify(el.geo)}</div>
                                    </div>
                                    <div className="os-type">
                                        <h6>os:</h6>
                                        <ul>
                                            {el.os ? el.os.map((elem, index) => <li key={index}>{elem}</li>) : <li>Пусто</li>}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> : null
                    )}
                </form>

                {modal ? <Modal src={src} txt={txt} close={close}/> : null}
            </div>
        )
    }

    return <div></div>
};

Tabs.propsType = {
    path: PropTypes.string,
    file: PropTypes.Object,
    post: PropTypes.func,
};

export default Tabs;

import React, {useRef, useState} from "react";
import Modal from './modal';
import axios from 'axios';
import PropTypes from 'prop-types';

const Tabs = ({path, file, post, txt}) => {
    const [modal, setModal] = useState(false);
    const [pos, setPos] = useState(
        {
            dom: {name: '', ref: useRef()},
            app: {name: 'name_txt.txt', ref: useRef()}
        }
    );
    const handelrModal = () => {
        setModal(!modal)
    }

    const changePos = (event, ref) => {
        event.persist();
        console.log(ref);
        setPos(
            prev => ({
                ...prev,
                ...{
                    [event.target.name]: {
                        name: ref.current.files[0].name,
                        ref: ref,
                    }
                }
            })
        )
    }


    const submit = async (event) => {
        event.preventDefault();

        const _formdata = new FormData();
        _formdata.append('positiveDomains', pos.dom.ref.current.files[0]);

        axios.post( path + '/positivedomains', _formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    };

    return (
        <div className="tabs">
            <input id={'pos'} type="radio" name={'tab'} hidden readOnly/>
            <input id={'neg'} type="radio" name={'tab'} hidden readOnly/>

            <div className="control">
                <label htmlFor="pos" className='btn waves-effect waves-light btn-middle btn teal lighten-1'>Positive targetings</label>
                <label htmlFor="neg" className='btn waves-effect waves-light btn-middle btn teal lighten-1'>Negative targetings</label>
            </div>

            <form className={'output'}>
                <div className='item positive-label'>
                    <h4>Positive</h4>
                    <div className={'table-wrapper'}>
                        <div className="item-inner">
                            <h5>Domain</h5>
                            <div className='buttons-wrapper'>
                                <span>{file.pDomain.file ? <span onClick={() => handelrModal()}>{file.pDomain.file}</span> : 'Пусто'}</span>
                                <div className="buttons">
                                    {/*<input*/}
                                    {/*    id="file-1"*/}
                                    {/*    type="file"*/}
                                    {/*    ref={pos.dom.ref}*/}
                                    {/*    accept=".txt"*/}
                                    {/*    name="dom"*/}
                                    {/*    onChange={(event) => changePos(event, pos.dom.ref)}*/}
                                    {/*    hidden/>*/}
                                    {/*<label htmlFor="file-1" className='btn waves-effect waves-light btn-small btn teal lighten-1'>add</label>*/}
                                    {/*<button type="submit" className='btn waves-effect waves-light btn-small btn teal lighten-1'>upload</button>*/}
                                    {file.pDomain.file ? <a
                                        href={'/' + file.pDomain.file}
                                        className='btn waves-effect waves-light btn-small btn teal lighten-1'
                                        download >download</a> : <button onClick={() => post('pDomain', '/positivedomains')} type={'button'} className={'btn waves-effect waves-light btn-small btn teal lighten-1'}>
                                        <i className="material-icons small">vertical_align_bottom</i>
                                    </button>}
                                </div>
                            </div>
                        </div>
                        <div className="item-inner">
                            <h5>Apps</h5>
                            <div className='buttons-wrapper'>
                                <span>{file.PApps.file ? <span onClick={() => handelrModal()}>{file.PApps.file}</span> : 'Пусто'}</span>
                                <div className="buttons">
                                    {/*<input*/}
                                    {/*    id="file-1"*/}
                                    {/*    type="file"*/}
                                    {/*    ref={pos.dom.ref}*/}
                                    {/*    accept=".txt"*/}
                                    {/*    name="dom"*/}
                                    {/*    onChange={(event) => changePos(event, pos.dom.ref)}*/}
                                    {/*    hidden/>*/}
                                    {/*<label htmlFor="file-1" className='btn waves-effect waves-light btn-small btn teal lighten-1'>add</label>*/}
                                    {/*<button type="submit" className='btn waves-effect waves-light btn-small btn teal lighten-1'>upload</button>*/}
                                    {file.PApps.file ? <a
                                        href={'/' + file.PApps.file}
                                        className='btn waves-effect waves-light btn-small btn teal lighten-1'
                                        download >download</a> : <button onClick={() => post('PApps', '/positiveapps')} type={'button'} className={'btn waves-effect waves-light btn-small btn teal lighten-1'}>
                                        <i className="material-icons small">vertical_align_bottom</i>
                                    </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='item negative-label'>
                    <h4>Negative</h4>
                    <div className={'table-wrapper'}>
                        <div className="item-inner">
                            <h5>Domain</h5>
                            <div className='buttons-wrapper'>
                                <span>{file.nDomain.file ? <span onClick={() => handelrModal()}>{file.nDomain.file}</span> : 'Пусто'}</span>
                                <div className="buttons">
                                    {/*<input*/}
                                    {/*    id="file-1"*/}
                                    {/*    type="file"*/}
                                    {/*    ref={pos.dom.ref}*/}
                                    {/*    accept=".txt"*/}
                                    {/*    name="dom"*/}
                                    {/*    onChange={(event) => changePos(event, pos.dom.ref)}*/}
                                    {/*    hidden/>*/}
                                    {/*<label htmlFor="file-1" className='btn waves-effect waves-light btn-small btn teal lighten-1'>add</label>*/}
                                    {/*<button type="submit" className='btn waves-effect waves-light btn-small btn teal lighten-1'>upload</button>*/}
                                    {file.nDomain.file ? <a
                                        href={'/' + file.nDomain.file}
                                        className='btn waves-effect waves-light btn-small btn teal lighten-1'
                                        download >download</a> : <button onClick={() => post('nDomain', '/negativedomains')} type={'button'} className={'btn waves-effect waves-light btn-small btn teal lighten-1'}>
                                        <i className="material-icons small">vertical_align_bottom</i>
                                    </button>}
                                </div>
                            </div>
                        </div>
                        <div className="item-inner">
                            <h5>Apps</h5>
                            <div className='buttons-wrapper'>
                                <span>{file.nApps.file ? <span onClick={() => handelrModal()}>{file.nApps.file}</span> : 'Пусто'}</span>
                                <div className="buttons">
                                    {/*<input*/}
                                    {/*    id="file-1"*/}
                                    {/*    type="file"*/}
                                    {/*    ref={pos.dom.ref}*/}
                                    {/*    accept=".txt"*/}
                                    {/*    name="dom"*/}
                                    {/*    onChange={(event) => changePos(event, pos.dom.ref)}*/}
                                    {/*    hidden/>*/}
                                    {/*<label htmlFor="file-1" className='btn waves-effect waves-light btn-small btn teal lighten-1'>add</label>*/}
                                    {/*<button type="submit" className='btn waves-effect waves-light btn-small btn teal lighten-1'>upload</button>*/}
                                    {file.nApps.file ? <a
                                        href={'/' + file.nApps.file}
                                        className='btn waves-effect waves-light btn-small btn teal lighten-1'
                                        download >download</a> : <button onClick={() => post('nApps', '/negativeapps')} type={'button'} className={'btn waves-effect waves-light btn-small btn teal lighten-1'}>
                                        <i className="material-icons small">vertical_align_bottom</i>
                                    </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {modal ? <Modal src={'/' + txt} close={handelrModal} /> : null}
        </div>
    )
};

Tabs.propsType = {
    path: PropTypes.string,
    file: PropTypes.Object,
    post: PropTypes.func,
    txt: PropTypes.string,
};

export default Tabs;

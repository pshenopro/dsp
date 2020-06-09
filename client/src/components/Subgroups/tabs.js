import React, {useRef, useState} from "react";
import Modal from './modal';
import axios from 'axios';
import PropTypes from 'prop-types';

const Tabs = ({path, file}) => {
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
        // JSON.stringify(body)


        // const post = await fetch( path + '/positivedomains', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'multipart/form-data', 'Content-Disposition': 'form-data; name="domain_list.txt'},
        //     data: _formdata,
        // }).then((res) => {
        //     console.log(res)
        // });


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

            <form onSubmit={submit} className={'output'}>
                <div className='item positive-label'>
                    <h4>Positive</h4>
                    <div className={'table-wrapper'}>
                        <div className="item-inner">
                            <h5>Domain</h5>
                            <div className='buttons-wrapper'>
                                <span>{file ? <span onClick={() => handelrModal()}>{file}</span> : 'Пусто'}</span>
                                <div className="buttons">
                                    <input
                                        id="file-1"
                                        type="file"
                                        ref={pos.dom.ref}
                                        accept=".txt"
                                        name="dom"
                                        onChange={(event) => changePos(event, pos.dom.ref)}
                                        hidden/>
                                    <label htmlFor="file-1" className='btn waves-effect waves-light btn-small btn teal lighten-1'>add</label>
                                    <button type="submit" className='btn waves-effect waves-light btn-small btn teal lighten-1'>upload</button>
                                    <a href={'/' + file} download className='btn waves-effect waves-light btn-small btn teal lighten-1'>download</a>
                                </div>
                            </div>
                        </div>
                        <div className="item-inner">
                            <h5>Apps</h5>
                            <div className='buttons-wrapper'>
                                <span>{pos.app.name}</span>
                                <div className="buttons">
                                    <input
                                        id="file-2"
                                        type="file"
                                        ref={pos.app.ref}
                                        accept=".txt"
                                        name="app"
                                        onChange={(event) => changePos(event, pos.app.ref)}
                                        hidden/>
                                    <label htmlFor="file-2" className='btn waves-effect waves-light btn-small btn teal lighten-1'>add</label>
                                    <button type="submit" className='btn waves-effect waves-light btn-small btn teal lighten-1'>upload</button>
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
                                <span>name_txt</span>
                                <div className="buttons">
                                    <input id="file-3" type="file" hidden/>
                                    <label htmlFor="file-3" className='btn waves-effect waves-light btn-small btn teal lighten-1'>add</label>
                                    <button type="submit" className='btn waves-effect waves-light btn-small btn teal lighten-1'>upload</button>
                                </div>
                            </div>
                        </div>
                        <div className="item-inner">
                            <h5>Apps</h5>
                            <div className='buttons-wrapper'>
                                <span>name_txt</span>
                                <div className="buttons">
                                    <input id="file-4" type="file" hidden/>
                                    <label htmlFor="file-4" className='btn waves-effect waves-light btn-small btn teal lighten-1'>add</label>
                                    <button type="submit" className='btn waves-effect waves-light btn-small btn teal lighten-1'>upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {modal ? <Modal src={'/' + file} close={handelrModal} /> : null}
        </div>
    )
};

Tabs.propsType = {
    path: PropTypes.string,
    file: PropTypes.string,
};

export default Tabs;

import React, {useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {useMessage} from "../../hooks/msg.hook";
import {useHttp} from "../../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {AppContext} from "../../context/AppContext";


const EditModal = ({changeEdit, editBody}) => {
    const {status} = useContext(AppContext);
    const history= useHistory();

    const [state, setState] = useState({
        ...editBody
    });
    const [sts, setStatus] = useState([...status]);



    const message = useMessage();
    const {load, err, req, clear} = useHttp();



    const changeInp = (event, name) => {
        event.persist();

        setState(
            prev => ({
                ...prev,
                ...{
                    [event.target.name]: event.target.value
                }
            })
        )
    };


    const submit = async (event) => {
        event.preventDefault();

        let data = {
            ...editBody,
            name: state.name,
            budget: parseInt(state.budget),
        };

        sts.map((el, index) => el.val ? data.status = index + 1 : '');

        console.log(data)

        try {
            const post = await req(history.location.pathname + `/campaigns/${editBody.id}`, 'POST', {opt: {mtd: "PUT"}, body: data});
            message('SUCCESS');
        } catch (e) {
            message('HTTP error')
        }

        changeEdit()
    };

    const handleChange = (event) => {
        setStatus(
            sts.map((el, index) => {
                if (index === parseInt(event.target.value)) {
                    el.val = true;
                }

                return el
            })
        )
    };


    useEffect(() => {


    }, []);


    return (
        <div className={'modal-wrapper'}>
            <form id="modal1" onSubmit={submit} className="modal open">
                <div className="modal-content wrapper-fields">
                    <div className="field">
                        <p>name*</p>
                        <input
                            type="text"
                            name={'name'}
                            value={state.name}
                            onChange={changeInp}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field">
                        <p>budget</p>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            name={'budget'}
                            value={state.budget}
                            onChange={changeInp}
                            autoComplete={'off'}/>
                    </div>
                </div>
                <div className="modal-content wrapper-fields">
                    <div className="field">
                        <p>status</p>
                        <div className={'wrapper-status'}>
                            {status.map((el, index, arr) =>
                                <p key={index}>
                                    <label form={'status-' + index}>
                                        <input
                                            id={'status-' + index}
                                            className="with-gap"
                                            name="group1"
                                            type="radio"
                                            onChange={handleChange}
                                            value={index}
                                            checked={el.val ? true : index === state.status}/>
                                        <span>{el.name}</span>
                                    </label>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="modal-footer btn-wrapper">
                        <button type={"button"} onClick={() => changeEdit()} className="waves-effect waves-light red btn-small btn">CANCEL</button>
                        <button type={"submit"} className="waves-effect waves-light btn-small btn" disabled={!state.name.length}>Agree</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

EditModal.propTypes = {
    changeEdit: PropTypes.func,
    editBody: PropTypes.object,
};


export default EditModal;
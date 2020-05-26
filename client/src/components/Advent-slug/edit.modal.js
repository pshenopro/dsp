import React, {useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {AppContext} from "../../context/AppContext";


const EditModal = ({changeEdit, editBody, submitEdit}) => {
    const {status} = useContext(AppContext);
    let counter = 1;

    const [state, setState] = useState({
        ...editBody
    });
    const [sts, setStatus] = useState([...status]);

    const changeInp = (event, name) => {
        event.persist();

        if (event.target.name === 'budget' && event.target.value === '') {
            setState(
                prev => ({
                    ...prev,
                    ...{
                        [event.target.name]: 0
                    }
                })
            )

            return
        }

        setState(
            prev => ({
                ...prev,
                ...{
                    [event.target.name]: event.target.name === 'budget' ? parseInt(event.target.value) : event.target.value
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

        submitEdit(data)
    };

    const handleChange = (event) => {
        setStatus(
            sts.map((el, index) => {
                if (index === parseInt(event.target.value)) {
                    el.val = true;
                    return el;
                }

                el.val = false;
                return el
            })
        )
    };

    useEffect(() => {
        if (counter === 1) {
            setStatus(
                sts.map((el, index) => {
                    if ((index + 1) === editBody.status) {
                        el.val = true;
                        return el;
                    }
                    el.val = false;
                    return el;
                })
            );
            counter--;
        }
    }, [])

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
                            {sts.map((el, index, arr) =>
                                <p key={index}>
                                    <label form={'status-' + index}>
                                        <input
                                            id={'status-' + index}
                                            className="with-gap"
                                            name="group1"
                                            type="radio"
                                            onChange={handleChange}
                                            value={index}
                                            checked={el.val}/>
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
    submitEdit: PropTypes.func
};


export default EditModal;
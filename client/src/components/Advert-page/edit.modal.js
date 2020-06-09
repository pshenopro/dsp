import React, {useState} from "react";
import PropTypes from 'prop-types';

const EditModal = ({changeEdit, editBody, submitEdit}) => {
    const [state, setState] = useState({
        ...editBody
    });

    let changeInp = (event, name) => {
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

    const edit = async (event) => {
        event.preventDefault();

        let data = {
            ...editBody,
            name: state.name,
        };

        if (state.balance !== '') {
            data.balance = parseInt(state.balance)
        }

        submitEdit(data)
    };

    return (
        <div className={'modal-wrapper'}>
            <form id="modal1" onSubmit={edit} className="modal open">
                <div className="modal-content wrapper-fields">
                    <div className="field">
                        <p>name</p>
                        <input
                            type="text"
                            name={'name'}
                            value={state.name}
                            onChange={changeInp}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field">
                        <p>balance</p>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            name={'balance'}
                            value={state.balance}
                            onChange={changeInp}
                            autoComplete={'off'}/>
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
};

EditModal.propTypes = {
    changeEdit: PropTypes.func,
    editBody: PropTypes.object,
    submitEdit: PropTypes.func,
};


export default EditModal;
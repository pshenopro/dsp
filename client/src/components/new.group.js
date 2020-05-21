import React, {useState} from "react";
import PropTypes from 'prop-types'


const Group = ({closeNew, submit}) => {

    let [state, setState] = useState({
        name: '',
        budget: 0,
    });

    let changeInp = (event, name) => {
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

    const mysubmit = (event) => {
        event.preventDefault();

        submit(state)
    };

    return (
        <div className={'modal-wrapper'}>
            <form id="modal1" className="modal open" onSubmit={mysubmit}>
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
                <div className="modal-footer btn-wrapper">
                    <button type={"button"} onClick={() => closeNew(false)} className="waves-effect waves-light red btn-small btn">CANCEL</button>
                    <button type={"submit"} className="waves-effect waves-light btn-small btn" disabled={!state.name.length}>Submit</button>
                </div>
            </form>
        </div>
    )
}

Group.propTypes = {
    closeNew: PropTypes.func,
    submit: PropTypes.func
}

export default Group;
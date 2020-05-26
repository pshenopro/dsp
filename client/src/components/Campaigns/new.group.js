import React, {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import PropTypes from 'prop-types'


const Group = ({closeNew, submit}) => {
    const {typeTv, typePlaceTv} = useContext(AppContext);

    const [state, setState] = useState({
        name: '',
        budget: 0,
        url: '',
        frequency: '',
        bidprice: 0,
    });
    const [statusTv, setStatusTv] = useState([...typeTv]);
    const [placeTv, setPlaceTv] = useState([...typePlaceTv]);

    const changeInp = (event, name) => {
        event.persist();

        if (event.target.name === name && event.target.value === '') {
            setState(
                prev => ({
                    ...prev,
                    ...{
                        [event.target.name]: 0
                    }
                })
            );
            return
        }

        setState(
            prev => ({
                ...prev,
                ...{
                    [event.target.name]: event.target.name === name ? parseInt(event.target.value) : event.target.value
                }
            })
        )
    };
    const handleStatus = (event) => {
        setStatusTv(
            statusTv.map((el, index) => {
                if (index === parseInt(event.target.value)) {
                    el.val = true;

                    return el
                }
                el.val = false;
                return el
            })
        )
    };
    const handlePlace = (event) => {
        setPlaceTv(
            placeTv.map((el, index) => {
                if (index === parseInt(event.target.value)) {
                    el.val = true;
                    return el
                }

                el.val = false;
                return el
            })
        )
    };

    const mysubmit = (event) => {
        event.preventDefault();

        let data = {
            ...state,
        };

        statusTv.map((el, index) => el.val ? data.type = index : '');
        if (statusTv[1].val) {placeTv.map((el, index) => el.val ? data.placement = index + 1 : '')}

        submit(data)
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
                            onChange={(e) => changeInp(e, 'budget')}
                            autoComplete={'off'}/>
                    </div>
                </div>
                <div className="modal-content wrapper-fields">
                    <div className="field-mix">
                        <p>Frequency cap</p>
                        <input
                            type="text"
                            name={'frequency'}
                            value={state.frequency}
                            onChange={changeInp}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field-mix">
                        <p>bid Price</p>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            name={'bidprice'}
                            value={state.bidprice}
                            onChange={(e) => changeInp(e, 'bidprice')}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field-mix">
                        <p>URL</p>
                        <input
                            type="text"
                            name={'url'}
                            value={state.url}
                            onChange={changeInp}
                            autoComplete={'off'}/>
                    </div>
                </div>
                <div className="modal-content wrapper-fields">
                    <div className="field-one">
                        <p>type*</p>
                        <div className={'wrapper-status'}>
                            {statusTv.map((el, index, arr) =>
                                <p key={index}>
                                    <label form={'status-' + index}>
                                        <input
                                            id={'status-' + index}
                                            className="with-gap"
                                            name="group1"
                                            type="radio"
                                            onChange={handleStatus}
                                            value={index}
                                            checked={el.val}/>
                                        <span>{el.name}</span>
                                    </label>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="modal-content wrapper-fields">
                    <div className="field-one">
                        <p>placement</p>
                        <div className={'wrapper-status'}>
                            {placeTv.length ? placeTv.map((el, index, arr) => {
                                return (
                                    <p key={index}>
                                        <label form={'place-' + index}>
                                            <input
                                                id={'place-' + index}
                                                className="with-gap"
                                                name="group2"
                                                type="radio"
                                                onChange={handlePlace}
                                                value={index}
                                                checked={el.val}
                                                disabled={statusTv[0].val}/>
                                            <span>{el.name}</span>
                                        </label>
                                    </p>
                                )
                                }
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="modal-footer btn-wrapper">
                    <button type={"button"} onClick={() => closeNew(false)} className="waves-effect waves-light red btn-small btn">CANCEL</button>
                    <button type={"submit"} className="waves-effect waves-light btn-small btn" disabled={!state.name.length || (!statusTv[0].val && !statusTv[1].val)}>Submit</button>
                </div>
            </form>
        </div>
    )
}

Group.propTypes = {
    closeNew: PropTypes.func,
    id: PropTypes.string,
    submit: PropTypes.func
};

export default Group;
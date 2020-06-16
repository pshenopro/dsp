import React, {useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {AppContext} from "../../context/AppContext";
import {useMix} from '../../hooks/mix.hook';
import DatePicker from 'react-date-picker';
import {useMessage} from "../../../src/hooks/msg.hook";



const EditModal = ({changeEdit, editBody, submitEdit}) => {
    const {status, typeTv, typePlaceTv} = useContext(AppContext);
    let counter = 1;

    const [sts, setStatus] = useState([...status]);
    const [statusTv, setStatusTv] = useState([...typeTv]);
    const [placeTv, setPlaceTv] = useState([...typePlaceTv]);
    const [startD, setStartD] = useState(new Date(editBody.startDate));
    const [endD, setEndD] = useState(new Date(editBody.endDate));

    const message = useMessage();
    const {changeInpIntg, changeInp, onlyNumber, sstate} = useMix({...editBody, ...editBody.frequencyCap});


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

    const dateConvert = (val) => {
        return val.getFullYear() + "-" + (`${(val.getMonth() + 1)}`.length > 1
            ? (val.getMonth() + 1)
            : ('0' + (val.getMonth() + 1))) + "-" + (`${(val.getDate() + 1)}`.length > 1
            ? val.getDate()
            : ('0' + (val.getDate())))
    }

    const submit = async (event) => {
        event.preventDefault();

        if (startD.getFullYear() < 2000 || endD.getFullYear() < 2000) {
            message('Поле DATE не валидно');
            return
        }

        let data = {
            ...sstate,
            frequencyCap: {
                cap: sstate.cap,
                period: sstate.period
            },
            startDate: dateConvert(startD),
            endDate: dateConvert(endD),
        };

        submitEdit(data)
    };

    useEffect(() => {
        if (counter === 1) {
            setStatus(
                sts.map((el, index) => {
                    if ((index) === editBody.status) {
                        el.val = true;
                        return el;
                    }
                    el.val = false;
                    return el;
                })
            );

            setStatusTv(
                statusTv.map((el, index) => {
                    if ((index ) === editBody.type) {
                        el.val = true;
                        return el;
                    }
                    el.val = false;
                    return el;
                })
            );

            setPlaceTv(
                placeTv.map((el, index) => {
                    if ((index) === editBody.placement) {
                        el.val = true;
                        return el;
                    }
                    el.val = false;
                    return el;
                })
            );

            counter--;
        }
    }, []);

    return (
        <div className={'modal-wrapper'}>
            <form id="modal1" onSubmit={submit} className="modal open" noValidate>
                <div className="modal-content wrapper-fields">
                    <div className="field">
                        <p>name*</p>
                        <input
                            type="text"
                            name={'name'}
                            value={sstate.name}
                            onChange={changeInp}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field-mix">
                        <p>Url</p>
                        <input
                            type="text"
                            name={'landingUrl'}
                            value={sstate.landingUrl}
                            onChange={changeInp}
                            autoComplete={'off'}/>
                    </div>
                </div>
                <div className="modal-content wrapper-fields">
                    <div className="field-number">
                        <p>Bid Price</p>
                        <input
                            type="text"
                            name={'bidPrice'}
                            value={sstate.bidPrice}
                            onKeyPress={onlyNumber}
                            onChange={changeInpIntg}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field-number">
                        <p>Budget Spent</p>
                        <input
                            type="text"
                            name={'budgetSpent'}
                            value={sstate.budgetSpent}
                            onKeyPress={onlyNumber}
                            onChange={changeInpIntg}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field-number">
                        <p>Start Position</p>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            name={'startPosition'}
                            value={sstate.startPosition}
                            onKeyPress={onlyNumber}
                            onChange={changeInpIntg}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field-number">
                        <p>budget</p>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            name={'budget'}
                            value={sstate.budget}
                            onKeyPress={onlyNumber}
                            onChange={changeInpIntg}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field-mix field-frequency">
                        <p>frequency Cap</p>
                        <div className="field-inner">
                            <div className="field-item">
                                <span>Cap</span>
                                <input
                                    type="text"
                                    name={'cap'}
                                    value={sstate.cap}
                                    onKeyPress={onlyNumber}
                                    onChange={changeInpIntg}
                                    autoComplete={'off'}/>
                            </div>
                            <div className="field-item">
                                <span>Period</span>
                                <input
                                    type="text"
                                    name={'period'}
                                    value={sstate.period}
                                    onKeyPress={onlyNumber}
                                    onChange={changeInpIntg}
                                    autoComplete={'off'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-content wrapper-fields">
                    <div className="field-mix">
                        <p>Date</p>
                        <div className="field-inner">
                            <div className="field-item">
                                <span>Start</span>
                                <DatePicker
                                    name={'myDate'}
                                    format={'dd-MM-y'}
                                    className="datePicker"
                                    onChange={setStartD}
                                    value={startD}
                                />
                            </div>
                            <div className="field-item">
                                <span>End</span>
                                <DatePicker
                                    name={'myDate'}
                                    format={'dd-MM-y'}
                                    className="datePicker"
                                    onChange={setEndD}
                                    value={endD}
                                />
                            </div>
                        </div>
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
                                            name="group"
                                            type="radio"
                                            onChange={handleChange}
                                            onClick={() => sstate.status = index}
                                            value={index}
                                            checked={el.val}/>
                                        <span>{el.name}</span>
                                    </label>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="field">
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
                                            onClick={() => sstate.type = index}
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
                                                    onClick={() => sstate.placement = index}
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
                <div className="modal-footer">
                    <div className="modal-footer btn-wrapper">
                        <button
                            type={"button"}
                            onClick={() => changeEdit()}
                            className="waves-effect waves-light red btn-small btn"
                            >CANCEL
                        </button>
                        <button
                            type={"submit"}
                            className="waves-effect waves-light btn-small btn"
                            disabled={!sstate.name.length}
                            >Agree
                        </button>
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
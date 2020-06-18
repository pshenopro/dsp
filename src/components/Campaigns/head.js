import React, {useContext, useEffect, useState} from "react";
import {useMix} from "../../hooks/mix.hook";
import {AppContext} from "../../context/AppContext";
import PropTypes from 'prop-types';
import {useMessage} from "../../hooks/msg.hook";
import Loader from '../creative.preloader'

const Head = ({state, submit}) => {
    const {status, typeTv, typePlaceTv} = useContext(AppContext);
    let counter = 1;

    const message = useMessage();
    const [sts, setStatus] = useState([...status]);
    const [statusTv, setStatusTv] = useState([...typeTv]);
    const [placeTv, setPlaceTv] = useState([...typePlaceTv]);
    const {changeInpIntg, changeInp, onlyNumber, sstate} = useMix({
        ...state,
        ...state.frequencyCap,
        creatives:['https://www.youtube.com/embed/9No-FiEInLA', 'https://www.youtube.com/embed/VkzVgiYUEIM']
    });
    let [creatives, setCreatives] = useState(0)
    const [currentSlide, setCurrent] = useState(0)

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

        sstate.status = parseInt(event.target.value);
    };

    const postSlide = async (val) => {
        const post = false;
        setCreatives(creatives++)
        console.log(creatives)
    }

    const saveAll = (event) => {
        event.preventDefault();

        let data = {
            ...sstate,
            frequencyCap: {
                cap: sstate.cap,
                period: sstate.period
            }
        }

        submit(data)
    }

    useEffect(() => {
        if (counter === 1) {
            setPlaceTv(
                placeTv.map((el, index) => {
                    if ((index) === state.placement) {
                        el.val = true;
                        return el;
                    }
                    el.val = false;
                    return el;
                })
            );

            setStatus(
                sts.map((el, index) => {
                    if ((index) === state.status) {
                        el.val = true;
                        return el;
                    }
                    el.val = false;
                    return el;
                })
            );

            setStatusTv(
                statusTv.map((el, index) => {
                    if ((index ) === state.type) {
                        el.val = true;
                        return el;
                    }
                    el.val = false;
                    return el;
                })
            );

            counter--
        }
    }, [])

    return (
        <>
            <h1>
                <input
                    type="text"
                    name={'name'}
                    value={sstate.name}
                    onChange={changeInp}
                    autoComplete={'off'}/>
            </h1>
            <form onSubmit={saveAll} className="head">
                <div className="info">
                    <div className="field field-first">
                        <h6>Тип подгруппы</h6>
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
                    <div className="field field-first">
                        <h6>Статус:</h6>
                        <select defaultValue={sstate.status} onChange={handleChange}>
                            {status.map((el, index) => <option key={index} value={index}>{el.name}</option>)}
                        </select>
                    </div>
                    <div className="field field-second">
                        <h6>Бюджет:</h6>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            name={'budget'}
                            value={sstate.budget}
                            onKeyPress={onlyNumber}
                            onChange={changeInpIntg}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field field-second">
                        <h6>Потрачено:</h6>
                        <p>{sstate.budgetSpent}</p>
                    </div>
                    <div className="field field-second">
                        <h6>Ограничение ставки:</h6>
                        <input
                            type="text"
                            name={'bidPrice'}
                            value={sstate.bidPrice}
                            onKeyPress={onlyNumber}
                            onChange={changeInpIntg}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field">
                        <h6>Ссылка на посадочную:</h6>
                        <input
                            type="text"
                            name={'landingUrl'}
                            value={sstate.landingUrl}
                            onChange={changeInp}
                            autoComplete={'off'}/>
                    </div>
                    <div className="field field-frequency">
                        <h6>Ограничения частоты
                            <input
                                type="text"
                                maxLength={3}
                                name={'cap'}
                                value={sstate.cap}
                                onKeyPress={onlyNumber}
                                onChange={changeInpIntg}
                                autoComplete={'off'}/>
                            в
                            <input
                                type="text"
                                name={'period'}
                                maxLength={5}
                                value={sstate.period}
                                onKeyPress={onlyNumber}
                                onChange={changeInpIntg}
                                autoComplete={'off'}/>
                        </h6>
                    </div>
                    {sstate.type ? <div className="field field-placement">
                        <div className="field">
                            <h6>placement</h6>
                        </div>
                        <div className="field field-placement-st">
                            <h6>status</h6>
                            <p>{placeTv.length ? placeTv.map((el, index, arr) => {
                                    return (
                                        <label form={'place-' + index} key={index}>
                                            <input
                                                id={'place-' + index}
                                                className="with-gap"
                                                name="group2"
                                                type="radio"
                                                onChange={handlePlace}
                                                value={index}
                                                onClick={() => sstate.placement = index}
                                                checked={el.val}/>
                                            <span>{el.name}</span>
                                        </label>
                                    )
                                }
                            ) : null}</p>
                        </div>
                        <div className="field">
                            <h6>position</h6>
                            <input
                                type="text"
                                pattern="[0-9]*"
                                name={'startPosition'}
                                value={sstate.startPosition}
                                onKeyPress={onlyNumber}
                                onChange={changeInpIntg}
                                autoComplete={'off'}/>
                        </div>
                    </div> : null}

                </div>
                <div className="creatives">
                    <h6> Attached creatives</h6>
                    <div className={'creatives-wrapper'}>
                        <div className="content-control">
                            <i className="material-icons left large">keyboard_arrow_left
                            </i>
                            <i className="material-icons right large">keyboard_arrow_right
                            </i>
                        </div>
                        <div className="content">
                            {sstate.creatives ? <iframe src={sstate.creatives[creatives]}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen></iframe> : <Loader/>}
                        </div>

                        <div className="btn-wrapper">
                            <button type={'button'} className={'waves-effect waves-light btn-small btn'}>
                                добавить
                            </button>
                            {/*<button type={'button'} className={'waves-effect waves-light btn-small btn'}>*/}
                            {/*    посмотреть*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>
                <button type={"submit"} className={'saveall waves-effect waves-light btn-small btn'}>SAVE ALL</button>
            </form>
        </>
    )
}

Head.propTypes = {
    state: PropTypes.object,
    submit: PropTypes.func,
}

export default Head;
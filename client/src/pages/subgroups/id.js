import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/msg.hook";
import {preloader, setCurrentPage} from "../../redux/actions";

const SubId = props => {
    const [names, setNames] = useState({
        nameAdv: '',
        nameCamp: '',
        nameSub: ''
    });
    const [state, setstate] = useState(null);

    const history = useHistory();
    const message = useMessage();
    const {err, req, clear} = useHttp(props.preloader);

    let sub = history.location.pathname,
        camp = sub.split('/subgroups/')[0],
        advert = camp.split('/campaigns/')[0];

    const pageName = async () => {
        try {
            const data = await req(history.location.pathname, 'POST', {opt:{mtd: "GET"}, body: null});
            setstate(data);

            const prev = await req(camp, 'POST', {opt:{mtd: "GET"}, body: null});
            const prevPre = await req(advert, 'POST', {opt:{mtd: "GET"}, body: null});

            setNames({
                nameAdv: prevPre.name,
                nameCamp: prev.name,
                nameSub: data.name
            });

            if (data.code === 500) {
                message(data.message);
                history.push('/advertisers')
            }
        } catch (e) {
            message('Server Error');
            history.push('/advertisers')
        }
    };


    useEffect(() => {
        if (!state) {
            pageName()
        }
        message(err);
        clear()
    }, [err, message, clear]);

    return (
        <div className={'page advertisers-page'}>
            <ul className={'sub-nav'}>
                <li><NavLink to='/advertisers'>Advertisers</NavLink></li>
                <i className="material-icons small">keyboard_arrow_right</i>
                <li><NavLink to={state ? advert : ''}>{names.nameAdv ? names.nameAdv : 'Загрузка'}</NavLink></li>
                <i className="material-icons small">keyboard_arrow_right</i>
                <li><NavLink to={state ? camp : ''}>{names.nameCamp ? names.nameCamp : 'Загрузка'}</NavLink></li>
                <i className="material-icons small">keyboard_arrow_right</i>
                <span>{names.nameSub ? names.nameSub : 'Загрузка'}</span>
            </ul>
            <div className="head">
                <h1>{names.nameSub ? names.nameSub : 'Загрузка'}</h1>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentPage: state.store.currentPage
    }
};

const mapDispatchToProps = {
    preloader,
    setCurrentPage
};

export default connect(mapStateToProps, mapDispatchToProps)(SubId)
import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/msg.hook";
import {preloader} from "../../redux/actions";
import Tabs from '../../components/Subgroups/tabs';
import HeadLine from "../../components/Campaigns/head";

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
            const data = await req('http://92.42.15.118:80/api' + history.location.pathname, 'GET');

            if (data) {
                setstate(data);
            }

            const prev = await req('http://92.42.15.118:80/api' + camp, 'GET');
            const prevPre = await req('http://92.42.15.118:80/api' + advert, 'GET');

            setNames({
                nameAdv: prevPre.name,
                nameCamp: prev.name,
                nameSub: data.name
            });
        } catch (e) {
            message('Server Error');
            history.push('/advertisers')
        }
    };

    const submitSave = async (data) => {
        try {
            const post = await req('http://92.42.15.118:80/api' + history.location.pathname, 'PUT', data);
            message('Success')
        } catch (e) {
            message('Server error');
        }

    }


    useEffect(() => {
        if (!state) {
            pageName();
        }
        message(err);
        clear();
    }, [err, message, clear]);


    return (
        <div className={'page advertisers-page'}>
            {/*HEADER */}
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
            {/*HEADER END*/}

            {/*CONTENT*/}
            <div className={'z-depth-3 table-wrapper'}>
                <div className="sub-group_wrapper">
                    {state ? <HeadLine state={state} submit={submitSave} /> : <span>Загрузка....</span>}
                </div>

                {state ? <Tabs path={history.location.pathname} file={state} /> : 'Загрузка' }
            </div>
            {/*CONTENT END*/}

        </div>
    )
}



const mapDispatchToProps = {
    preloader,
};

export default connect(null, mapDispatchToProps)(SubId)
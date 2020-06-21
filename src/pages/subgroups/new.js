import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/msg.hook";
import {preloader} from "../../redux/actions";
import Tabs from '../../components/Subgroups/tabs';
import HeadLine from "../../components/Campaigns/head";

const NewSub = props => {
    const [names, setNames] = useState({
        nameAdv: '',
        nameCamp: '',
        nameSub: ''
    });
    const [state, setstate] = useState({
        bidPrice: 0,
        budget: 0,
        budgetSpent: 0,
        campaignId: 1073,
        creatives: null,
        endDate: "2021-01-01T00:00:00",
        startDate: "2020-01-01T00:00:00",
        frequencyCap: {cap: 0, period: 0},
        landingUrl: "",
        name: "New NAME",
        negativeTargeting: null,
        placement: null,
        positiveTargeting: null,
        startPosition: 0,
        status: 0,
        type: 0,
    });
    const history = useHistory();
    const message = useMessage();
    const {err, req, clear} = useHttp(props.preloader);

    let sub = history.location.pathname,
        camp = sub.split('/new')[0],
        advert = camp.split('/campaigns/')[0];


    const pageName = async () => {
        try {
            const prev = await req(process.env.REACT_APP_API + 'api' + camp, 'GET');
            const prevPre = await req(process.env.REACT_APP_API + 'api' + advert, 'GET');

            setNames({
                nameAdv: prevPre.name,
                nameCamp: prev.name,
            });
        } catch (e) {
            message('Server Error');
            history.push('/advertisers')
        }
    };

    const newSubmit = async (state) => {
        try {
            const post = await req(process.env.REACT_APP_API + 'api' + history.location.pathname.split('/new')[0] + `/subgroups`, 'POST', state);
            message('Success')
            if (post) {
                props.history.push(history.location.pathname.split('new')[0] + `subgroups/` + post.id)
            }
        } catch (e) {
            message('Server error')
        }
    };

    useEffect(() => {
        if (!names.nameAdv) {
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
                <span> New sub group</span>
            </ul>

            {/*HEADER END*/}

            {/*CONTENT*/}
            <div className={'z-depth-3 table-wrapper'}>
                <div className="sub-group_wrapper">
                    {state ? <HeadLine state={state} submit={newSubmit} post={() => ''} /> : <span>Загрузка....</span>}
                </div>

                {state.id ? <Tabs path={history.location.pathname} file={state} /> : '' }
            </div>
            {/*CONTENT END*/}

        </div>
    )
}



const mapDispatchToProps = {
    preloader,
};

export default connect(null, mapDispatchToProps)(NewSub)
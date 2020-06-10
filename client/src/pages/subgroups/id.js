import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/msg.hook";
import {preloader} from "../../redux/actions";
import Tabs from '../../components/Subgroups/tabs'

const SubId = props => {
    const [names, setNames] = useState({
        nameAdv: '',
        nameCamp: '',
        nameSub: ''
    });
    const [state, setstate] = useState(null);
    const [txt, setTxt] = useState('/');
    const [file, setFile] = useState({
        pDomain: {},
        PApps: {},
        nDomain: {},
        nApps: {},
    })

    const history = useHistory();
    const message = useMessage();
    const {err, req, clear} = useHttp(props.preloader);

    let sub = history.location.pathname,
        camp = sub.split('/subgroups/')[0],
        advert = camp.split('/campaigns/')[0],
        thead = [
            {name:'Name', sort: 'name'},
            {name:'Type', sort: 'type'},
            {name:'Status', sort: 'status'},
            {name:'Budget', sort: 'budget'},
            {name:'ID', sort: 'id'},
            {name: <span>Landing <br/>Url</span>, sort: 'landingUrl'},
            {name:'Bid Price', sort: 'bidPrice'},
            {name: <span>frequency <br/>Cap</span>, sort: 'frequencyCap'},
            {name:<span>Budget <br/>Spent</span>, sort: 'budgetSpent'},
            {name: <span>Start <br/>Position</span> , sort: 'startPosition'},
        ];

    const pageName = async () => {
        try {
            const data = await req(history.location.pathname, 'POST', {opt:{mtd: "GET"}, body: null});
            if (data.code === 500) {
                message(data.message);
                history.push('/advertisers')
                return
            }
            setstate(data);

            const prev = await req(camp, 'POST', {opt:{mtd: "GET"}, body: null});
            const prevPre = await req(advert, 'POST', {opt:{mtd: "GET"}, body: null});

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

    const setPOST = async (name, http) => {
        const post = await req(history.location.pathname + http, 'POST', {
            opt:{
                mtd: "GET",
                set: 'file'
            },
            body: null
        });

        setFile(
            prev => ({
                ...prev,
                ...{
                    [name]: {
                        file: post.file
                    }
                }
            })
        );
        setTxt(post.file)
    }


    useEffect(() => {
        if (!state) {
            pageName()
        }
        message(err);
        clear()
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
            <div className={'z-depth-3 table-wrapper sub-group_wrapper'}>

                <table className={'highlight sub-group'}>
                    <thead>
                        <tr>
                            {state ? thead.map((el, index) => <th key={index}> {el.name}</th>) : <th>Пусто</th>}
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {state ? thead.map((el, index) => <td key={index}> {state.frequencyCap === state[el.sort] && state.frequencyCap ? <div><div>cap: {state[el.sort].cap}</div><div>period: {state[el.sort].period}</div></div> : state[el.sort]}</td>) : <td>Пусто</td>}
                            <td> </td>
                        </tr>
                    </tbody>
                </table>

                <Tabs path={history.location.pathname} post={setPOST} file={file} txt={txt}/>

            </div>
            {/*CONTENT END*/}

        </div>
    )
}



const mapDispatchToProps = {
    preloader,
};

export default connect(null, mapDispatchToProps)(SubId)
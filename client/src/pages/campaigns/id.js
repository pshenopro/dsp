import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/msg.hook";
import Table from "../../components/Campaigns/table";
import Pagination from "../../components/pagination";
import Edit from '../../components/Campaigns/edit.modal'
import Newgroup from "../../components/Campaigns/new.group";
import {preloader, removeModal, setCurrentPage} from "../../redux/actions";
import RemoveModal from "../../components/remove";

const CampaignsId =  (props) => {
    const [names, setNames] = useState({
        name: '',
        prevName: ''
    });
    const [state, setstate] = useState(null);
    const [subGroup, setSubGroup] = useState(false);
    const [modal, setModal] = useState( false);
    const [editBody, setEditBody] = useState(null);
    const [list, setlist] = useState([]);

    const history = useHistory();
    const message = useMessage();
    const {err, req, clear} = useHttp(props.preloader);


    const pageName = async () => {
        try {
            const data = await req(history.location.pathname, 'POST', {opt:{mtd: "GET"}, body: null});
            setstate(data);

            if (data.code === 500) {
                message(data.message);
                history.push('/advertisers')
            }

            const prev = await req(`/advertisers/${data.advertiserId}`, 'POST', {opt:{mtd: "GET"}, body: null});

            setNames({
                name: data.name,
                prev: prev.name
            });
        } catch (e) {
            message('Server Error');
            history.push('/advertisers')
        }
    };

    const closeGroup = (val) => {
        setSubGroup(val)
    };
    const newSubmit = async (state) => {
        const post = await req(history.location.pathname + `/subgroups`, 'POST', {opt: {mtd: "POST"}, body: state});
        post.code === 200 ? message('SUCCESS') : message(post.message);

        paginator(props.currentPage);
        setSubGroup(false)
    };

    const openEdit = function (data) {
        setModal(!modal);
        setEditBody({...data});
    };
    const changeEdit = () => {
        setModal(!modal);
    };
    const submitEdit = async (data) => {
        const post = await req(history.location.pathname + `/subgroups/${data.id}`, 'POST', {opt: {mtd: "PUT"}, body: data});
        post.code === 200 ? message('SUCCESS') : message(post.message);

        paginator(props.currentPage);
        setModal(!modal);
    }

    const removeEl = async (chose) => {
        if (chose) {
            const post = await req(history.location.pathname + `/subgroups/${props.removeItem.id}`, 'POST', {opt: {mtd: "DELETE"}, body: false});
            post.code === 204 ? message('Deleted') : message(post.message);
        }

        props.removeModal('', '', false);
        await paginator(props.currentPage);
    }

    const paginator = async (page) => {
        const data = await req(history.location.pathname + `/subgroups`, 'POST', {opt: {mtd: "GET", param: `?page=${page}&pageCount=30`}, body: null});
        setlist(data)
    }


    useEffect(() => {
        if (!state) {
            pageName()
        }
        if (list.length === 0) {
            props.setCurrentPage(1);
            paginator(1);
        }
        message(err);
        clear()
    }, [err, message, clear]);

    return (
        <div className={'page advertisers-page'}>
            <ul className={'sub-nav'}>
                <li><NavLink to='/advertisers'>Advertisers</NavLink></li>
                <i className="material-icons small">keyboard_arrow_right</i>
                <li><NavLink to={`/advertisers/${state ? state.advertiserId : ''}`}>{names.prev ? names.prev : 'Загрузка'}</NavLink></li>
                <i className="material-icons small">keyboard_arrow_right</i>
                <span>{names.name ? names.name : 'Загрузка'}</span>
            </ul>
            <div className="head">
                <h1>{names.name ? names.name : 'Загрузка'}</h1>

                <a onClick={() => setSubGroup(true)} className="waves-effect waves-light btn-middle btn lighten-2">
                    <i className="material-icons">add</i>
                    <span>new group</span>
                </a>
            </div>

            {typeof list.data === 'object' ? <Table state={list.data} changeEdit={openEdit} /> : null}
            {list.totalPages > 1 ? <Pagination paginator={paginator} page={list.totalPages} /> : null}

            {modal ? <Edit changeEdit={changeEdit} editBody={editBody} submitEdit={submitEdit} /> : null}
            {subGroup ? <Newgroup closeNew={closeGroup} submit={newSubmit} /> : null}
            {props.removeItem.bool ? <RemoveModal removeEl={removeEl} name={props.removeItem.name} /> : ""}

        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentPage: state.store.currentPage,
        removeItem: state.store.removeItem,
    }
};

const mapDispatchToProps = {
    preloader,
    setCurrentPage,
    removeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsId)
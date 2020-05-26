import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import Newgroup from '../../components/new.group'
import Pagination from '../../components/pagination'
import Table from '../../components/Advent-slug/table'
import Edit from '../../components/Advent-slug/edit.modal'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/msg.hook";
import {preloader, removeModal, setCurrentPage} from "../../redux/actions";
import RemoveModal from "../../components/remove";

const AdvertId = (props) => {
    const [state, setState] = useState(null);
    const [list, setlist] = useState([]);
    const [newGroup, setnewGroup] = useState(false);
    const [modal, setModal] = useState( false);
    const [editBody, setEditBody] = useState(null);

    const history= useHistory();
    const message = useMessage();
    const {err, req, clear} = useHttp(props.preloader);

    const pageName = async () => {
        try {
            const data = await req(`/advertisers/${props.match.params.id}`, 'POST', {opt:{mtd: "GET"}, body: null});
            setState(data);
        } catch (e) {
            message(e.message)
        }
    };

    const openEdit = function (id, name, budget, status) {
        setModal(!modal);

        setEditBody(
            {
                id: id,
                name: name,
                budget: budget,
                status: status,
            }
        );
    };
    const changeEdit = () => {
        setModal(!modal);
    };
    const submitEdit = async (data) => {
        const post = await req(history.location.pathname + `/campaigns/${data.id}`, 'POST', {opt: {mtd: "PUT"}, body: data});
        post.code === 200 ? message('SUCCESS') : message(post.message);

        paginator(props.currentPage);
        setModal(!modal);
    }

    const closeGroup = (val) => {
        setnewGroup(val)
    }
    const newSubmit = async (state) => {
        const post = await req(`/advertisers/${props.match.params.id}/campaigns`, 'POST', {opt: {mtd: "POST"}, body: state});
        post.code === 200 ? message('SUCCESS') : message(post.message);

        paginator(props.currentPage);
        setnewGroup(false)
    };

    const removeEl = async (chose) => {
        if (chose) {
            const post = await req(history.location.pathname + `/campaigns/${props.removeItem.id}`, 'POST', {opt: {mtd: "DELETE"}, body: false});
            post.code === 204 ? message('Deleted') : message(post.message);
        }

        props.removeModal('', '', false);
        await paginator(props.currentPage);
    }

    const paginator = async (page) => {
        try {
            const data = await req(`/advertisers/${props.match.params.id}/campaigns`, 'POST', {opt: {mtd: "GET", param: `?page=${page}&pageCount=30`}, body: null});
            setlist(data)
        } catch (e) {
            message(e.message)
        }
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
                <span>{state ? state.name : 'Загрузка'}</span>
            </ul>
            <div className="head">
                <h1>{state ? state.name : 'Загрузка'}</h1>

                <a onClick={() => setnewGroup(true)} className="waves-effect waves-light btn-middle btn lighten-2">
                    <i className="material-icons">add</i>
                    <span>new group</span>
                </a>
            </div>

            {typeof list.data === 'object' ? <Table state={list.data} changeEdit={openEdit}/> : null}
            {list.totalPages > 1 ? <Pagination paginator={paginator} page={list.totalPages} /> : null}

            {modal ? <Edit changeEdit={changeEdit} submitEdit={submitEdit} editBody={editBody}/> : null}
            {newGroup ? <Newgroup closeNew={closeGroup} submit={newSubmit} cost={'budget'}/> : null}
            {props.removeItem.bool ? <RemoveModal removeEl={removeEl} name={props.removeItem.name} /> : ""}
        </div>
    )
};

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

export default connect(mapStateToProps, mapDispatchToProps)(AdvertId)
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import Table from '../components/Advert/table'
import EditModal from '../components/Advert/edit.modal'
import NewModal from '../components/new.group'
import Pagination from '../components/pagination'
import {useMessage} from "../hooks/msg.hook";
import {useHttp} from "../hooks/http.hook";
import {preloader, removeModal, setCurrentPage} from "../redux/actions";
import RemoveModal from '../components/remove'

export const Advertisers = ({post, preloader, currentPage, setCurrentPage, removeItem, removeModal}) => {
    const [modal, dispatch] = useState( false);
    const [newM, setM] = useState(false);
    const [state, setState] = useState([]);
    const [editBody, setEditBody] = useState(null);

    const message = useMessage();
    const {err, req, clear} = useHttp(preloader);

    const openEdit = function (id, name, balance) {
        dispatch(!modal);

        setEditBody(
            {
                id: id,
                name: name,
                balance: balance,
            }
        );
    };
    const changeEdit = async function () {
        dispatch(!modal);
    };
    const submitEdit = async (data) => {
        const post = await req(`/advertisers/${data.id}`, 'POST', {opt: {mtd: "PUT"}, body: data});
        post.code === 200 ? message('SUCCESS') : message(post.message);

        dispatch(!modal);
        paginator(currentPage);
    }

    const newSubmit = async (data) => {
        const post = await req('/advertisers', 'POST', {opt: {mtd: "POST"}, body: data});
        post.code === 200 ? message('SUCCESS') : message(post.message);

        await paginator(currentPage);
        setM(false)
    };
    const closeNew = function () {
        setM(false)
    };

    const removeEl = async (chose) => {
      if (chose) {
          const post = await req('/advertisers/' + removeItem.id, 'POST', {opt: {mtd: "DELETE"}, body: false});
          post.code === 204 ? message('Deleted') : message(post.message);
      }

        removeModal('', '', false);
        await paginator(currentPage);
    }

    const sort = async (sort) => {
        const data = await req(`/advertisers`, 'POST', {opt: {mtd: "GET",param: `?page=${currentPage}&pageCount=30&orderBy=${sort}`}, body: null});
        setState(data);
    }

    const paginator = async (page = currentPage) => {
        const data = await req(`/advertisers`, 'POST', {opt: {mtd: "GET",param: `?page=${page}&pageCount=30`}, body: null});
        setState(data);
    }

    useEffect(() => {
        if (state.length === 0) {
            setCurrentPage(1);
            paginator(1);
            message('Для корректной работы используете вкладку в инкогнито !')
        }
        message(err);
        clear()
    }, [err, message, clear, state]);


    return (
        <div className={'page advertisers-page'}>
            <div className="head">
                <h1>Advertisers</h1>
                <a onClick={() => setM(true)} className="waves-effect waves-light btn-middle btn lighten-2"><i className="material-icons">add</i> <span>new Advertisers</span></a>
            </div>

            {typeof state.data === 'object' ? <Table state={state.data} changeEdit={openEdit} sort={sort}/> : null}

            {state.totalPages > 1 ? <Pagination paginator={paginator} page={state.totalPages} /> : null}

            {modal ? <EditModal changeEdit={changeEdit} submitEdit={submitEdit} editBody={editBody} /> : null}
            {newM ? <NewModal closeNew={closeNew} submit={newSubmit} cost={'balance'}/> : null}
            {removeItem.bool ? <RemoveModal removeEl={removeEl} name={removeItem.name} /> : ""}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        post: state.store.posts.adverts,
        currentPage: state.store.currentPage,
        removeItem: state.store.removeItem,
    }
};

const mapDispatchToProps = {
    preloader,
    setCurrentPage,
    removeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Advertisers);
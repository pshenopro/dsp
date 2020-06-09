import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import TableThead from '../components/table.thead'
import EditModal from '../components/Advert-page/edit.modal'
import NewModal from '../components/new.group'
import Pagination from '../components/pagination'
import {useMessage} from "../hooks/msg.hook";
import {useHttp} from "../hooks/http.hook";
import {preloader, removeModal, setCurrentPage, sortingBy} from "../redux/actions";
import RemoveModal from '../components/remove'
import TableList from "../components/Advert-page/tablelist";

export const Advertisers = ({preloader, currentPage, setCurrentPage, removeItem, removeModal, currentSort, sortingBy}) => {
    const [modal, dispatch] = useState( false);
    const [newM, setM] = useState(false);
    const [state, setState] = useState([]);
    const [editBody, setEditBody] = useState(null);

    const message = useMessage();
    const {err, req, clear} = useHttp(preloader);

    const sortThead = [{name:'Name', sort: 'name'},{name:'ID', sort: 'id'},{name:'Balance', sort: 'balance'}];

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
        paginator();
    }

    const newSubmit = async (data) => {
        const post = await req('/advertisers', 'POST', {opt: {mtd: "POST"}, body: data});
        post.code === 200 ? message('SUCCESS') : message(post.message);

        paginator();
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
        await paginator();
    }

    const paginator = async (sort = currentSort.name + currentSort.dir, page = currentPage) => {
        const data = await req(`/advertisers`, 'POST', {opt: {mtd: "GET",param: `?page=${page}&pageCount=30&orderBy=${sort}`}, body: null});
        if (data.code === 500) {
            message(data.message);
            return
        }

        setState(data);
    }

    useEffect(() => {
        if (state.length === 0) {
            sortingBy({name:'name', dir: ' asc'});
            setCurrentPage(1);
            paginator('name asc');
            message('Для корректной работы используете вкладку в инкогнито !')
        }
        message(err);
        clear()
    }, [err, message, clear, state]);


    return (
        <div className={'page advertisers-page'}>
            {/*HEADER*/}
            <div className="head">
                <h1>Advertisers</h1>
                <a onClick={() => setM(true)} className="waves-effect waves-light btn-middle btn lighten-2"><i className="material-icons">add</i> <span>new Advertisers</span></a>
            </div>
            {/*HEADER END*/}

            {/*TABLE*/}
            <div className={'z-depth-3 table-wrapper'}>
                <table className={'highlight'}>
                    {state.data ? <TableThead sortingBy={sortingBy} paginator={paginator} currentSort={currentSort} sortThead={sortThead}/> : null}
                    {state.data ? <TableList changeEdit={openEdit} data={state.data} /> : null}
                </table>
            </div>
            {/*TABLE END*/}


            {state.totalPages > 1 ? <Pagination paginator={paginator} page={state.totalPages} sort={currentSort} /> : null}

            {/*MODALS*/}
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
        currentSort: state.store.currentSort
    }
};

const mapDispatchToProps = {
    preloader,
    setCurrentPage,
    removeModal,
    sortingBy
};

export default connect(mapStateToProps, mapDispatchToProps)(Advertisers);
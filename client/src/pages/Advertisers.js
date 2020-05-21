import React, {useEffect, useState} from "react";
import Table from '../components/Advert/table'
import EditModal from '../components/Advert/edit.modal'
import NewModal from '../components/new.group'
import Pagination from '../components/pagination'
import {useMessage} from "../hooks/msg.hook";
import {useHttp} from "../hooks/http.hook";

export const Advertisers = () => {
    const [modal, dispatch] = useState( false);
    const [newM, setM] = useState(false);
    const [state, setState] = useState([]);
    const [editBody, setEditBody] = useState({id: null, name: '', balance: null,});

    const message = useMessage();
    const {load, err, req, clear} = useHttp();

    const openEdit = function (id,balance) {
        dispatch(!modal);

        setEditBody(
            {
                id: id,
                balance: balance,
            }
        );
    };
    const changeEdit = async function () {
        dispatch(!modal);
    };
    const submitEdit = async (data) => {
        try {
            const post = await req(`/advertisers/${data.id}`, 'POST', {opt: {mtd: "PUT"}, body: data});
            message('SUCCESS');
        } catch (e) {
            message('HTTP error')
        }

        dispatch(!modal);
        paginator(state.totalPages);
    }

    const newSubmit = async (data) => {
        try {
            const post = await req('/advertisers', 'POST', {opt: {mtd: "POST"}, body: data});
            message('new Advertisers DONE');
        } catch (e) {
            message('HTTP error')
        }

        await paginator(state.totalPages);
        setM(false)
    };
    const closeNew = function () {
        setM(false)
    };

    const paginator = async (page) => {
        const data = await req(`/advertisers`, 'POST', {opt: {mtd: "GET",param: `?page=${page}&pageCount=30`}, body: null});
        setState(data);
    }

    useEffect(() => {
        if (state.length === 0) {
            paginator(1);
        }
        message(err);
        clear()
    }, [err, message, clear]);


    return (
        <div className={'page advertisers-page'}>
            <div className="head">
                <h1>Advertisers</h1>
                <a onClick={() => setM(true)} className="waves-effect waves-light btn-middle btn lighten-2"><i className="material-icons">add</i> <span>new Advertisers</span></a>
            </div>

            {typeof state.data === 'object' ? <Table state={state.data} changeEdit={openEdit}/> : null}

            {state.totalPages > 1 ? <Pagination paginator={paginator} page={state.totalPages} /> : null}

            {modal ? <EditModal changeEdit={changeEdit} submitEdit={submitEdit} editBody={editBody} /> : null}
            {newM ? <NewModal closeNew={closeNew} submit={newSubmit}/> : null}
        </div>
    )
}

export default Advertisers;
import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import Newgroup from '../../components/new.group'
import Pagination from '../../components/pagination'
import Edit from '../../components/Advert-id/edit.modal'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/msg.hook";
import {preloader, removeModal, setCurrentPage, sortingBy} from "../../redux/actions";
import RemoveModal from "../../components/remove";
import TableList from "../../components/Advert-id/tablelist";
import TableThead from '../../components/table.thead'

const AdvertId = (props) => {
    const [state, setState] = useState(null);
    const [list, setlist] = useState([]);
    const [newGroup, setnewGroup] = useState(false);
    const [modal, setModal] = useState( false);
    const [editBody, setEditBody] = useState(null);

    const history= useHistory();
    const message = useMessage();
    const {err, req, clear} = useHttp(props.preloader);

    const sortThead = [
        {name:'Group name', sort: 'name'},
        {name:'Status', sort: 'status'},
        {name:'ID', sort: 'id'},
        // {name:'Advertiser ID', sort: 'advertiserId'},
        {name: <span>Budget <br/>Spent</span>, sort: 'budgetSpent'},
        {name:'Budget', sort: 'budget'},
        // {name: <span>frequency <br/>Cap</span>, sort: 'frequencyCap'},
        {name:'Date', sort: 'startDate'},
    ];

    const pageName = async () => {
        const data = await req(`http://92.42.15.118:80/api/advertisers/${props.match.params.id}`, 'GET');
        if (data) {
            setState(data)
        }
    };

    const openEdit = function (data) {
        setModal(!modal);

        setEditBody(data);
    };
    const changeEdit = () => {
        setModal(!modal);
    };
    const submitEdit = async (data) => {
        try {
            const post = await req('http://92.42.15.118:80/api' + history.location.pathname + `/campaigns/${data.id}`, 'PUT', data);
            message('Success')
        } catch (e) {
            message('Server error');
        }

        paginator();
        setModal(!modal);
    }

    const closeGroup = (val) => {
        setnewGroup(val)
    }
    const newSubmit = async (state) => {
        try {
            const post = await req(`http://92.42.15.118:80/api/advertisers/${props.match.params.id}/campaigns`, 'POST', state);
            message('Success')
        } catch (e) {
            message('Server error')
        }
        paginator();
        setnewGroup(false)
    };

    const removeEl = async (chose) => {
        if (chose) {
            try {
                const post = await req('http://92.42.15.118:80/api' + history.location.pathname + `/campaigns/${props.removeItem.id}`, 'DELETE');
                message('Deleted')
            } catch (e) {
                message('Server error');
            }
        }

        props.removeModal('', '', false);
        await paginator();
    }

    const paginator = async (sort = props.currentSort.name + props.currentSort.dir, page = props.currentPage) => {
        const data = await req(`http://92.42.15.118:80/api/advertisers/${props.match.params.id}/campaigns?page=${page}&pageCount=30&orderBy=${sort}`, 'GET', );
        if (data) {
            setlist(data)
        }
    }

    useEffect(() => {
        if (!state) {
            pageName()
        }

        if (list.length === 0) {
            sortingBy({name:'name', dir: ' asc'});
            props.setCurrentPage(1);
            paginator('name asc');
        }
        message(err);
        clear()
    }, [err, message, clear]);

    return (
        <div className={'page advertisers-page'}>
            {/*HEADER*/}
            <ul className={'sub-nav'}>
                <li><NavLink to='/advertisers'>Advertisers</NavLink></li>
                <i className="material-icons small">keyboard_arrow_right</i>
                <span>{state ? state.name : 'Загрузка'}</span>
            </ul>
            <div className="head">
                <h1>{state ? state.name : 'Загрузка'}</h1>

                <a onClick={() => setnewGroup(true)} className="waves-effect waves-light btn-middle btn lighten-2">
                    <i className="material-icons">add</i>
                    <span>new campaigns</span>
                </a>
            </div>
            {/*HEADER END*/}

            {/*TABLE*/}
            <div className={'z-depth-3 table-wrapper'}>
                <table className={'highlight table-group'}>
                    {list.data ? <TableThead sortingBy={props.sortingBy} paginator={paginator} currentSort={props.currentSort} sortThead={sortThead}/> : null}
                    {list.data ? <TableList changeEdit={openEdit} data={list.data}/> : null}
                </table>
            </div>
            {/*TABLE END*/}

            {list.totalPages > 1 ? <Pagination paginator={paginator} page={list.totalPages} sort={props.currentSort} /> : null}

            {/*MODALS*/}
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
        currentSort: state.store.currentSort
    }
};

const mapDispatchToProps = {
    preloader,
    setCurrentPage,
    removeModal,
    sortingBy
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertId)
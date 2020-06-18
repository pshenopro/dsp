import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/msg.hook";
import Pagination from "../../components/pagination";
import Edit from '../../components/Campaigns/edit.modal'
import Newgroup from "../../components/Campaigns/new.group";
import {preloader, removeModal, setCurrentPage, sortingBy} from "../../redux/actions";
import RemoveModal from "../../components/remove";
import TableList from "../../components/Campaigns/tablelist";
import TableThead from "../../components/table.thead";

const CampaignsId =  (props) => {
    const [names, setNames] = useState({
        name: '',
        prevName: ''
    });
    const [state, setstate] = useState(null);
    const [modal, setModal] = useState( false);
    const [list, setlist] = useState([]);

    const history = useHistory();
    const message = useMessage();
    const {err, req, clear} = useHttp(props.preloader);

    const sortThead = [
        {name:'ID', sort: 'id'},
        {name:'Name', sort: 'name'},
        {name:'Type', sort: 'type'},
        {name:'Status', sort: 'status'},
        {name:'Budget', sort: 'budget'},
        {name: <span>Landing <br/>Url</span>, sort: 'landingUrl'},
        {name:'Bid Price', sort: 'bidPrice'},
        {name: <span>frequency <br/>Cap</span>, sort: 'frequencyCap'},
        {name:<span>Budget <br/>Spent</span>, sort: 'budgetSpent'},
        {name: <span>Start <br/>Position</span> , sort: 'startPosition'},
        {name:'Date', sort: 'startDate'},
    ]

    const pageName = async () => {
        try {
            const data = await req('http://92.42.15.118:80/api' + history.location.pathname, 'GET',);
            setstate(data);

            if (data) {
                setstate(data);
            }

            const prev = await req(`http://92.42.15.118:80/api/advertisers/${data.advertiserId}`, 'GET');

            setNames({
                name: data.name,
                prev: prev.name
            });
        } catch (e) {
            message('Server Error');
            history.push('/advertisers')
        }
    };

    const removeEl = async (chose) => {
        try {
            if (chose) {
                const post = await fetch('http://92.42.15.118:80/api' + history.location.pathname + `/subgroups/${props.removeItem.id}`, {method: 'DELETE'});
            }
            message('Success')
        } catch (e) {
            message('Server error')
        }

        props.removeModal('', '', false);
        await paginator();
    }

    const paginator = async (sort = props.currentSort.name + props.currentSort.dir, page = props.currentPage) => {
        const data = await req('http://92.42.15.118:80/api' + history.location.pathname + `/subgroups?page=${page}&pageCount=30&orderBy=${sort}`, 'GET');
        if (data.code === 500) {
            message(data.message);
            return
        }

        setlist(data)
    };

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
                <li><NavLink to={`/advertisers/${state ? state.advertiserId : ''}`}>{names.prev ? names.prev : 'Загрузка'}</NavLink></li>
                <i className="material-icons small">keyboard_arrow_right</i>
                <span>{names.name ? names.name : 'Загрузка'}</span>
            </ul>
            <div className="head">
                <h1>{names.name ? names.name : 'Загрузка'}</h1>
                <NavLink to={history.location.pathname + '/new'} className="waves-effect waves-light btn-middle btn lighten-2">
                    <i className="material-icons">add</i>
                    <span>new group</span>
                </NavLink>
            </div>
            {/*HEADER END*/}

            {/*TABLE*/}
            <div className={'z-depth-3 table-wrapper sub-group_wrapper'}>
                <table className={'highlight sub-group'}>
                    {list.data ? <TableThead sortingBy={props.sortingBy} paginator={paginator} currentSort={props.currentSort} sortThead={sortThead}/> : null}
                    {list.data ? <TableList data={list.data}/> : null}
                </table>
            </div>
            {/*TABLE END*/}

            {list.totalPages > 1 ? <Pagination paginator={paginator} page={list.totalPages} sort={props.currentSort} /> : null}

            {/*MODALS*/}
            {props.removeItem.bool ? <RemoveModal removeEl={removeEl} name={props.removeItem.name} /> : ""}

        </div>
    )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsId)
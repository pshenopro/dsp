import React, {useEffect, useState} from "react";
import TableList from './tablelist.js'
import PropTypes from 'prop-types';
import SortItem from './sortItem'

const Table = ({changeEdit, state, sort}) => {
    let arr = ['Name', 'ID'];
    const [active, setActive] = useState('');

    const setA = (name) => {
        setActive('');
        arr.forEach((el, index) => {
            if (el === name ) {
                setActive(arr[index])
            }
        })
    }

    return (
        <div className={'z-depth-3 table-wrapper'}>
            <table className={'highlight'}>
                <thead>
                    <tr>
                        <th><SortItem name={'Name'} sortBy={'name asc'} sort={sort} setActive={setA} active={active} /></th>
                        <th><SortItem name={'ID'} sortBy={'id asc'} sort={sort} setActive={setA} active={active} /></th>
                        <th>Balance</th>
                        <th> </th>
                    </tr>
                </thead>
                <TableList changeEdit={changeEdit} data={state} />
            </table>
        </div>
    )
};

Table.propTypes = {
    state: PropTypes.array,
    changeEdit: PropTypes.func,
    sort: PropTypes.func,
};

export default Table;
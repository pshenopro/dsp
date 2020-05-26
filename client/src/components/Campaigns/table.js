import React from "react";
import TableList from './tablelist.js'
import PropTypes from 'prop-types';

const Table = ({changeEdit, state}) => {

    return (
        <div className={'z-depth-3 table-wrapper sub-group_wrapper'}>
            <table className={'highlight sub-group'}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Budget</th>
                    <th>ID</th>
                    <th>Landing Url</th>
                    <th>Bid Price</th>
                    <th>frequency Cap</th>
                    <th>Budget <br/>Spent</th>
                    <th>Start <br/>Position</th>
                    <th>Date</th>
                    <th> </th>
                </tr>
                </thead>

                <TableList changeEdit={changeEdit} data={state}/>
            </table>
        </div>
    )
};

Table.propTypes = {
    state: PropTypes.array,
    changeEdit: PropTypes.func,
};

export default Table;
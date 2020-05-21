import React from "react";
import TableList from './tablelist.js'
import PropTypes from 'prop-types';

const Table = ({changeEdit, state}) => {

    return (
        <div className={'z-depth-3 table-wrapper'}>
            <table className={'highlight table-group'}>
                <thead>
                <tr>
                    <th>Group name</th>
                    <th>Status</th>
                    <th>ID</th>
                    <th>Advertiser ID</th>
                    <th>budget</th>
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
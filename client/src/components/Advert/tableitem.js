import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';

const Item = ({name, id, balance, changeEdit}) => {

    return (
        <tr>
            <td><NavLink to={'/advertisers/' + id} exact>{name}</NavLink></td>
            <td>{id}</td>
            <td>{balance} руб.</td>
            <td>
                <a onClick={() => changeEdit(id, balance)} className="btn-edit btn-floating btn-small waves-effect waves-light teal lighten-2">
                    <i className="material-icons">mode_edit</i>
                </a>
            </td>
        </tr>
    )
};

Item.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    balance: PropTypes.number,
    changeEdit: PropTypes.func
};

export default Item;

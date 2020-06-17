import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {removeModal} from "../../redux/actions";

const Item = ({name, id, balance, changeEdit, removeModal}) => {

    return (
        <tr>
            <td>{id}</td>
            <td><NavLink to={'/advertisers/' + id} exact>{name}</NavLink></td>
            <td>{balance} руб.</td>
            <td>
                <a title={'Edit'} onClick={() => changeEdit(id, name, balance)} className="btn-edit btn-table btn-floating btn-small waves-effect waves-light teal lighten-2">
                    <i className="material-icons">mode_edit</i>
                </a>
                <a title={'remove'} onClick={() => removeModal(id, name, true)} className="btn-edit btn-table btn-delete btn-floating btn-small waves-effect waves-light red darken-2">
                    <i className="material-icons">delete_forever</i>
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

const mapDispatchToProps = {
    removeModal
};

export default connect(null, mapDispatchToProps)(Item);

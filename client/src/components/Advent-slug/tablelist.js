import React, {useContext, useState} from "react";
import PropTypes from 'prop-types';
import {NavLink, useHistory} from "react-router-dom";
import {removeModal} from "../../redux/actions";
import {connect} from "react-redux";



const Tablelist = ({data, changeEdit, removeModal}) => {
    const history = useHistory();
    const status = ['Created', 'Active', 'Stopped', 'Completed'];


    return (
        <tbody>
            {data.length ? data.map((el, index) => <tr key={el.id}>
                <td><NavLink to={history.location.pathname + '/campaigns/' + el.id} exact>{el.name}</NavLink></td>
                <td className={'status ' + status[el.status - 1]}>{status[el.status - 1]}</td>
                <td>{el.id}</td>
                <td>{el.advertiserId}</td>
                <td>{el.budgetSpent}</td>
                <td>{el.budget}</td>
                <td>
                    <div>cap: {el.frequencyCap ? el.frequencyCap.cap : "-"}</div>
                    <div>period: {el.frequencyCap ? el.frequencyCap.period : "-"}</div>
                </td>
                <td>
                    <a onClick={() => changeEdit(el.id, el.name, el.budget, el.status)} className="btn-edit btn-table btn-floating btn-small waves-effect waves-light teal lighten-2">
                        <i className="material-icons">mode_edit</i>
                    </a>

                    <a title={'remove'} onClick={() => removeModal(el.id, el.name, true)} className="btn-edit btn-table btn-delete btn-floating btn-small waves-effect waves-light red darken-2">
                        <i className="material-icons">delete_forever</i>
                    </a>
                </td>
            </tr>) : <tr><td colSpan={"6"} className={'empty-td'}>"Пусто"</td></tr>}
        </tbody>
    )
};

Tablelist.propTypes = {
    data: PropTypes.array,
    changeEdit: PropTypes.func,
};

const mapDispatchToProps = {
    removeModal
};

export default connect(null, mapDispatchToProps)(Tablelist);
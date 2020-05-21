import React, {useContext, useState} from "react";
import PropTypes from 'prop-types';
import {NavLink, useHistory} from "react-router-dom";



const Tablelist = ({data, changeEdit}) => {
    const history = useHistory();
    const status = ['Created', 'Active', 'Stopped', 'Completed'];


    return (
        <tbody>
            {data.length ? data.map((el, index) => <tr key={el.id}>
                <td><NavLink to={history.location.pathname + '/campaigns/' + el.id} exact>{el.name}</NavLink></td>
                <td>{status[el.status]}</td>
                <td>{el.id}</td>
                <td>{el.advertiserId}</td>
                <td>{el.budget}</td>
                <td>
                    <a onClick={() => changeEdit(el.id, el.name, el.budget, el.status)} className="btn-edit btn-floating btn-small waves-effect waves-light teal lighten-2">
                        <i className="material-icons">mode_edit</i>
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

export default Tablelist;
import React from "react";
import PropTypes from 'prop-types';
import {NavLink, useHistory} from "react-router-dom";
import {removeModal} from "../../redux/actions";
import {connect} from "react-redux";


const Tablelist = ({data, removeModal}) => {
    const history = useHistory();
    const type = ['Banner', 'Video'];
    const place = ['In-Stream', 'In-Banner', 'In-Article', 'In-Feed', 'Interstitial / Slider / Floating'];
    const status = ['Created', 'Active', 'Stopped', 'Completed'];

    const reversDate = (val) => {
        let date = val.split('T')[0].split('-');
        return date[2] + '.' + date[1] + '.' + date[0]
    };

    return (
        <tbody>
            {data.length ? data.map((el, index) => <tr key={el.id}>
                <td>{el.id}</td>
                <td><NavLink to={history.location.pathname + '/subgroups/' + el.id} exact>{el.name}</NavLink></td>
                <td>
                    <div>{type[el.type]}</div>
                    {type[el.type] === 'Video' ? <div><i>{place[el.placement]}</i></div> : ''}
                </td>
                <td className={'status ' + status[el.status]}>{status[el.status]}</td>
                <td>{el.budget}</td>
                <td>{el.landingUrl.split('//')[1]}</td>
                <td>{el.bidPrice}</td>
                <td>
                    <div>cap: {el.frequencyCap ? el.frequencyCap.cap : "-"}</div>
                    <div>period: {el.frequencyCap ? el.frequencyCap.period : "-"}</div>
                </td>
                <td>{el.budgetSpent}</td>
                <td>{el.startPosition}</td>
                <td>
                    <div>Start Date: <i>{reversDate(el.startDate)}</i></div>
                    <div>End Date: <i>{reversDate(el.endDate)}</i></div>
                </td>
                <td>
                    <a title={'remove'} onClick={() => removeModal(el.id, el.name, true)} className="btn-table btn-edit btn-table btn-delete btn-floating btn-small waves-effect waves-light red darken-2">
                        <i className="material-icons">delete_forever</i>
                    </a>
                </td>
            </tr>) : <tr><td colSpan={"6"} className={'empty-td'}>"Пусто"</td></tr>}
        </tbody>
    )
};

Tablelist.propTypes = {
    data: PropTypes.array,
};

const mapDispatchToProps = {
    removeModal
};

export default connect(null, mapDispatchToProps)(Tablelist);
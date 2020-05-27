import React from "react";
import Item from './tableitem.js'
import PropTypes from 'prop-types';


const Tablelist = ({data, changeEdit}) => {
    return (
        <tbody>
            {data.length ? data.map((el, index) => <Item
                changeEdit={changeEdit}
                key={el.id}
                id={el.id}
                name={el.name}
                balance={el.balance}
            />) : <tr><td colSpan={'4'}>"Пусто"</td></tr>}
        </tbody>
    )
};

Tablelist.propTypes = {
    data: PropTypes.array,
    changeEdit: PropTypes.func,
};

export default Tablelist;
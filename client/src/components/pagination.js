import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';

const Pagination = ({page, paginator}) => {

    let [curr, setCurr] = useState(1);

    let numbersPage = page,
        numbersList = [];
    for (let i=0; i < numbersPage; i++) {
        numbersList.push(i + 1);
    }

    useEffect(() => {
        paginator(curr);
    }, [curr]);

    return (
        <ul className="pagination">
            <li onClick={() => {setCurr( curr - 1)}} className={curr === 1 ? 'disabled' : 'waves-effect'}><a><i className="material-icons">chevron_left</i></a></li>

            {numbersList.map((el, index) => <li onClick={() => setCurr(el)} className={el === curr ? 'active' : 'waves-effect'} key={index}><a>{el}</a></li>)}

            <li onClick={() => {setCurr( curr + 1)}} className={numbersPage === curr ? 'disabled' : 'waves-effect'}><a><i className="material-icons">chevron_right</i></a></li>
        </ul>
    )
};

Pagination.prototype = {
    page: PropTypes.number,
    paginator: PropTypes.func
};

export default Pagination;
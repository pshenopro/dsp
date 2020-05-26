import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {setCurrentPage} from "../redux/actions";

const Pagination = ({page, paginator, currentPage, setCurrentPage}) => {
    let numbersPage = page,
        numbersList = [];
    for (let i=0; i < numbersPage; i++) {
        numbersList.push(i + 1);
    }

    const checkCur = (val) => {
        setCurrentPage(currentPage + val)
    }



    useEffect(() => {
        paginator(currentPage);
    }, [currentPage]);

    return (
        <ul className="pagination">
            <button
                type={'button'}
                onClick={() => {checkCur(-1)}}
                className={currentPage === 1 ? 'disabled' : 'waves-effect'}
                disabled={currentPage === 1}>
                <i className="material-icons">chevron_left</i>
            </button>

            {numbersList.map((el, index) => <li onClick={() => setCurrentPage(el)} className={el === currentPage ? 'active' : 'waves-effect'} key={index}><a>{el}</a></li>)}

            <button
                type={'button'}
                onClick={() => {checkCur(+1)}}
                className={numbersPage === currentPage ? 'disabled' : 'waves-effect'}
                disabled={numbersPage === currentPage}>
                <i className="material-icons">chevron_right</i>
            </button>
        </ul>
    )
};

Pagination.prototype = {
    page: PropTypes.number,
    paginator: PropTypes.func
};

const mapStateToProps = state => {
    return {
        currentPage: state.store.currentPage
    }
};

const mapDispatchToProps = {
    setCurrentPage
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
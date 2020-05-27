import React from "react";
import PropTypes from 'prop-types';


const Sort = ({name, setActive, active}) => {
    const submit = () => {
        setActive(name);
    };

    return (
        <span onClick={submit} className={`sort ${active === name ? 'active' : ''}`}>{name} <i className="material-icons Small">import_export</i></span>
    )
};

Sort.propTypes = {
    name: PropTypes.string,
    active: PropTypes.string,
};

export default Sort;
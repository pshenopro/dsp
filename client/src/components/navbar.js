import React from "react";

export default () => {


    return (
        <nav id={'navbar'}>
            <div className="nav-wrapper teal lighten-2">
                <a className="btn-floating btn-large waves-effect waves-light teal darken-2"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="#"><b>LOGOUT</b></a></li>
                </ul>
            </div>
        </nav>
    )
}
import React, {useContext} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {connect} from 'react-redux'
import {useRoutes} from "./routes";
import {AppContext} from "./context/AppContext";
import Nav from './components/navbar';
import Preload from './components/preloader'


function App({preloader}) {
    const routes = useRoutes(true);
    const {status, typeTv, typePlaceTv} = useContext(AppContext);

    return (
        <AppContext.Provider value={{status, typeTv, typePlaceTv}}>
            <Router>
                <Nav />
                {routes}

                {preloader ? <Preload /> : null}
            </Router>
        </AppContext.Provider>
    )
};

const mapStateToProps = state => {
    return {
        preloader: state.store.preloader
    }
};

export default connect(mapStateToProps, null)(App);

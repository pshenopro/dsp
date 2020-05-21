import React, {useContext} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes";
import {AppContext} from "./context/AppContext";
import Nav from './components/navbar';


function App() {
    const routes = useRoutes(true);
    const {status} = useContext(AppContext);

    return (
        <AppContext.Provider value={{status}}>
            <Router>
                <Nav />
                {routes}
            </Router>
        </AppContext.Provider>
    )
}

export default App;

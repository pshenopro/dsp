import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import Advertisers from "./pages/Advertisers";
import AdvertisersId from "./pages/advertisers/id";
import CampaignsId from "./pages/campaigns/id";
import SubId from './pages/subgroups/id';
import NewSub from './pages/subgroups/new';


export const useRoutes = () => {
    if (true) {
        return(
            <Switch>
                <Route path="/advertisers" exact>
                    <Advertisers />
                </Route>

                <Route exact path="/advertisers/:id" component={AdvertisersId} />
                <Route exact path="/advertisers/:id/campaigns/:id" component={CampaignsId} />
                <Route exact path="/advertisers/:id/campaigns/:id/subgroups/:id" component={SubId} />
                <Route exact path="/advertisers/:id/campaigns/:id/new" component={NewSub} />

                <Redirect to={'/advertisers'} />
            </Switch>
        )
    }
}
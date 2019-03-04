import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import IndexPage from "./page/index.js";
import Second from './page/second.js';

export class MainRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path={'/'} component={IndexPage} />
                    <Route  path={'/second'} component={Second} />
                </Switch>
            </HashRouter>
        );
    }
}
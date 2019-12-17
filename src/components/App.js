import React, { Suspense, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Performances from './Performances';
import Bookings from './Bookings';
import Admin from './Admin';
import Performance from './Performance';
import NotFound from './NotFound';
import Header from './Header';
import Footer from './Footer';
import PerformanceUpdate from "./PerformanceUpdate";
import Login from "./Login";

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/performances",
        component: Performances
    },
    {
        path: "/bookings",
        component: Bookings
    },
    {
        path: "/admin",
        component: Admin
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/performance/edit/:id",
        component: PerformanceUpdate
    },
    {
        path: "/performances/create",
        component: Performance
    }
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasBanner: window.location.pathname === "/",
        };
        this.changeHasBannerState = this.changeHasBannerState.bind(this);
    }

    changeHasBannerState() {
        this.setState({hasBanner: window.location.pathname === "/"});
    }

    render() {
        return (
            <Router>
                <Header hasBanner={this.state.hasBanner}/>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        {routes.map((route, i) => {
                            return (<Route key={i} exact
                                    path={route.path}
                                    render={props => (
                                        <route.component {...props} changeHasBannerState={this.changeHasBannerState}/>
                                    )}
                            />)
                        })}
                        <Route key={routes.length}
                               render={props => (
                                   <NotFound {...props} changeHasBannerState={this.changeHasBannerState} />
                               )}
                        />
                    </Switch>
                </Suspense>
                <Footer/>
            </Router>
        )
    }
}

export default App
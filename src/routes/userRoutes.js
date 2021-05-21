import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Licenses from '../pages/inicio';

import { Error404 } from '../pages/error';

const userRoutes = props => {
    const {
        url,
        setKey,
    } = props;

    const renderRoute = (id, Component, otherProps) => {
        setKey(id);
        return (<Component {...otherProps} />);
    };

    return (
        <Switch>

            <Route
                exact
                path={`${url}`}
                render={prop => renderRoute('licenses', Licenses, prop)}
            />

            <Route
                exact
                path={`${url}licenses`}
                render={prop => renderRoute('licenses', Licenses, prop)}
            />

            <Route
                path="/*"
                render={prop => renderRoute('', Error404, prop)}
            />

        </Switch>
    );
};

userRoutes.propTypes = {
    url: PropTypes.string.isRequired,
    setKey: PropTypes.func.isRequired,
};

export default userRoutes;

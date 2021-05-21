import i18next from 'i18next';
import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import {
    Error403,
    Error404,
    Error500,
} from '../pages/error';

import AuthenticationPage from '../pages/authentication';
import Quiz from '../pages/quiz';

import User from '../classes/user';
import AdminRoutes from './adminRoutes';
import UserRoutes from './userRoutes';
import ThemeSwitcher from '../utils/theme-switcher';
import AdminLayout from '../components/layout/AdminLayout';

let changeThemeColor = () => {};

const Routes = () => {

    const user = User.getUser();
    const typeUser = () => {
        if (user.type_user === 'ADMIN') {
            return true;
        }
        return false;

    };
    const [key, setKey] = useState('');
    // const isAdmin = typeUser();
    const isAdmin = true;

    useEffect(() => {
        if (key) {
            User.setPageTitle(i18next.t(`titleKey.${key}`));
        }
    }, [key]);

    const redirectLayout = (prop, Component, theme = false, layout = false) => {
        const { url = '' } = ((prop || {}).match || {});

        const component = (
            <Component
                {...prop}
                url={url}
                setKey={setKey}
            />
        );

        if (layout) {
            return (
                <ThemeSwitcher
                    changeTheme={req => {
                        changeThemeColor = req;
                    }}
                >
                    <AdminLayout
                        menuKey={key}
                        changeTheme={changeThemeColor}
                    >
                        {component}
                    </AdminLayout>
                </ThemeSwitcher>
            );
        }

        if (theme) {
            return (
                <ThemeSwitcher
                    changeTheme={req => {
                        changeThemeColor = req;
                    }}
                >
                    {component}
                </ThemeSwitcher>
            );
        }

        return component;
    };

    const getRoutes = () => (
        isAdmin
            ? <Route path="/" render={prop => redirectLayout(prop, AdminRoutes, true, true)} />
            : <Route path="/" render={prop => redirectLayout(prop, UserRoutes, true, true)} />
    );

    return (
        <BrowserRouter>
            <Switch>
                {/* { user
                    ? getRoutes()
                    : (<Route exact path="/*" component={AuthenticationPage} />)} */}
                <Route exact path="/login" component={AuthenticationPage} />
                <Route exact path="/quiz" component={Quiz} />
                <Route path="/" render={prop => redirectLayout(prop, AdminRoutes, true, true)} />
                <Route path="/403" render={prop => redirectLayout(prop, Error403, true)} />
                <Route path="/404" render={prop => redirectLayout(prop, Error404, true)} />
                <Route path="/500" render={prop => redirectLayout(prop, Error500, true)} />

                <Route render={Error404} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

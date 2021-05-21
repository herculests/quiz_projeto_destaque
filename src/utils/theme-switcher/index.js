/* eslint-disable global-require */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

export const getCurrentTheme = () => {
    const theme = localStorage.getItem('site-theme');

    if (theme === 'dark') {
        return 'dark';
    }

    return 'light';
};

const ThemeSwitcher = props => {
    const {
        children,
        changeTheme,
    } = props;

    useEffect(() => {
        changeTheme(() => {
            if (getCurrentTheme() === 'dark') {
                localStorage.setItem('site-theme', 'light');
            } else {
                localStorage.setItem('site-theme', 'dark');
            }

            window.location.reload();
        });
    }, []);

    useEffect(() => {
        switch (getCurrentTheme()) {
            case 'dark':
                require('antd/dist/antd.dark.less');
                require('../../../assets/less/theme-dark.less');
                break;
            default:
                require('antd/dist/antd.less');
                require('../../../assets/less/theme-light.less');
                break;
        }

        require('../../../assets/less/main.less');
    }, []);

    return (
        <>
            {children}
        </>
    );
};

ThemeSwitcher.propTypes = {
    changeTheme: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
};

export default ThemeSwitcher;

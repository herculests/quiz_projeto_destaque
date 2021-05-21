import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { withTranslation } from 'react-i18next';

import Login from './login';
import User from '../../classes/user';
import Language from '../../components/languages/Language';
import background from '../../../assets/images/login-background.png';

import './index.less';

const AuthenticationPage = () => {

    useEffect(() => {

        if (User.getUser()) {
            window.location = '/inicio';
        }
    }, []);

    const getPageContent = () => (
        <Login />
    );

    return (
        <Layout
            style={{
                minHeight: '100vh',
                background: `url(${background}) #EEF7FF no-repeat center`,
            }}
        >
            <Layout.Content style={{ padding: 50 }}>
                {getPageContent()}
            </Layout.Content>
        </Layout>
    );
};

AuthenticationPage.propTypes = {
};

export default withTranslation('common')(AuthenticationPage);

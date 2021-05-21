import { Layout } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Footer from './footer';
import AdminHeader from './header/AdminHeader';
import AdminSidebar from './sidebar/AdminSidebar';

import './index.less';

const MainLayout = props => {
    const {
        menuKey,
        children,
        changeTheme,
    } = props;

    const [collapsed, setCollapsed] = useState(false);

    const changeCollapsed = flag => {
        setCollapsed(flag);
        localStorage.setItem('isCollapsed', flag);
    };

    useEffect(() => {
        if (window.innerWidth <= 1024) {
            changeCollapsed(true);
        } else {
            window.addEventListener('resize', () => {
                if (window.innerWidth <= 920) {
                    changeCollapsed(true);
                } else { changeCollapsed(false); }
            });
        }
    });

    return (
        <Layout className={`layout-colapse ${collapsed ? 'collapsed' : ''}`}>
            <AdminSidebar
                menuKey={menuKey}
                collapsed={collapsed}
                changeCollapsed={() => changeCollapsed(!collapsed)}
            />
            <Layout>
                <AdminHeader
                    collapsed={collapsed}
                    changeTheme={changeTheme}
                    changeCollapsed={() => changeCollapsed(!collapsed)}
                />

                <Layout className="site-layout">
                    <Layout.Content>
                        {children}
                    </Layout.Content>
                    <Footer />
                </Layout>
            </Layout>
        </Layout>
    );
};

MainLayout.propTypes = {
    menuKey: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    changeTheme: PropTypes.func.isRequired,
};

export default MainLayout;

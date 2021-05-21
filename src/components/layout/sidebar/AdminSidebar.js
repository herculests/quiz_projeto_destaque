import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Modal, Layout } from 'antd';
import {
    HomeOutlined,
    ProfileOutlined,
    ExclamationCircleOutlined,
    ReconciliationOutlined,
    TrophyTwoTone,
} from '@ant-design/icons';

import User from '../../../classes/user';

const SideBar = props => {
    const user = User.getUser();
    const {
        menuKey,
        collapsed,
        changeCollapsed,
    } = props;
    const [widthPage, setWidthPage] = useState(window.innerWidth);


    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidthPage(window.innerWidth);
        });
    }, []);

    const openConfirmLogin = () => {
        Modal.confirm({
            onCancel() {},
            okType: 'danger',
            icon: <ExclamationCircleOutlined />,
            okText: i18next.t('components.layout.sidebar.confirmLogout.ok'),
            title: i18next.t('components.layout.sidebar.confirmLogout.title'),
            content: i18next.t('components.layout.sidebar.confirmLogout.content'),
            cancelText: i18next.t('components.layout.sidebar.confirmLogout.cancel'),
            onOk() {
                User.doLogout();
            },
        });
    };

    const isResponsive = () => {
        let answer = false;
        if (widthPage <= 640) {
            answer = true;
        }
        return answer;
    };

    return (
        <Layout.Sider
            collapsible
            trigger={null}
            collapsed={collapsed}
            collapsedWidth={isResponsive() ? '0' : '80'}
            style={{
                left: 0,
                height: '100vh',
                overflow: 'auto',
                position: 'fixed',
            }}
        >
            <Menu
                mode="inline"
                selectedKeys={[menuKey]}
                style={{ height: '100%' }}
                className={!collapsed ? 'sidebar-menu-wrapper' : ''}
                onClick={isResponsive() ? changeCollapsed : () => {}}
            >
                <a href="/">
                    <div
                        className={collapsed ? 'header-logo collapsed' : 'header-logo'}
                    />
                </a>

                <Menu.Item key="inicio">
                    <Link to="/inicio">
                        <HomeOutlined />
                        <span>
                            Início
                        </span>
                    </Link>
                </Menu.Item>

                {/* {(user.type_user === 'ADMIN')

                    ? (
                        <Menu.Item key="users">
                            <Link to="/users">
                                <UserOutlined />
                                <span>
                                    {i18next.t('titleKey.users')}
                                </span>
                            </Link>
                        </Menu.Item>
                    )
                    : null
                } */}
                <Menu.Item key="perguntas">
                    <Link to="/perguntas">
                        <ReconciliationOutlined />
                        <span>
                            Questionarios
                            {/* {i18next.t('titleKey.users')} */}
                        </span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="quiz">
                    <Link to="/quiz">
                        <ProfileOutlined />
                        <span>
                            Quiz
                        </span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="ranking">
                    <Link to="/ranking">
                        <TrophyTwoTone twoToneColor="yellow" style={{ fontSize: 20 }} />
                        <span>
                            Ranking
                        </span>
                    </Link>
                </Menu.Item>

            </Menu>
        </Layout.Sider>
    );
};

SideBar.propTypes = {
    menuKey: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    changeCollapsed: PropTypes.func.isRequired,
};

export default SideBar;

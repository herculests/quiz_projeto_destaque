import React, { useState, useEffect } from 'react';
import {
    Row,
    Menu,
    Avatar,
    Switch,
    Layout,
    Dropdown,
} from 'antd';
import PropTypes from 'prop-types';
import {
    DownOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LeftOutlined,
} from '@ant-design/icons';

import { Text } from '../../typography';
import User from '../../../classes/user';
import { getCurrentTheme } from '../../../utils/theme-switcher';
import { getCurrentLanguage, changeLanguage, languages } from '../../languages/Language';

import './index.less';

const Header = props => {
    const {
        collapsed,
        changeTheme,
        changeCollapsed,
    } = props;

    const language = getCurrentLanguage();

    const [user, setUser] = useState({});
    const [visible, setVisible] = useState(false);
    const [widthPage, setWidthPage] = useState(window.innerWidth);
    const [themeColor, setThemeColor] = useState(getCurrentTheme() === 'dark');

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidthPage(window.innerWidth);
        });
    }, []);

    useEffect(() => {
        const {
            first_name: name,
            profile_photo: photo,
        } = User.getUser();

        setUser({
            name,
            profile_photo: photo,
        });
    }, []);

    const menu = (
        <Menu className="header-menu-dropdown" expandIcon={[]}>

            <Menu.Item
                onClick={() => setThemeColor(!themeColor)}
            >
                <Switch
                    size="small"
                    checked={themeColor}
                    onChange={checked => {
                        setThemeColor(checked);
                    }}
                />

                <Text
                    translate
                    style={{ marginLeft: 3 }}
                    value="components.layout.header.colorTheme"
                />
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
                className="menu-key-logout"
                onClick={() => User.doLogout()}
            >
                <LogoutOutlined />

                <Text
                    translate
                    value="components.layout.header.logout"
                />
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        const currentTheme = getCurrentTheme() === 'dark';

        if (themeColor !== currentTheme) {
            setTimeout(() => {
                changeTheme();
            }, 500);
        }
    }, [themeColor]);

    return (
        <Layout.Header theme="light" className="site-layout-header-background">
            <Row
                align="middle"
                justify="space-between"
                className="header-row-resposive"
            >
                { collapsed
                    ? (
                        <MenuUnfoldOutlined
                            className="trigger"
                            style={{ fontSize: 18 }}
                            onClick={changeCollapsed}
                        />
                    ) : (
                        <MenuFoldOutlined
                            className="trigger"
                            style={{ fontSize: 18 }}
                            onClick={changeCollapsed}
                        />
                    )
                }

                <div
                    style={{
                        display:
                            !collapsed && widthPage <= 460
                                ? 'none'
                                : 'flex',
                    }}
                >
                    <Dropdown
                        overlay={menu}
                        visible={visible}
                        placement="bottomRight"
                        onVisibleChange={flag => setVisible(flag)}
                    >
                        <div
                            className="noselect dropdown-wrapper"
                        >
                            <Text
                                strong
                                value="Olá Henrique"
                                // value={user.name}
                                className="text-ellipsis"
                                style={{
                                    height: 64,
                                    marginLeft: 8,
                                    fontSize: 25,
                                    verticalAlign: 'bottom',
                                }}
                            />

                            <DownOutlined
                                style={{ marginLeft: 5 }}
                            />
                        </div>
                    </Dropdown>
                </div>
            </Row>
        </Layout.Header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    changeTheme: PropTypes.func.isRequired,
    changeCollapsed: PropTypes.func.isRequired,
};

export default Header;

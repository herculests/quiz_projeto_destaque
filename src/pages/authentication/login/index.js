import React, { useEffect, useState } from 'react';
import {
    Row,
    Form,
    Modal,
    Button,
} from 'antd';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import User from '../../../classes/user';

import logo from '../../../../assets/images/logo-pro-solus.png';

import InputText from '../../../components/inputs/InputText';
import InputPassword from '../../../components/inputs/InputPassword';
import { Text, Title } from '../../../components/typography';

import loginController from '../../../classes/controllers/login';


const buttonStyle = {
    width: '100%',
    marginTop: 10,
    letterSpacing: 1,
};

const LoginPage = props => {
    const {
        t,
    } = props;

    const [loading, setLoading] = useState(false);
    const [controller] = useState(loginController(setLoading));


    const [form] = Form.useForm();

    const redirectMenu = () => {
        window.location = '/inicio';
    };

    useEffect(() => {
        User.setPageTitle('Entrar');
    }, []);

    const getLoginScreen = () => (
        <>
            <Row>
                <Title
                    translate
                    level={2}
                    style={{ marginBottom: 0 }}
                    value={t('pages.login.titleInfo')}
                />

                <Text
                    style={{ minWidth: 300 }}
                    translate
                    type="secondary"
                    value={t('pages.login.textInfo')}
                />
            </Row>

            <Form
                form={form}
                layout="vertical"
                // onFinish={controller.login}
                onFinish={redirectMenu}
                name="normal_login"
                style={{ marginTop: 30 }}
            >
                <InputText
                    validation
                    form={form}
                    size="large"
                    name="email"
                    disabled={loading}
                    label={t('pages.login.labelInputCredentials')}
                    placeholder={t('pages.login.placeholderInputCredentials')}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                />

                <InputPassword
                    validation
                    form={form}
                    size="large"
                    name="password"
                    disabled={loading}
                    label={t('pages.login.labelInputPassword')}
                    placeholder="••••••"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                />

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="button-gradient"
                    style={buttonStyle}
                >
                    {t('pages.login.buttonConfirm')}
                </Button>
            </Form>
        </>
    );

    return (
        <>
            <img
                style={{
                    height: 50,
                    cursor: 'auto',
                }}
                src={logo}
                alt="Logo Quiz"
            />

            <Modal
                visible
                centered
                mask={false}
                footer={null}
                closable={false}
                className="account-area-modal-layout"
            >
                {getLoginScreen()}
            </Modal>
        </>
    );
};

LoginPage.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(LoginPage);

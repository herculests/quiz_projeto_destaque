import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { SearchOutlined } from '@ant-design/icons';

import { getParams } from '../../../utils/QueryController';
import InputText from '../../../components/inputs/InputText';
import RangePicker from '../../../components/date-picker/RangePicker';
import Select from '../../../components/inputs/Select';


const MediasFilter = ({
    t,
    form,
}) => {
    useEffect(() => {
        form.setFieldsValue(getParams());
    }, []);

    const styleFilters = { padding: '0 10px' };

    const optionsUsersType = [
        {
            value: 'ADMIN',
            title: t('pages.users.page.table.usersType.admin'),
        },
        {
            value: 'COMMON',
            title: t('pages.users.page.table.usersType.common'),
        },
    ];

    const optionsStatus = [
        {
            value: true,
            title: t('pages.users.filter.selectActive'),
        },
        {
            value: false,
            title: t('pages.users.filter.selectInactive'),
        },
    ];

    return (
        <Row>
            <Col style={styleFilters}>
                <InputText
                    form={form}
                    prefix={<SearchOutlined />}
                    name="name"
                    label={t('pages.users.filter.labelName')}
                    placeholder={t('pages.users.filter.placeholderName')}
                />
            </Col>
            <Col style={styleFilters}>
                <InputText
                    form={form}
                    prefix={<SearchOutlined />}
                    name="document"
                    label={t('pages.users.filter.labelDocument')}
                    placeholder={t('pages.users.filter.placeholderDocument')}
                />
            </Col>
            <Col style={styleFilters}>
                <InputText
                    form={form}
                    prefix={<SearchOutlined />}
                    name="phone"
                    label={t('pages.users.filter.labelPhone')}
                    placeholder={t('pages.users.filter.placeholderPhone')}
                />
            </Col>
            <Col style={styleFilters}>
                <InputText
                    form={form}
                    prefix={<SearchOutlined />}
                    name="email"
                    label={t('pages.users.filter.labelEmail')}
                    placeholder={t('pages.users.filter.placeholderEmail')}
                />
            </Col>
            <Col style={styleFilters}>
                <Select
                    form={form}
                    name="typeUser"
                    label={t('pages.users.filter.labelTypeUser')}
                    placeholder={t('pages.users.filter.placeholderTypeUser')}
                    options={optionsUsersType}
                    style={{ minWidth: 199 }}
                />
            </Col>
            <Col style={styleFilters}>
                <Select
                    form={form}
                    name="status"
                    label={t('pages.users.filter.labelStatus')}
                    placeholder={t('pages.users.filter.placeholderStatus')}
                    options={optionsStatus}
                    style={{ minWidth: 199 }}
                />
            </Col>
            <Col style={styleFilters}>
                <RangePicker
                    form={form}
                    name="date"
                    className="search-input"
                    label={t('pages.users.filter.labelDate')}
                />
            </Col>
        </Row>
    );
};

MediasFilter.propTypes = {
    t: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
};

export default withTranslation('common')(MediasFilter);

import React from 'react';
import { Spin } from 'antd';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingContainer = props => {
    const {
        title,
        loading,
        children,
        translate,
    } = props;

    return (
        <Spin
            spinning={loading}
            tip={translate ? i18next.t(title) : title}
            indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
        >
            {children}
        </Spin>
    );
};

LoadingContainer.defaultProps = {
    loading: true,
    translate: true,
    title: 'components.loading.loading',
};

LoadingContainer.propTypes = {
    title: PropTypes.string,
    loading: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
    ]),
    translate: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
};

export default LoadingContainer;

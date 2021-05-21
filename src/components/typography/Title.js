import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const Title = ({
    t,
    value,
    translate,
    ...otherProps
}) => (
    <Typography.Title {...otherProps}>
        { translate ? t(value) : value }
    </Typography.Title>
);

Title.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    translate: PropTypes.bool,
    t: PropTypes.func.isRequired,
};

Title.defaultProps = {
    value: '',
    translate: false,
};

export default withTranslation('common')(Title);

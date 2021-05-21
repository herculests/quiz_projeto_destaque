import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const Text = ({
    t,
    value,
    translate,
    ...otherProps
}) => (
    <Typography.Text {...otherProps}>
        { translate ? t(value) : value }
    </Typography.Text>
);

Text.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    translate: PropTypes.bool,
    t: PropTypes.func.isRequired,
};

Text.defaultProps = {
    value: '',
    translate: false,
};

export default withTranslation('common')(Text);

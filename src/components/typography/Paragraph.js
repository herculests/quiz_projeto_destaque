import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const Paragraph = ({
    t,
    value,
    translate,
    ...otherProps
}) => (
    <Typography.Paragraph {...otherProps}>
        { translate ? t(value) : value }
    </Typography.Paragraph>
);

Paragraph.defaultProps = {
    value: '',
    translate: false,
};

Paragraph.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    translate: PropTypes.bool,
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Paragraph);

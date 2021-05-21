import React from 'react';
import { Button } from 'antd';
import PropType from 'prop-types';

import './DefaultButton.less';

const DefaultButton = ({
    type,
    danger,
    green,
    onClick,
    children,
    className,
    ...otherProps
}) => (
    <Button
        {...otherProps}
        type={type}
        danger={danger}
        onClick={onClick}
        className={`default-button ${className} ${green ? 'green-button' : ''}`}
    >
        {children}
    </Button>
);

DefaultButton.defaultProps = {
    children: '',
    green: false,
    danger: false,
    type: 'primary',
    className: '',
    onClick: () => {},
};

DefaultButton.propTypes = {
    green: PropType.bool,
    type: PropType.string,
    danger: PropType.bool,
    onClick: PropType.func,
    className: PropType.string,
    children: PropType.oneOfType([
        PropType.string,
        PropType.number,
        PropType.object,
        PropType.array,
    ]),
};

export default DefaultButton;

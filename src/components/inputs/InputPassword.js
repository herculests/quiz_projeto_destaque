import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import { withTranslation } from 'react-i18next';
import Normalizer from '../../utils/Normalizer';
import { requiredField } from '../../utils/InputRules';

const InputPassword = props => {
    const {
        t,
        max,
        name,
        form,
        label,
        extra,
        normalize,
        myOwnRules,
        validation,
        otherRules,
        ...otherProps
    } = props;


    let rules = [];

    if (validation) {
        rules.push(requiredField);
        rules.push({
            min: 6,
            message: t('components.inputs.inputPassword.minPassword'),
        });

        if (otherRules.length > 0) {
            rules.push(...otherRules);
        }

        if (myOwnRules.length > 0) {
            rules = myOwnRules;
        }

        rules = rules.map(e => ({
            ...e,
            message: t(e.message),
        }));
    }

    const normalizer = v => {
        let formatedValue = Normalizer.removesMultiplesSpacesForOne(v);

        formatedValue = normalize(formatedValue);
        return formatedValue;
    };

    if (form) {
        return (
            <Form.Item
                name={name}
                label={label}
                extra={extra}
                validateFirst
                normalize={normalizer}
                rules={validation ? rules : ''}
            >
                <Input.Password
                    {...otherProps}
                    maxLength={max}
                />
            </Form.Item>
        );
    }

    return (
        <Input.Password
            {...otherProps}
            maxLength={max}
        />
    );
};

InputPassword.defaultProps = {
    max: 12,
    name: '',
    extra: '',
    form: null,
    label: null,
    otherRules: [],
    myOwnRules: [],
    validation: false,
    normalize: value => value,
};

InputPassword.propTypes = {
    max: PropTypes.number,
    form: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    extra: PropTypes.string,
    normalize: PropTypes.func,
    validation: PropTypes.bool,
    otherRules: PropTypes.array,
    myOwnRules: PropTypes.array,
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(InputPassword);

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import { withTranslation } from 'react-i18next';
import Normalizer from '../../utils/Normalizer';
import { minRule, requiredField } from '../../utils/InputRules';

const InputText = props => {
    const {
        t,
        max,
        name,
        form,
        extra,
        label,
        normalize,
        validation,
        otherRules,
        myOwnRules,
        ...otherProps
    } = props;

    let rules = [];

    if (validation) {
        rules = [
            requiredField,
            minRule,
            {
                validator: (_, value) => {
                    if (!(value || '').trim()) {
                        return Promise.reject(t('components.inputs.inputText.required'));
                    }
                    return Promise.resolve();
                },
            },
        ];

        if (otherRules.length > 0) {
            rules.push(...otherRules);
        }

        rules = rules.map(e => ({
            ...e,
            message: t(e.message),
        }));

    }

    if (myOwnRules.length > 0) {
        rules = myOwnRules;
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
                rules={rules}
                validateFirst
                normalize={normalizer}
            >
                <Input
                    {...otherProps}
                    maxLength={max}
                />
            </Form.Item>
        );
    }

    return (
        <Input
            {...otherProps}
            maxLength={max}
        />
    );
};

InputText.defaultProps = {
    max: 100,
    name: '',
    extra: '',
    form: null,
    label: null,
    otherRules: [],
    myOwnRules: [],
    validation: false,
    normalize: value => value,
};

InputText.propTypes = {
    max: PropTypes.number,
    form: PropTypes.object,
    name: PropTypes.string,
    extra: PropTypes.string,
    label: PropTypes.string,
    normalize: PropTypes.func,
    validation: PropTypes.bool,
    otherRules: PropTypes.array,
    myOwnRules: PropTypes.array,
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(InputText);

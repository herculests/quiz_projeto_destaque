import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
    Form,
    Select as SelectAnt,
} from 'antd';

import { requiredField } from '../../utils/InputRules';
import './Select.less';

/**
* @description Select input for forms that use AntDesign.
* @property {string} [label=null] Label over the input.
* @property {string} [extra=''] Extra props for Form.Item.
* @property {array} [myOwnRules=[]] Specific rules in the input.
* @property {array} [otherRules=[]] More rules to add to the rules.
* @property {bool} [validation=false] If the form will be validated.
* @property {array} options An object array with { title, value, disabled }.
* @property {string} name Name of the key that will be returned in the object.
* @since 05/04/2020
* @example
* <Select
* validation
* name="example"
* label="Example"
* options={[{ title: 'A', value: 'A', disabled: true }]}
* />
*/

const Select = props => {
    const {
        t,
        name,
        extra,
        label,
        options,
        validation,
        otherRules,
        myOwnRules,
        filterOption,
        ...otherProps
    } = props;

    let rules = [];

    if (validation) {
        rules.push(requiredField);

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

    const getSelectOptions = (mountedOption, option) => {
        const {
            value,
            title,
            disabled = false,
            ...otherPropsOption
        } = option;

        return ([
            ...mountedOption,
            <SelectAnt.Option
                {...otherPropsOption}
                value={value}
                disabled={disabled}
                key={`${value}_${Math.random()}`}
            >
                {title}
            </SelectAnt.Option>,
        ]);
    };

    const getOptions = values => values.reduce(getSelectOptions, []);

    return (
        <Form.Item
            name={name}
            label={label}
            extra={extra}
            rules={rules}
            validateStatus={options.length}
        >
            <SelectAnt
                optionFilterProp="children"
                filterOption={filterOption}
                style={{ textAlign: 'left' }}
                {...otherProps}
            >
                {getOptions(options)}
            </SelectAnt>
        </Form.Item>
    );
};

Select.defaultProps = {
    extra: '',
    name: '',
    label: null,
    options: [],
    otherRules: [],
    myOwnRules: [],
    validation: false,
    filterOption: (input, option) => {
        const { children, value } = (option || {}).props;
        return (children || value).toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
};

Select.propTypes = {
    name: PropTypes.string,
    extra: PropTypes.string,
    label: PropTypes.string,
    validation: PropTypes.bool,
    otherRules: PropTypes.array,
    myOwnRules: PropTypes.array,
    filterOption: PropTypes.func,
    t: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
};

export default withTranslation('common')(Select);

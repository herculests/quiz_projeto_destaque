import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import { withTranslation } from 'react-i18next';
import { requiredField } from '../../utils/InputRules';
import DateController from '../../utils/DateController';

import './index.less';

const getRanges = (format, t) => {
    const week = DateController.getPastDaysInterval(7, format);
    const today = DateController.getPastDaysInterval(0, format);
    const month = DateController.getCurrentMonthInterval(format);
    const lastMonth = DateController.getPastMonthInterval(1, format);

    return {
        [t('components.datePicker.rangerPicker.today')]: [
            moment(today[0], format),
            moment(today[1], format),
        ],
        [t('components.datePicker.rangerPicker.week')]: [
            moment(week[0], format),
            moment(week[1], format),
        ],
        [t('components.datePicker.rangerPicker.month')]: [
            moment(month[0], format),
            moment(month[1], format),
        ],
        [t('components.datePicker.rangerPicker.lastMonth')]: [
            moment(lastMonth[0], format),
            moment(lastMonth[1], format),
        ],
    };
};

const RangePicker = props => {
    const {
        t,
        name,
        label,
        extra,
        showTime,
        otherRules,
        myOwnRules,
        validation,
        ...otherProps
    } = props;

    const format = showTime ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';

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

    return (
        <Form.Item
            name={name}
            label={label}
            extra={extra}
            rules={rules}
        >
            <DatePicker.RangePicker
                format={format}
                showTime={showTime}
                ranges={getRanges(format, t)}
                style={{ width: '100%' }}
                {...otherProps}
            />
        </Form.Item>
    );
};

RangePicker.defaultProps = {
    extra: '',
    label: null,
    otherRules: [],
    myOwnRules: [],
    showTime: false,
    validation: false,
};

RangePicker.propTypes = {
    label: PropTypes.string,
    extra: PropTypes.string,
    showTime: PropTypes.bool,
    validation: PropTypes.bool,
    otherRules: PropTypes.array,
    myOwnRules: PropTypes.array,
    t: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default withTranslation('common')(RangePicker);

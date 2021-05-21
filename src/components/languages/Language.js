import React from 'react';
import {
    Menu,
    Avatar,
    Dropdown,
} from 'antd';
import i18next from 'i18next';
import PropTypes from 'prop-types';

import ptBR from '../../../assets/images/ptBR.png';
import enUS from '../../../assets/images/enUS.png';
import esES from '../../../assets/images/esES.png';

import { Text } from '../typography';

export const languages = [{
    key: 'en-US',
    text: i18next.t('languages.enUS'),
    image: enUS,
}, {
    key: 'es-ES',
    text: i18next.t('languages.esES'),
    image: esES,
}, {
    key: 'pt-BR',
    text: i18next.t('languages.ptBR'),
    image: ptBR,
}];

export const getCurrentLanguage = () => {
    const lg = localStorage.getItem('i18nextLng');
    const langs = languages.map(e => e.key);

    switch (lg) {
        case 'en-US':
        case 'es-ES':
        case 'pt-BR':
            return languages[langs.indexOf(lg)];

        default:
            return languages[langs.indexOf('pt-BR')];
    }
};

export const changeLanguage = value => {
    localStorage.setItem('i18nextLng', value);
    window.location.reload();
};

const Language = props => {
    const {
        placement,
        ...otherProps
    } = props;

    return (
        <Dropdown
            placement={placement}
            overlay={(
                <Menu>
                    { languages.map(e => (
                        <Menu.Item
                            key={e.key}
                            onClick={() => changeLanguage(e.key)}
                        >
                            <Avatar
                                size={18}
                                src={e.image}
                                style={{ marginRight: 6 }}
                            />

                            <Text
                                value={e.text}
                                strong={e.key === getCurrentLanguage().key}
                            />
                        </Menu.Item>
                    ))}
                </Menu>
            )}
        >
            <Avatar
                size={40}
                {...otherProps}
            >
                <Avatar size={22} src={getCurrentLanguage().image} />
            </Avatar>
        </Dropdown>
    );
};

Language.defaultProps = {
    placement: 'bottomRight',
};

Language.propTypes = {
    placement: PropTypes.oneOf([
        'topLeft',
        'topRight',
        'topCenter',
        'bottomLeft',
        'bottomRight',
        'bottomCenter',
    ]),
};

export default Language;

import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';


import ptBr from 'antd/lib/locale-provider/pt_BR';
import enUs from 'antd/lib/locale-provider/en_US';
import esEs from 'antd/lib/locale-provider/es_ES';

import i18n from './i18n';
import Routes from './routes';


import '../assets/less/main.less';

const getLanguage = () => {
    const lg = localStorage.getItem('i18nextLng');
    let language;

    switch (lg) {
        case 'en-US':
            language = enUs;
            break;
        case 'es-ES':
            language = esEs;
            break;
        default:
            language = ptBr;
            break;
    }

    return language;
};

ReactDOM.render(
    <BrowserRouter>
        <I18nextProvider i18n={i18n}>
            <ConfigProvider locale={getLanguage()}>
                <Routes />
            </ConfigProvider>
        </I18nextProvider>
    </BrowserRouter>,
    document.getElementById('app-container'),
);

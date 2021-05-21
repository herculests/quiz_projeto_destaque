import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import ptBR from '../assets/locales/pt-BR/translation.json';
import enUS from '../assets/locales/en-US/translation.json';
import esEs from '../assets/locales/es-ES/translation.json';

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        interpolation: {
            escapeValue: false,
            formatSeparator: ',',
        },
        ns: ['common'],
        fallbackLng: 'pt-BR',
        debug: false,
        resources: {
            'pt-BR': { common: ptBR },
            'en-US': { common: enUS },
            'es-ES': { common: esEs },
        },
        react: { wait: true },
        defaultNS: 'common',
    });

export default i18next;

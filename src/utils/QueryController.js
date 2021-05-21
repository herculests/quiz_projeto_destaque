import { notification } from 'antd';

export const showGenericError = req => {
    const baseMessage = 'Por favor informe nosso suporte. Erro:';
    try {
        const { status = 0 } = ((req || {}).response || {});
        const { code = 'Internal' } = ((((req || {}).response || {}).data || {}).error || {});

        notification.warn({
            message: 'Ops! Ocorreu um erro inesperado.',
            description: `${baseMessage} ${code}, Status: ${status}`,
            duration: 7.0,
        });
    } catch (error) {
        notification.error({
            message: 'Ops! Ocorreu um erro inesperado.',
            description: `${baseMessage} Internal.`,
            duration: 7.0,
        });
    }
};

/**
* @param {object} data An object with field and type to be assembled.
* @description Used to set up the ordering of a given field,
* using the values of the object passed { field, type }
*/
export const getOrder = data => {
    const {
        field = '',
        type = '',
    } = data;

    let order = [];

    if (field) {
        order = [{ [field]: type }];
    }
    return order;
};

/**
* @description Used to get the params of the page in the URL.
*/
export const getParams = () => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('params')) {
        try {
            const urlDecoded = JSON.parse(urlParams.get('params'));
            if (typeof urlDecoded === 'object') {
                return urlDecoded;
            }

            return false;
        } catch (ex) {
            return false;
        }
    }

    return false;
};

/**
* @description Used to set the params of the page in the URL.
*/
export const setParams = (params = '') => {
    const paramsFormated = params ? JSON.stringify(params) : '';
    window.history.pushState('', '', `${window.location.pathname}?params=${paramsFormated}`);
};

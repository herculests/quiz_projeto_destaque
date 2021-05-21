import PropTypes from 'prop-types';
import { Result, Button } from 'antd';
import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';

import User from '../../classes/user';

const ErrorPage = props => {
    const {
        code,
    } = props;

    useEffect(() => {
        User.setPageTitle('Erro');
    }, []);

    return (
        <Result
            status={code}
            subTitle="Ops! A página que você procura não pôde ser encontrada."
            title="Erro!"
            extra={(
                <Button
                    type="primary"
                    onClick={() => window.history.go(-1)}
                >
                    Voltar para a página anterior
                </Button>
            )}
        />
    );
};

ErrorPage.propTypes = {
    code: PropTypes.string.isRequired,
};

export default withTranslation('common')(ErrorPage);

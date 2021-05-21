import { notification } from 'antd';
import { login } from '../../requests/login';
import User from '../../user';


export default setLoading => ({
    login: ({ email: user, password }) => Promise.resolve(true)
        .then(setLoading)
        .then(() => login({ credential: user, password }))
        .then(({ data: { token = '' } = {} }) => {
            User.setUser(token);
            window.location = '/inicio';
        })
        .catch(error => {
            let typeError = '';
            let descriptionError = '';

            if (error.response === undefined) {
                typeError = 'Falha na rede';
                descriptionError = 'Verifique sua conexão e tente novamente!';

            } else {
                typeError = 'Acesso não autorizado';
                descriptionError = 'Verifique seus dados e tente novamente!';
            }
            (
                notification.error({
                    message: typeError,
                    description: descriptionError,
                })

            );
        })
        .finally(() => setLoading(false)),
});

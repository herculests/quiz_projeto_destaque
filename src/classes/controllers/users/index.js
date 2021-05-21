import { notification } from 'antd';
import * as UsersRequests from '../../requests/users';
import SerializerUser from '../../serializer/user';

export default class UsersController {

    constructor(metadataSetter, dataSetter, paramsSetter, loadingSetter, usersSetter) {
        this.metadataSetter = metadataSetter;
        this.dataSetter = dataSetter;
        this.paramsSetter = paramsSetter;
        this.loadingSetter = loadingSetter;
        this.usersSetter = usersSetter;
    }

    getUsers(filter = {}) {
        this.loadingSetter(true);

        const tilesParams = {};

        if ((filter.filter || {}).created_at) {
            Object.assign(tilesParams, { filter: { created_at: filter.filter.created_at } });
        }

        return UsersRequests.getAllUsers(filter)
            .then(({ data = {} }) => {
                this.dataSetter(data);
                this.metadataSetter(data.metadata);
                this.paramsSetter({
                    total: (data.metadata.total || 0),
                    page: (data.metadata.page || 1),
                    limit: (data.metadata.limit || 20),
                    filter,
                });
            })
            .catch(() => {
                this.dataSetter({});
            })
            .finally(() => this.loadingSetter(false));
    }

    deleteUser = userId => {
        this.loadingSetter(true);
        return UsersRequests.deleteUser(userId)
            .catch(console.warn)
            .finally(() => this.loadingSetter(false));
    };

    editUser = (userId, data) => UsersRequests.editUser(userId, data)
        .then(() => notification.success({
            message: 'Usuario atualizado com sucesso!',
        }))
        .catch(error => {
            let typeError = '';
            let descriptionError = '';

            if (error.response === undefined) {
                typeError = 'Falha na rede';
                descriptionError = 'Verifique sua conexão e tente novamente!';

            } else {
                typeError = 'Problemas ao cadastrar usuario';
                descriptionError = 'Verifique seus dados e tente novamente!';
            }
            (
                notification.error({
                    message: typeError,
                    description: descriptionError,
                })

            );
        })

    createUser = data => UsersRequests.createUser(data)
        .then(() => notification.success({
            message: 'Usuario cadastrado com sucesso!',
        }))
        .catch(error => {
            let typeError = '';
            let descriptionError = '';

            if (error.response === undefined) {
                typeError = 'Falha na rede';
                descriptionError = 'Verifique sua conexão e tente novamente!';

            } else {
                typeError = 'Problemas ao cadastrar usuario';
                descriptionError = 'Verifique seus dados e tente novamente!';
            }
            (
                notification.error({
                    message: typeError,
                    description: descriptionError,
                })

            );
        })


        getUser = id => UsersRequests.getUser(id)
            .then(response => new SerializerUser(response))
            .catch(error => {
                let typeError = '';
                let descriptionError = '';

                if (error.response === undefined) {
                    typeError = 'Falha na rede';
                    descriptionError = 'Verifique sua conexão e tente novamente!';

                } else {
                    typeError = 'Problemas ao encontar usuario';
                    descriptionError = 'Verifique seus dados e tente novamente!';
                }
                (
                    notification.error({
                        message: typeError,
                        description: descriptionError,
                    })

                );
            })

}

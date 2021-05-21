import { notification } from 'antd';
import * as QuestionsRequests from '../../requests/users';
import SerializerQuestions from '../../serializer/questions';

export default class QuestionsController {

        getUser = id => QuestionsRequests.getQuestions(id)
            .then(response => new SerializerQuestions(response))
            .catch(error => {
                let typeError = '';
                let descriptionError = '';

                if (error.response === undefined) {
                    typeError = 'Falha na rede';
                    descriptionError = 'Verifique sua conexão e tente novamente!';

                } else {
                    typeError = 'Problemas ao carregar questões';
                }
                (
                    notification.error({
                        message: typeError,
                        description: descriptionError,
                    })

                );
            })

}

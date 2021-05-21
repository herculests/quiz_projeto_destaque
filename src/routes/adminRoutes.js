import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Inicio from '../pages/inicio';
import Perguntas from '../pages/perguntas';
import Quiz from '../pages/quiz';
import Ranking from '../pages/ranking';
import CriarPergunta from '../pages/perguntas/criarPergunta';

import { Error404 } from '../pages/error';

const AdminRoutes = props => {
    const {
        url,
        setKey,
    } = props;

    const renderRoute = (id, Component, otherProps) => {
        setKey(id);
        return (<Component {...otherProps} />);
    };

    return (
        <Switch>

            <Route
                exact
                path={`${url}`}
                render={prop => renderRoute('inicio', Inicio, prop)}
            />

            <Route
                exact
                path={`${url}inicio`}
                render={prop => renderRoute('inicio', Inicio, prop)}
            />

            <Route
                exact
                path={`${url}perguntas`}
                render={prop => renderRoute('perguntas', Perguntas, prop)}
            />

            <Route
                exact
                path={`${url}perguntas/criar_pergunta`}
                render={prop => renderRoute('criar_pergunta', CriarPergunta, prop)}
            />

            <Route
                exact
                path={`${url}quiz`}
                render={prop => renderRoute('quiz', Quiz, prop)}
            />

            <Route
                exact
                path={`${url}ranking`}
                render={prop => renderRoute('ranking', Ranking, prop)}
            />

            <Route
                path="/*"
                render={prop => renderRoute('', Error404, prop)}
            />

        </Switch>
    );
};

AdminRoutes.propTypes = {
    url: PropTypes.string.isRequired,
    setKey: PropTypes.func.isRequired,
};

export default AdminRoutes;

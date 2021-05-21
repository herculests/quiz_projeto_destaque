import React from 'react';
import ErrorPage from './Page';

const Error403 = () => <ErrorPage code="403" />;
const Error404 = () => <ErrorPage code="404" />;
const Error500 = () => <ErrorPage code="500" />;

export {
    Error403,
    Error404,
    Error500,
};

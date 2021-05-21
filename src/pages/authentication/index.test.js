import React from 'react';
import Enzyme from 'enzyme';
import AuthenticationPage from './index';

const getDefaultComponent = (type = 'shallow') => Enzyme[type](
    <AuthenticationPage />,
);

describe('AuthenticationPage', () => {
    it('Should render without error', () => {
        const component = getDefaultComponent();
        expect(component).toMatchSnapshot();
    });
});

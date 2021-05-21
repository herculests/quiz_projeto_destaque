import React from 'react';
import Enzyme from 'enzyme';
import Login from './index';

const getDefaultComponent = (type = 'shallow') => Enzyme[type](
    <Login />,
);

describe('LoginPage', () => {
    it('Should render without error', () => {
        const component = getDefaultComponent();
        expect(component).toMatchSnapshot();
    });
});

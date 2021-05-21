import React from 'react';
import Enzyme from 'enzyme';
import Upload from './index';

const getDefaultComponent = (type = 'shallow') => Enzyme[type](
    <Upload />
);

describe('Upload', () => {
    it('Should render without error', () => {
        const component = getDefaultComponent();
        expect(component).toMatchSnapshot();
    });
});

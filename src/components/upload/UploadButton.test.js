import React from 'react';
import Enzyme from 'enzyme';
import UploadButton from './index';

const getDefaultComponent = (type = 'shallow') => Enzyme[type](
    <UploadButton />
);

describe('UploadButton', () => {
    it('Should render without error', () => {
        const component = getDefaultComponent();
        expect(component).toMatchSnapshot();
    });
});

import React from 'react';
import TextComponent from './Text';
import TitleComponent from './Title';
import ParagraphComponent from './Paragraph';

const Text = props => <TextComponent {...props} />;
const Title = props => <TitleComponent {...props} />;
const Paragraph = props => <ParagraphComponent {...props} />;

export {
    Text,
    Title,
    Paragraph,
};

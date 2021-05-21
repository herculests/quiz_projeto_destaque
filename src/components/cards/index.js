import React from 'react';
import PropType from 'prop-types';
import { Card, Row, Col } from 'antd';

import { Text, Title } from '../typography';

import './DefaultCard.less';

const DefaultCard = props => {
    const {
        icon,
        title,
        children,
        ...otherProps
    } = props;

    return (
        <Card
            className="default-card-component card-shadowable"
            {...otherProps}
        >
            <Row
                style={{ margin: 0 }}
                justify={icon ? 'space-between' : 'start'}
            >
                <Col style={{ width: icon ? 'auto' : '100%' }}>
                    { title && (
                        <Row className="title">
                            <Text
                                value={title}
                                type="secondary"
                            />
                        </Row>
                    )}

                    <Row>
                        {children}
                    </Row>
                </Col>

                { icon && (
                    <Row align="middle">
                        <Title
                            level={3}
                            value={icon}
                            style={{
                                opacity: 0.7,
                                marginBottom: 0,
                                marginRight: 6,
                            }}
                        />
                    </Row>
                )}
            </Row>
        </Card>
    );
};

DefaultCard.defaultProps = {
    icon: '',
    title: '',
    image: '',
    subtitle: '',
    children: '',
    titlebody: () => {},
    translate: true,
};

DefaultCard.propTypes = {
    icon: PropType.node,
    title: PropType.string,
    image: PropType.string,
    titlebody: PropType.func,
    translate: PropType.bool,
    subtitle: PropType.string,
    children: PropType.oneOfType([
        PropType.string,
        PropType.number,
        PropType.object,
        PropType.array,
    ]),
};

export default DefaultCard;

import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Card,
    Affix,
    Layout,
    Alert,
    Radio,
    Button,
    Progress,
} from 'antd';
import { withTranslation } from 'react-i18next';

import PageContainer from '../../components/container';
import { Title, Text } from '../../components/typography';
import LoadingContainer from '../../components/loading/LoadingContainer';
import './index.less';
import imgRobo from '../../../assets/images/segueLinha.jpg';

const QuizPage = () => {
    const [alertStatus, setAlertStatus] = useState([['info', 'info', 'info', 'info'], ['info', 'info', 'info', 'info'], ['info', 'info', 'info', 'info'], ['info', 'info', 'info', 'info'], ['info', 'info', 'info', 'info'], ['info', 'info', 'info', 'info'], ['info', 'info', 'info', 'info'], ['info', 'info', 'info', 'info'], ['info', 'info', 'info', 'info'], ['info', 'info', 'info', 'info']]);

    const listData = [];
    for (let i = 1; i < 11; i++) {
        listData.push({
            title: `${i}. Normalmente, quantos litros de sangue uma pessoa tem? Em média, quantos são retirados numa doação de sangue?`,
            image: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
            respostas: {
                resposta1: '',
                resposta2: '',
                resposta3: '',
                resposta4: '',
            },
        });
    }

    const redirectMenu = () => {
        window.location = '/ranking';
    };

    const responseText = () => (
        <Radio.Group style={{ width: '100%' }}>
            <Row style={{ marginTop: 30, marginRight: 20 }} justify="space-around">
                <Col xxl={5}>
                    <Alert
                        message={(
                            <Radio value={1}>
                                <Text
                                    value="Entre 4/6 litros."
                                />
                            </Radio>
                        )}
                        type="info"
                    />
                </Col>
                <Col xxl={5}>
                    <Alert
                        message={(
                            <Radio value={2}>
                                <Text
                                    value="Tem 10 litros."
                                />
                            </Radio>
                        )}
                        type="info"
                    />
                </Col>
                <Col xxl={5}>
                    <Alert
                        message={(
                            <Radio value={3}>
                                <Text
                                    value="Tem 7 litros."
                                />
                            </Radio>
                        )}
                        type="info"
                    />
                </Col>
                <Col xxl={5}>
                    <Alert
                        message={(
                            <Radio value={4}>
                                <Text
                                    value="Tem 0,5 litros."
                                />
                            </Radio>
                        )}
                        type="info"
                    />
                </Col>
            </Row>
        </Radio.Group>
    );

    const responseImg = (dataQuiz, index) => (
        <Radio.Group style={{ width: '100%' }}>
            <Row SPAN={24} style={{ marginTop: 30, marginRight: 20 }} justify="space-around">
                <Col xxl={5}>
                    <Alert
                        message={(
                            <Radio value={1}>
                                <img
                                    width="100%"
                                    alt="logo"
                                    src={imgRobo}
                                />
                            </Radio>

                        )}
                        type={(alertStatus[index])[0]}
                    />
                </Col>
                <Col xxl={5}>
                    <Alert
                        message={(
                            <Radio value={2}>
                                <img
                                    width="100%"
                                    alt="logo"
                                    src={dataQuiz.image}
                                />
                            </Radio>

                        )}
                        type={(alertStatus[index])[1]}
                    />
                </Col>
                <Col xxl={5}>
                    <Alert
                        message={(
                            <Radio value={3}>
                                <img
                                    width="100%"
                                    alt="logo"
                                    src={dataQuiz.image}
                                />
                            </Radio>

                        )}
                        type={(alertStatus[index])[2]}
                    />
                </Col>
                <Col xxl={5}>
                    <Alert
                        message={(
                            <Radio value={4}>
                                <img
                                    width="100%"
                                    alt="logo"
                                    src={dataQuiz.image}
                                />
                            </Radio>

                        )}
                        type={(alertStatus[index])[3]}
                    />
                </Col>
            </Row>
        </Radio.Group>
    );

    const renderPendency = (dataQuiz, index) => (

        <Card
            style={{ marginTop: 16 }}
            className="default-card-component card-shadowable home-screen-card"
        >
            <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Col xxl={24}>
                    <Title
                        level={5}
                        style={{ marginBottom: 0, width: '100%' }}
                        value={dataQuiz.title}
                    />
                </Col>
                <Col xxl={24} align="middle">
                    <Col xxl={9} style={{ marginTop: 30 }}>
                        <img
                            width="100%"
                            alt="logo"
                            src={imgRobo}
                        />
                    </Col>
                </Col>
                <Col xxl={24} style={{ marginBottom: 30 }}>
                    {(index > 1)
                        ? responseImg(dataQuiz, index)
                        : responseText()
                    }
                </Col>
            </Row>
        </Card>
    );

    const renderQuiz = () => (
        <Card
            className="default-card-component card-shadowable home-screen-card"
            style={{ marginTop: 16 }}
            type="inner"
            title={(
                <span>
                    <Title
                        level={3}
                        style={{ marginBottom: 0, width: '100%', color: 'white' }}
                        value="Vamos testar seus conhecimentos"
                    />
                    <Text
                        style={{
                            marginBottom: 0, width: '100%', fontSize: 12, color: 'white',
                        }}
                        value="Assinale as alternativas corretas"
                    />
                </span>
            )}
        >
            {listData.map((dataQuiz, index) => (
                renderPendency(dataQuiz, index)
            ))}
            <Row
                justify="end"
                align="middle"
                style={{ marginTop: 30 }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => redirectMenu()}
                    // loading={loading}
                >
                    Terminei!!
                </Button>
            </Row>
        </Card>
    );


    return (
        <Layout
            style={{
                minHeight: '100vh',
            // background: `url(${background}) #EEF7FF no-repeat center`,
            }}
        >
            <Layout.Content>
                <PageContainer
                    title="Quiz projeto destaque"
                >
                    <LoadingContainer loading={false}>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Col xxl={3}>
                                {null}
                            </Col>
                            <Col xxl={17}>
                                {renderQuiz()}
                            </Col>
                            <Col xxl={4} style={{ display: 'flex', justifyContent: 'center', width: '70%' }}>
                                <Affix offsetTop={20}>
                                    <Progress
                                        strokeWidth={10}
                                        width={200}
                                        style={{ marginTop: 30 }}
                                        type="circle"
                                        strokeColor={{
                                            '0%': '#81D4FA',
                                            '100%': '#512DA8',
                                        }}
                                        percent={74}
                                    />
                                </Affix>
                            </Col>
                        </Row>
                    </LoadingContainer>
                </PageContainer>
            </Layout.Content>
        </Layout>
    );
};

export default withTranslation('common')(QuizPage);

import React from 'react';
import {
    Row,
    Col,
    Card,
    Affix,
    Layout,
    Alert,
    Radio,
    Progress,
} from 'antd';
import { withTranslation } from 'react-i18next';

import Language from '../../components/languages/Language';
import PageContainer from '../../components/container';
import { Title, Text } from '../../components/typography';
import LoadingContainer from '../../components/loading/LoadingContainer';
import './index.less';

const QuizPage = () => {
    const listData = [];
    for (let i = 1; i < 16; i++) {
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

    const responseText = () => (
        <Radio.Group style={{ width: '100%' }}>
            <Row style={{ marginTop: 30, marginRight: 20 }} justify="space-around">
                <Col xxl={5}>
                    <Alert
                        message={(
                            <Radio value={1}>
                                <Text
                                    value="Tem entre 4 a 6 litros. São retirados 450 mililitros"
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
                                    value="Tem 10 litros. São retirados 2 litros"
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
                                    value="Tem 7 litros. São retirados 1,5 litros"
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
                                    value="Tem 0,5 litros. São retirados 0,5 litros"
                                />
                            </Radio>
                        )}
                        type="info"
                    />
                </Col>
            </Row>
        </Radio.Group>
    );

    const responseImg = dataQuiz => (
        <Radio.Group style={{ width: '100%' }}>
            <Row SPAN={24} style={{ marginTop: 30, marginRight: 20 }} justify="space-around">
                <Col xxl={5}>
                    <Alert
                        message={(
                            <Radio value={1}>
                                <img
                                    width="100%"
                                    alt="logo"
                                    src={dataQuiz.image}
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
                                <img
                                    width="100%"
                                    alt="logo"
                                    src={dataQuiz.image}
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
                                <img
                                    width="100%"
                                    alt="logo"
                                    src={dataQuiz.image}
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
                                <img
                                    width="100%"
                                    alt="logo"
                                    src={dataQuiz.image}
                                />
                            </Radio>

                        )}
                        type="info"
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
                            src={dataQuiz.image}
                        />
                    </Col>
                </Col>
                <Col xxl={24} style={{ marginBottom: 30 }}>
                    {(index > 1)
                        ? responseImg(dataQuiz)
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
        >
           
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
                <Language className="fixed-widgets" />
                <PageContainer
                    title="Quiz projeto destaque"
                >
                    <LoadingContainer loading={false}>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Col xxl={16}>
                                {renderQuiz()}
                            </Col>
                        </Row>
                    </LoadingContainer>
                </PageContainer>
            </Layout.Content>
        </Layout>
    );
};

export default withTranslation('common')(QuizPage);

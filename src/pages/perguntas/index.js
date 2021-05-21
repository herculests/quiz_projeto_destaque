import React, { useState, useEffect } from 'react';
import {
    Col,
    Row,
    Card,
    Button,
    Divider,
    List,
    Space,
} from 'antd';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
    CheckOutlined,
    CloseOutlined,
    UsergroupAddOutlined,
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons';

import PageContainer from '../../components/container';
import LoadingContainer from '../../components/loading/LoadingContainer';
import { Title } from '../../components/typography';
import Text from '../../components/typography/Text';


const MediasPage = () => {
    const [loading, setLoading] = useState(false);


    const listData = [];
    for (let i = 0; i < 16; i++) {
        listData.push({
            id: i,
            title: 'Vamos ver oque você aprendeu!',
            description: 'Responda esse quiz sobre as coisas que você viu e aprendeu, vamos ver quanto você vai acertar.',
        });
    }

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const redirectMenu = () => {
        window.location = '/quiz';
    };

    const listForm = () => (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={listData}
            renderItem={item => (
                <Card
                    className="default-card-component card-shadowable"
                    style={{ marginBottom: 20 }}
                >
                    <List.Item
                        key={item.title}
                        // actions={[
                        //     <IconText icon={UsergroupAddOutlined} text="Respostas: 32" key="list-vertical-star-o" />,
                        //     <IconText icon={CheckOutlined} text="Questões corretas: 22" key="list-vertical-message" />,
                        //     <IconText icon={CloseOutlined} text="Questões incorretas: 18" key="list-vertical-like-o" />,
                        // ]}
                    >
                        <Row>
                            <Col span={22}>
                                <List.Item.Meta
                                    avatar={(
                                        <Col
                                            align="middle"
                                            style={{
                                                backgroundColor: 'rgba(81,45,168 ,0.5)',
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: 8,
                                            }}
                                        >
                                            <Title
                                                level={(item.id > 9) ? 3 : 2}
                                                style={{ color: 'white' }}
                                                value={`#${item.id}`}
                                            />
                                        </Col>
                                    )}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                            </Col>
                            <Col
                                span={2}
                                style={{ width: '100%' }}
                            >
                                <Col>
                                    <DeleteOutlined style={{ color: '#512DA8', fontSize: 20, marginRight: 10 }} />
                                    <Text
                                        style={{ color: 'red', fontSize: 17 }}
                                        value="Excluir"
                                    />
                                </Col>
                                <Col>
                                    <EditOutlined style={{ color: '#512DA8', fontSize: 20, marginRight: 10 }} />
                                    <Text
                                        style={{ color: '#512DA8', fontSize: 17 }}
                                        value="Editar"
                                    />
                                </Col>
                                <Col onClick={() => redirectMenu()}>
                                    <CheckOutlined style={{ color: '#512DA8', fontSize: 20, marginRight: 10 }} />
                                    <Text
                                        style={{ color: '#512DA8', fontSize: 17 }}
                                        value="Ativar"
                                    />
                                </Col>
                            </Col>
                        </Row>
                    </List.Item>
                </Card>
            )}
        />
    );

    const history = useHistory();

    return (
        <>
            <PageContainer
                onBack={null}
                title="Quizzes cadastrados"
            >
                <Row>
                    <Col span={24}>
                        <Row justify="end">
                            <Button
                                type="primary"
                                onClick={() => history.push('perguntas/criar_pergunta')}
                                style={{
                                    textAlign: 'center', justifyContent: 'end', marginTop: 29,
                                }}
                            >
                                Cadastrar novo Quiz
                            </Button>
                        </Row>
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <LoadingContainer loading={loading}>
                            {listForm()}
                        </LoadingContainer>
                    </Col>
                </Row>
            </PageContainer>
        </>
    );
};

export default withTranslation('common')(MediasPage);

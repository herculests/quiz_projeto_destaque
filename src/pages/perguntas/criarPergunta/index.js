import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Card,
    Form,
    Modal,
    Result,
    Input,
    Button,
    Divider,
    Radio,
    Alert,
} from 'antd';

import {
    DeleteOutlined,
    EditOutlined,
    ProfileOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { useHistory } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ImgCrop from 'antd-img-crop';

import Flickr from 'flickr-sdk';
import { Title, Text } from '../../../components/typography';
import PageContainer from '../../../components/container';
import InputText from '../../../components/inputs/InputText';
import Select from '../../../components/inputs/Select';
import Upload from '../../../components/upload';

// import CreateUsersController from '../../../classes/controllers/createUser';
import './createUser.less';


const { TextArea } = Input;


const FormWrapper = props => {
    const { children } = props;

    return (
        <Col xs={24} sm={24} lg={8} xl={8} md={12} {...props}>
            {children}
        </Col>
    );
};

FormWrapper.propTypes = {
    children: PropTypes.object.isRequired,
};

const Settings = props => {
    const {
        t,
        loading,
    } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalCreateForm, setModalCreateForm] = useState(true);
    const [logo, setLogo] = useState([]);
    const [request, setRequest] = useState(0);
    const [formTitle] = Form.useForm();
    const [form] = Form.useForm();
    const history = useHistory();
    const [nameQuiz, setNameQuiz] = useState('Nome do Quiz');
    const [descriptionQuiz, setDescriptionQuiz] = useState('Descrição');
    const [listData, setListData] = useState([]);

    // const listDataTeste = [];
    // for (let i = 1; i < 6; i++) {
    //     listDataTeste.push({
    //         title: `${i}. Normalmente, quantos litros de sangue uma pessoa tem? Em média, quantos são retirados numa doação de sangue?`,
    //         image: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    //         type: 1,
    //         resposta1: 'A) kldskfds dskjfskjdf sdfsd',
    //         resposta2: 'B) laksdasdlasd',
    //         resposta3: 'C) mdasaldalskdmasd',
    //         resposta4: 'D) alksdakskdals laskldkalsd',

    //     });
    // }

    // const [controller] = useState(
    //     new CreateUsersController(setModalVisible),
    // );

    const resetFields = () => formTitle.resetFields();

    // const requireCreateUser = () => {
    //     const values = form.getFieldsValue();

    //     controller.createUser({
    //         ...values,
    //         phone: values.phone && values.phone.length ? values.phone : null,
    //         document: values.document && values.document.length ? values.document : null,
    //     });

    // };

    // const [fileList, setFileList] = useState([]);

    // const onChange = ({ fileList: newFileList }) => {
    //     setFileList(newFileList);
    // };

    // const onPreview = async file => {
    //     let src = file.url;
    //     if (!src) {
    //         src = await new Promise(resolve => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file.originFileObj);
    //             reader.onload = () => resolve(reader.result);
    //         });
    //     }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     imgWindow.document.write(image.outerHTML);
    // };

    const optionsType = [
        {
            value: 1,
            title: 'Resposta objetiva com frases',
        },
        {
            value: 2,
            title: 'Resposta objetiva com imagens',
        },
    ];

    const beforeUploadImage = data => {
        console.log(data);
        const upload = new Flickr.Upload('3e4890864eb2ed920248583302ba5d04', data, {
            title: 'Works on MY machine!',
        });

        upload.then(res => {
            console.log('yay!', res.body);
        }).catch(err => {
            console.error('bonk', err);
        });
    };

    const responseImages = () => (
        <Col span={24} style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Divider />
            <Col span={24}>
                <Alert
                    message="Não se esqueça de selecionar a resposta correta"
                    type="info"
                    showIcon
                    style={{ marginBottom: 25 }}
                />
            </Col>
            <Col span={24}>
                <Form.Item
                    name="correctResponse"
                    rules={[{ required: true, message: 'Selecione uma alternativa correta!' }]}
                >
                    <Radio.Group style={{ display: 'flex', width: '100%' }}>
                        <Col span={6}>
                            <Card
                                className="default-card-component card-shadowable"
                                style={{ marginRight: 30 }}
                                title={<Radio value={1}>Imagem A</Radio>}
                                align="middle"
                            >
                                <ImgCrop rotate>
                                    <Upload
                                    // validation={!showCurrentImgs}
                                        name="response1"
                                        listType="picture-card"
                                        valuePropName="fileList"
                                        // getValueFromEvent={normFile}
                                        // beforeUpload={beforeUploadImage}
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        extra="Selecionar imagem"
                                        text={(
                                            logo.length === 0
                                                ? (
                                                    <>
                                                        <UploadOutlined />
                                                        <br />
                                                    </>
                                                ) : ''
                                        )}
                                    />
                                </ImgCrop>
                            </Card>
                        </Col>
                        <Col xxl={6}>
                            <Card
                                className="default-card-component card-shadowable"
                                style={{ marginRight: 30 }}
                                title={<Radio value={2}>Imagem B</Radio>}
                                align="middle"
                            >
                                <ImgCrop rotate>
                                    <Upload
                                    // validation={!showCurrentImgs}
                                        name="response2"
                                        listType="picture-card"
                                        valuePropName="fileList"
                                        // getValueFromEvent={normFile}
                                        // beforeUpload={beforeUploadImage}
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        extra="Selecionar imagem"
                                        text={(
                                            logo.length === 0
                                                ? (
                                                    <>
                                                        <UploadOutlined />
                                                        <br />
                                                    </>
                                                ) : ''
                                        )}
                                    />
                                </ImgCrop>
                            </Card>
                        </Col>
                        <Col xxl={6}>
                            <Card
                                className="default-card-component card-shadowable"
                                style={{ marginRight: 30 }}
                                title={<Radio value={3}>Imagem C</Radio>}
                                align="middle"
                            >
                                <ImgCrop rotate>
                                    <Upload
                                    // validation={!showCurrentImgs}
                                        name="response3"
                                        listType="picture-card"
                                        valuePropName="fileList"
                                        // getValueFromEvent={normFile}
                                        // beforeUpload={beforeUploadImage}
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        extra="Selecionar imagem"
                                        text={(
                                            logo.length === 0
                                                ? (
                                                    <>
                                                        <UploadOutlined />
                                                        <br />
                                                    </>
                                                ) : ''
                                        )}
                                    />
                                </ImgCrop>
                            </Card>
                        </Col>
                        <Col xxl={6}>
                            <Card
                                className="default-card-component card-shadowable"
                                style={{ marginRight: 30 }}
                                title={<Radio value={4}>Imagem D</Radio>}
                                align="middle"
                            >
                                <ImgCrop rotate>
                                    <Upload
                                    // validation={!showCurrentImgs}
                                        name="response4"
                                        listType="picture-card"
                                        valuePropName="fileList"
                                        // getValueFromEvent={normFile}
                                        // beforeUpload={beforeUploadImage}
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        extra="Selecionar imagem"
                                        text={(
                                            logo.length === 0
                                                ? (
                                                    <>
                                                        <UploadOutlined />
                                                        <br />
                                                    </>
                                                ) : ''
                                        )}
                                    />
                                </ImgCrop>
                            </Card>
                        </Col>
                    </Radio.Group>
                </Form.Item>
            </Col>
        </Col>
    );

    const responsePhrases = () => (
        <Col xxl={24}>
            <Divider />
            <Col span={24}>
                <Alert
                    message="Não se esqueça de selecionar a resposta correta"
                    type="info"
                    showIcon
                    style={{ marginBottom: 25 }}
                />
            </Col>
            <Form.Item
                name="correctResponse"
                rules={[{ required: true, message: 'Selecione uma alternativa correta!' }]}
            >
                <Radio.Group style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
                    <Col xxl={24}>
                        <Col xxl={12}>
                            <InputText
                                form={form}
                                name="response1"
                                label={
                                    <Radio value={1}>Resposta A</Radio>
                                }
                                showCount
                                maxLength={100}
                            />
                        </Col>
                    </Col>
                    <Col xxl={24}>
                        <Col xxl={12}>
                            <InputText
                                form={form}
                                name="response2"
                                label={
                                    <Radio value={2}>Resposta B</Radio>
                                }
                                showCount
                                maxLength={100}
                            />
                        </Col>
                    </Col>
                    <Col xxl={24}>
                        <Col xxl={12}>
                            <InputText
                                form={form}
                                name="response3"
                                label={
                                    <Radio value={3}>Resposta C</Radio>
                                }
                                showCount
                                maxLength={100}
                            />
                        </Col>
                    </Col>
                    <Col xxl={24}>
                        <Col xxl={12}>
                            <InputText
                                form={form}
                                name="response4"
                                label={
                                    <Radio value={4}>Resposta D</Radio>
                                }
                                showCount
                                maxLength={100}
                            />
                        </Col>
                    </Col>
                </Radio.Group>
            </Form.Item>
        </Col>
    );

    const renderCard = () => {
        if (request === 0) {
            return null;
        }
        if (request === 1) {
            return responsePhrases();
        }
        if (request === 2) {
            return responseImages();
        }
        return null;
    };

    const pushArray = data => {
        listData.push(data);
        console.log(listData);
    };

    const createQuestion = () => (
        <Form
            form={form}
            layout="vertical"
            onFinish={() => {
                pushArray(form.getFieldValue());
                setModalCreate(false);
                form.resetFields();
            }}
            name="createUser"
            style={{
                width: '100%',
                marginTop: 30,
            }}
        >
            <Row>
                <Col xxl={24}>
                    <Col xxl={19}>
                        <Form.Item
                            name="title"
                            form={form}
                            required
                            label="Titulo da pergunta"
                        >
                            <TextArea
                                placeholder="Descreva sua pergunta..."
                                required
                                showCount
                                maxLength={200}
                            />
                        </Form.Item>
                    </Col>
                </Col>
                <Divider />
                <ImgCrop rotate>
                    <Upload
                        // validation={!showCurrentImgs}
                        name="company_logo"
                        listType="picture-card"
                        valuePropName="fileList"
                        // getValueFromEvent={normFile}
                        beforeUpload={beforeUploadImage}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        label="Adicione uma imagem para a pergunta."
                        extra="Selecionar imagem"
                        text={(
                            logo.length === 0
                                ? (
                                    <>
                                        <UploadOutlined />
                                        <br />
                                    </>
                                ) : ''
                        )}
                    />
                </ImgCrop>
                <Divider />
                <Col xxl={10}>
                    <Select
                        validation
                        name="type"
                        label="Selecione o tipo de resposta"
                        placeholder="Selecionar..."
                        maxLength={100}
                        options={optionsType}
                        onChange={value => setRequest(value)}
                    />
                </Col>
                {renderCard()}
                <Divider />
            </Row>
            <Row
                justify="end"
                align="middle"
                style={{ marginTop: 30 }}
            >
                <Button
                    ghost
                    danger
                    onClick={() => {
                        form.resetFields();
                        setModalCreate(false);
                    }}
                    type="primary"
                    style={{ marginRight: 15 }}
                >
                    Cancelar
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                >
                    Cadastrar
                </Button>
            </Row>
            <Modal
                visible={modalVisible}
                title={[]}
                onOk={[]}
                onCancel={false}
                closeIcon={[]}
                footer={[]}
            >
                <Result
                    status="success"
                    title="Pergunta cadastrada com sucesso"
                    extra={[
                        <Button
                            type="primary"
                            key="console"
                            onClick={() => {
                                resetFields();
                                setModalVisible(false);
                            }}
                        >
                            Cadastrar nova pergunta
                        </Button>,
                        <Button
                            key="exit"
                            type="primary"
                            ghost
                            onClick={() => {
                                window.history.back();
                                setModalVisible(false);
                            }}
                        >
                            {t('pages.CreateEndEditUser.modal.buttonCreate')}
                        </Button>,
                    ]}
                />
            </Modal>
        </Form>
    );

    const responseText = dataQuiz => {
        const { correctResponse } = dataQuiz;
        return (
            <Row style={{ marginTop: 30, marginRight: 20 }}>
                <Col xxl={6}>
                    <Alert
                        style={{ marginRight: 10 }}
                        message={dataQuiz.response1}
                        type={(correctResponse === 1) ? 'success' : 'error'}
                        showIcon
                    />
                </Col>
                <Col xxl={6}>
                    <Alert
                        style={{ marginRight: 10 }}
                        message={dataQuiz.response1}
                        type={(correctResponse === 2) ? 'success' : 'error'}
                        showIcon
                    />
                </Col>
                <Col xxl={6}>
                    <Alert
                        style={{ marginRight: 10 }}
                        message={dataQuiz.response1}
                        type={(correctResponse === 3) ? 'success' : 'error'}
                        showIcon
                    />
                </Col>
                <Col xxl={6}>
                    <Alert
                        message={dataQuiz.response1}
                        type={(correctResponse === 4) ? 'success' : 'error'}
                        showIcon
                    />
                </Col>
            </Row>
        );
    };

    const responseImg = dataQuiz => (
        <Row style={{ marginTop: 30, marginRight: 20 }}>
            <Col xxl={6}>
                <Alert
                    style={{ marginRight: 10 }}
                    message={(
                        <img
                            width="100%"
                            alt="logo"
                            src={dataQuiz.image}
                        />
                    )}
                    type="success"
                    showIcon
                />
            </Col>
            <Col xxl={6}>
                <Alert
                    style={{ marginRight: 10 }}
                    message={(
                        <img
                            width="100%"
                            alt="logo"
                            src={dataQuiz.image}
                        />
                    )}
                    type="error"
                    showIcon
                />
            </Col>
            <Col xxl={6}>
                <Alert
                    style={{ marginRight: 10 }}
                    message={(
                        <img
                            width="100%"
                            alt="logo"
                            src={dataQuiz.image}
                        />
                    )}
                    type="error"
                    showIcon
                />
            </Col>
            <Col xxl={6}>
                <Alert
                    message={(
                        <img
                            width="100%"
                            alt="logo"
                            src={dataQuiz.image}
                        />
                    )}
                    type="error"
                    showIcon
                />
            </Col>
        </Row>
    );

    const renderPendency = (dataQuiz, index) => (

        <Card
            style={{ marginTop: 16 }}
            className="default-card-component card-shadowable home-screen-card"
        >
            <Row style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <Col xxl={18}>
                    <Title
                        level={5}
                        style={{ marginBottom: 0, width: '100%' }}
                        value={dataQuiz.title}
                    />
                    {(index > 1)
                        ? responseImg(dataQuiz)
                        : responseText(dataQuiz)
                    }
                    <Card
                        bordered={false}
                        style={{ width: '100%' }}
                        actions={[
                            <EditOutlined key="edit" />,
                            <DeleteOutlined key="setting" />,
                        ]}
                    />
                </Col>
                <Col xxl={6}>
                    <img
                        width="100%"
                        alt="logo"
                        src={dataQuiz.image}
                    />
                </Col>
            </Row>
        </Card>
    );

    const createForm = () => (
        <Form
            form={formTitle}
            layout="vertical"
            onFinish={() => {
                setModalCreateForm(false);
                setDescriptionQuiz(formTitle.getFieldValue('descriptionQuiz'));
                setNameQuiz(formTitle.getFieldValue('nameQuiz'));
            }}
            name="createQuiz"
            style={{
                width: '100%',
            }}
        >
            <InputText
                validation
                form={formTitle}
                name="nameQuiz"
                label={(
                    <Title
                        level={3}
                        translate
                        style={{ marginBottom: 0 }}
                        value="Nome do Quiz"
                    />
                )}
                showCount
                maxLength={100}
            />
            <InputText
                validation
                form={formTitle}
                name="descriptionQuiz"
                label="Descrição"
                showCount
                maxLength={100}
            />
            <Row
                justify="end"
                align="middle"
                style={{ marginTop: 30 }}
            >
                <Button
                    ghost
                    danger
                    onClick={() => history.goBack()}
                    type="primary"
                    style={{ marginRight: 15 }}
                >
                    Cancelar
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                >
                    Finalizar Quiz
                </Button>
            </Row>
        </Form>
    );

    return (
        <PageContainer
            loading={loading}
            title="Cadastre seu Quiz"
        >
            <Card
                className="default-card-component card-shadowable home-screen-card"
                style={{ backgroundColor: '#F5F5F5' }}
            >
                <Row style={{ display: 'flex', flexWrap: 'nowrap' }}>
                    <Col xxl={12} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        <ProfileOutlined style={{ color: '#512DA8', fontSize: 80, marginRight: 20 }} />
                        <Col>
                            <Title
                                level={1}
                                style={{ marginBottom: 10 }}
                                value={nameQuiz}
                            />
                            <Text
                                value={descriptionQuiz}
                            />
                        </Col>
                    </Col>
                    <Col xxl={12}>
                        <Row justify="end">
                            <EditOutlined
                                style={{ color: '#512DA8', fontSize: 30 }}
                                onClick={() => setModalCreateForm(true)}
                            />

                        </Row>
                    </Col>
                </Row>
            </Card>
            <Row justify="end">
                <Button
                    type="primary"
                    onClick={() => setModalCreate(true)}
                    style={{
                        textAlign: 'center', justifyContent: 'end', marginTop: 29,
                    }}
                >
                    Adicionar nova perguntas
                </Button>
            </Row>
            <Card
                style={{ marginTop: 16, backgroundColor: '#F5F5F5' }}
            >
                {listData.map((dataQuiz, index) => renderPendency(dataQuiz, index))}
            </Card>
            {(listData.length > 0)
                ? (
                    <Row
                        justify="end"
                        align="middle"
                        style={{ marginTop: 30 }}
                    >
                        <Button
                            ghost
                            danger
                            onClick={() => history.goBack()}
                            type="primary"
                            style={{ marginRight: 15 }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="primary"
                            // htmlType="submit"
                            onClick={() => history.goBack()}
                            loading={loading}
                        >
                            Finalizar Quiz
                        </Button>
                    </Row>
                ) : null}
            <Modal
                title="Criar formulario"
                width="30vw"
                visible={modalCreateForm}
                // onOk={() => setModalCreateForm(false)}
                onOk={[]}
                onCancel={[]}
                closeIcon={[]}
                footer={false}
            >
                {createForm()}
            </Modal>

            <Modal
                title="20px to Top"
                style={{ top: 20 }}
                width="50vw"
                visible={modalCreate}
                footer={false}
            >
                {createQuestion()}
            </Modal>
        </PageContainer>
    );
};

Settings.propTypes = {
    t: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default withTranslation('common')(Settings);

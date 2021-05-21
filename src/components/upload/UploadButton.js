import i18next from 'i18next';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Row,
    Form,
    Upload,
    message,
    Button,
} from 'antd';
import { withTranslation } from 'react-i18next';
import {
    DeleteOutlined,
    UploadOutlined,
    LoadingOutlined,
    FileImageOutlined,
} from '@ant-design/icons';
import { requiredField } from '../../classes/controllers/InputRules';
import ShowTip from '../show-tip';

import './UploadButton.less';

/**
 * @author Bruno Henrique
 * @description Upload button for forms that use AntDesign.
 * @property {string} [label=null] Label over the input.
 * @property {array} [myOwnRules=[]] Specific rules in the input.
 * @property {array} [otherRules=[]] More rules to add to the rules.
 * @property {object} [imageSize={
        width: '120px',
        height: '120px',
}] Image block size
 * @property {bool} [validation=false] If the form will be validated.
 * @property {string} name Name of the key that will be returned in the object.
 * @property {string} onChange Called when the value si changed.
 * @since 24/04/2020
 * @example
 * <UploadButton
 *      validation
 *      name="exmaple"
 *      label="Example"
 * />
 */

const UploadButton = props => {
    const {
        t,
        name,
        label,
        extra,
        onChange,
        showImage,
        validation,
        otherRules,
        myOwnRules,
        imageSize,
        initialValues,
    } = props;

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');

    useEffect(() => {
        if (initialValues.length) {
            setImage((initialValues[0] || {}).url);
            setImageName(`${((initialValues[0] || {}).name || '').substring(0, 14)}...`);
        }
    }, []);

    const removeImage = () => {
        setImage('');
        onChange(null);
        setImageName('');
    };

    let rules = [];

    if (validation) {
        rules.push(requiredField);

        if (otherRules.length > 0) {
            rules.push(...otherRules);
        }

        if (myOwnRules.length > 0) {
            rules = myOwnRules;
        }

        rules = rules.map(e => ({
            ...e,
            message: t(e.message),
        }));
    }

    const getBase64 = (img, callback) => {
        setLoading(true);
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.addEventListener('error', () => { setLoading(false); });
        reader.readAsDataURL(img);
    };

    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jepg';
        if (!isJpgOrPng) {
            message.error(t('input.rules.img_format'));
            return Promise.reject(new Error());
        }

        if (!showImage) {
            setImageName(`${file.name.substring(0, 14)}...`);
        }

        getBase64(file, newImage => {
            setLoading(false);
            setImage(newImage);
            onChange({
                file,
                uid: file.uid,
                name: file.name,
                thumbUrl: newImage,
            });
        });

        return Promise.resolve();
    };

    const getValueFromEvent = e => {
        const response = (e && e.fileList).map(file => {
            const value = file;

            value.status = 'done';
            value.response = 200;
            delete value.error;

            return value;
        });

        return response;
    };

    return (
        <Row gutter={6}>
            {
                showImage ? (
                    <Col sm={8} xm={13}>
                        <div className="upload-image-button" style={imageSize}>
                            {
                                image ? (
                                    <img src={image} alt="avatar" style={{ width: '100%' }} />
                                ) : (
                                    <div>
                                        {loading ? <LoadingOutlined style={{ fontSize: '26px' }} /> : <FileImageOutlined style={{ fontSize: '26px' }} />}
                                    </div>
                                )
                            }
                        </div>
                    </Col>
                ) : null
            }
            <Col xs={!showImage ? 24 : 16} sm={!showImage ? 24 : 16} xm={!showImage ? 24 : 11}>
                <Form.Item
                    name={name}
                    label={label}
                    className="upload-button"
                    rules={validation ? rules : ''}
                    defaultFileList={initialValues}
                    extra={extra ? t('utils.fileImageType') : ''}
                >
                    <Upload
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        getValueFromEvent={getValueFromEvent}
                        accept="image/png, image/jepg, image/jpg"
                    >
                        <Button block disabled={loading}>
                            {!showImage && image ? <FileImageOutlined /> : <UploadOutlined />}
                            {' '}
                            {t(!showImage && image ? imageName : 'utils.selectFile')}
                        </Button>
                    </Upload>
                </Form.Item>
            </Col>
            <Col
                sm={2}
                xm={2}
                style={{
                    alignSelf: 'center',
                    paddingLeft: 0,
                    paddingBottom: label ? 8 : 0,
                }}
            >
                <ShowTip
                    help={false}
                    text={i18next.t('utils.removePhoto')}
                >
                    <Button
                        danger
                        disabled={!image}
                        style={{ padding: 0 }}
                        onClick={removeImage}
                    >
                        <DeleteOutlined />
                    </Button>
                </ShowTip>
            </Col>
        </Row>
    );
};

UploadButton.defaultProps = {
    name: '',
    label: null,
    extra: true,
    otherRules: [],
    myOwnRules: [],
    validation: false,
    showImage: true,
    imageSize: {
        width: '120px',
        height: '120px',
    },
    initialValues: [],
    onChange: () => {},
};

UploadButton.propTypes = {
    extra: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    showImage: PropTypes.bool,
    validation: PropTypes.bool,
    imageSize: PropTypes.object,
    otherRules: PropTypes.array,
    myOwnRules: PropTypes.array,
    t: PropTypes.func.isRequired,
    initialValues: PropTypes.array,
};

export default withTranslation('common')(UploadButton);

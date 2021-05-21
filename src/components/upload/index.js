import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Upload as UploadAnt, Modal } from 'antd';
import { withTranslation } from 'react-i18next';
import { requiredField } from '../../utils/InputRules';

import './index.less';

/**
 * @author Vitor Camargo
 * @description Upload input for forms that use AntDesign.
 * @property {string} [label=null] Label over the input.
 * @property {string} [extra=''] Extra props for Form.Item.
 * @property {array} [myOwnRules=[]] Specific rules in the input.
 * @property {array} [otherRules=[]] More rules to add to the rules.
 * @property {bool} [validation=false] If the form will be validated.
 * @property {string} name Name of the key that will be returned in the object.
 * @property {func} getValueFromEvent Function called to normalize the field value.
 * @since 03/04/2020
 * @example
 * <Upload
 *      validation
 *      name="exmaple"
 *      label="Example"
 *      placeholder="Example"
 * />
 */

const Upload = props => {
    const {
        t,
        name,
        text,
        extra,
        label,
        fileList,
        validation,
        otherRules,
        myOwnRules,
        valuePropName,
        getValueFromEvent,
        ...otherProps
    } = props;

    const [isDragged, setIsDragged] = useState(false);
    const [previewImage, setPreviewImage] = useState({});
    const [previewVisible, setPreviewVisible] = useState(false);

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

    const getBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handlePreview = async file => {
        const preview = file.url || file.thumbUrl || await getBase64(file);

        if (file.type === 'application/pdf') {
            let html = '';
            html += '<html>';
            html += '<body style="margin: 0 !important; overflow: hidden;">';
            html += `<iframe width='100%' height='100%' src='${preview}'></iframe>`;
            html += '</body>';
            html += '</html>';

            const pdfWindow = window.open('', '_blank');
            pdfWindow.document.write(html);
            pdfWindow.document.close();
        } else {
            setPreviewVisible(true);
            setPreviewImage(preview);
        }
    };

    const handleCancel = () => {
        setPreviewVisible(false);
        setPreviewImage({});
    };

    return (
        <>
            <Form.Item
                name={name}
                label={label}
                extra={extra}
                fileList={fileList}
                valuePropName={valuePropName}
                rules={validation ? rules : ''}
                getValueFromEvent={getValueFromEvent}
                onDragOver={() => setIsDragged(true)}
                onDragLeave={() => setIsDragged(false)}
                className={
                    isDragged
                        ? 'component-upload component-upload-dragged'
                        : 'component-upload'
                }
            >
                <UploadAnt
                    onPreview={handlePreview}
                    {...otherProps}
                >
                    {text}
                </UploadAnt>
            </Form.Item>

            <Modal
                footer={null}
                onCancel={handleCancel}
                visible={previewVisible}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

Upload.defaultProps = {
    name: '',
    extra: '',
    label: null,
    fileList: [],
    otherRules: [],
    myOwnRules: [],
    validation: false,
    valuePropName: 'value',
    getValueFromEvent: value => value,
};

Upload.propTypes = {
    fileList: [],
    name: PropTypes.string,
    extra: PropTypes.string,
    label: PropTypes.string,
    validation: PropTypes.bool,
    otherRules: PropTypes.array,
    myOwnRules: PropTypes.array,
    t: PropTypes.func.isRequired,
    valuePropName: PropTypes.string,
    getValueFromEvent: PropTypes.func,
    text: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
};

export default withTranslation('common')(Upload);

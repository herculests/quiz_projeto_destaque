import React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import {
    Menu,
    Button,
    Dropdown,
} from 'antd';
import {
    FilePdfOutlined,
    FileTextOutlined,
    CaretDownOutlined,
    FileExcelOutlined,
} from '@ant-design/icons';

const DropdownExport = props => {
    const {
        returnFormat,
        ...otherProps
    } = props;

    const getDropButtons = () => (
        <Menu onClick={returnFormat}>
            <Menu.Item key="xlsx">
                <FileExcelOutlined />
                EXCEL
            </Menu.Item>

            <Menu.Item key="csv">
                <FileTextOutlined />
                CSV
            </Menu.Item>

            <Menu.Item key="pdf">
                <FilePdfOutlined />
                PDF
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={getDropButtons}>
            <Button
                {...otherProps}
                style={{ border: '0px', boxShadow: 'none' }}
            >
                {i18next.t('components.button.dropdown.exportReport')}
                <CaretDownOutlined />
            </Button>
        </Dropdown>
    );
};

DropdownExport.propTypes = {
    returnFormat: PropTypes.func.isRequired,
};

export default DropdownExport;

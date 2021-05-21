import React, { useState } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import DropdownExport from '../button/DropdownExport';

import './index.less';

const renderDataTableDefault = data => (
    data.map(item => {
        const key = item.id || Math.random();
        return { ...item, key };
    })
);

const GenericTable = props => {
    const {
        t,
        data,
        limit,
        scroll,
        loading,
        columns,
        toExport,
        activePage,
        expandedRow,
        onChangeSearch,
        renderDataTable,
        dataTotal: total,
        paginationOptions,
        ...otherProps
    } = props;

    const [pageQtd, setPageQtd] = useState(null);

    const filterReturn = (pagination, filter, sorter) => {
        const { current: page, pageSize } = pagination;

        setPageQtd(pageSize);

        let ordenation = {};
        if (sorter.order) {
            const { field, order } = sorter;
            const type = order === 'ascend' ? 'asc' : 'desc';
            ordenation = { field, type };
        }

        onChangeSearch({ page, limit: pageSize }, ordenation);
    };

    const getBottomExport = () => {
        if (toExport) {
            return (
                <span style={{ display: 'inherit', height: '0px' }}>
                    <DropdownExport
                        buttonStyle={{ position: 'relative', top: '-43px' }}
                        retornaFormato={toExport}
                    />
                </span>
            );
        }

        return null;
    };

    const getShowTotal = (totalItems, range) => {
        const prep = t('components.table.pagination.prep');
        const item = t('components.table.pagination.item');

        return `${range[0]}-${range[1]} ${prep} ${totalItems} ${item}`;
    };

    return (
        <div style={{ width: '100%' }}>
            <Table
                size="small"
                loading={loading}
                columns={columns}
                scroll={{ x: scroll }}
                onChange={filterReturn}
                id="component-generic-table"
                expandedRowRender={expandedRow}
                dataSource={renderDataTable(data)}
                pagination={{
                    total,
                    current: activePage,
                    showLessItems: true,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: getShowTotal,
                    pageSizeOptions: paginationOptions,
                    pageSize: pageQtd || limit || data.length,
                }}
                {...otherProps}
            />

            {getBottomExport()}
        </div>
    );
};

GenericTable.defaultProps = {
    limit: 20,
    scroll: 700,
    loading: false,
    toExport: undefined,
    expandedRow: undefined,
    paginationOptions: ['20', '50', '100'],
    renderDataTable: renderDataTableDefault,
};

GenericTable.propTypes = {
    limit: PropTypes.number,
    loading: PropTypes.bool,
    scroll: PropTypes.number,
    toExport: PropTypes.func,
    expandedRow: PropTypes.func,
    t: PropTypes.func.isRequired,
    renderDataTable: PropTypes.func,
    dataTotal: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    paginationOptions: PropTypes.arrayOf(PropTypes.string),
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.object.isRequired,
        ]),
        sorter: PropTypes.bool,
        render: PropTypes.func,
        key: PropTypes.string.isRequired,
        dataIndex: PropTypes.string.isRequired,
    })).isRequired,
};

export default withTranslation('common')(GenericTable);

import React from 'react';
import PropTypes from 'prop-types';
import { HomeOutlined } from '@ant-design/icons';
import { PageHeader as Header, Row, Breadcrumb } from 'antd';

const getBreadcrumbs = (routes = []) => {
    const allRoutes = [{
        path: '/',
        breadcrumbName: <HomeOutlined />,
    }].concat(routes);

    return (
        <Breadcrumb style={{ marginTop: -6 }}>
            { allRoutes.map(e => (
                <Breadcrumb.Item key={e.breadcrumbName} href={e.path}>
                    {e.breadcrumbName}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

const PageHeader = props => {
    const {
        title,
        extra,
        routes,
        footer,
        subtitle,
        headerContent,
    } = props;

    return (
        <Header
            ghost={false}
            title={title}
            extra={extra}
            footer={footer}
            subTitle={subtitle}
        >
            { routes.length > 0 && (
                <Row style={{ paddingTop: 5 }}>
                    {getBreadcrumbs(routes)}
                </Row>
            )}

            { headerContent && (
                <Row style={{ paddingTop: 5 }}>
                    {headerContent}
                </Row>
            )}
        </Header>
    );
};

PageHeader.defaultProps = {
    title: '',
    routes: [],
    extra: null,
    footer: null,
    subtitle: '',
    headerContent: null,
    onBack: () => window.history.back(),
};

PageHeader.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    onBack: PropTypes.func,
    routes: PropTypes.array,
    title: PropTypes.string,
    footer: PropTypes.object,
    subtitle: PropTypes.string,
    extra: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
    headerContent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};

export default PageHeader;

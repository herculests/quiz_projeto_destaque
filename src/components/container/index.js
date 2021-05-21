import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from './page-header';
import LoadingContainer from '../loading/LoadingContainer';

const PageContainer = props => {
    const {
        ghost,
        title,
        extra,
        footer,
        routes,
        onBack,
        loading,
        subtitle,
        children,
        videoList,
        titleLoading,
        headerContent,
        ...otherProps
    } = props;

    const goBack = () => {
        if (onBack) {
            onBack();
            return true;
        }

        if ((routes[routes.length - 2] || {}).path) {
            window.location = (routes[routes.length - 2] || {}).path;
            return true;
        }

        return null;
    };

    return (
        <>
            <PageHeader
                footer={footer}
                title={title}
                extra={extra}
                routes={routes}
                onBack={goBack}
                subtitle={subtitle}
                videoList={videoList}
                headerContent={headerContent}
            />

            <div
                className={ghost ? '' : 'site-layout-background'}
                style={{
                    padding: 24,
                    margin: ghost ? 0 : 16,
                }}
                {...otherProps}
            >
                <LoadingContainer
                    translate
                    loading={loading}
                    title={titleLoading}
                >
                    {children}
                </LoadingContainer>
            </div>
        </>
    );
};

PageContainer.defaultProps = {
    title: '',
    routes: [],
    extra: null,
    footer: null,
    ghost: false,
    subtitle: '',
    videoList: [],
    loading: false,
    headerContent: null,
    titleLoading: 'utils.loading',
    onBack: null,
};

PageContainer.propTypes = {
    ghost: PropTypes.bool,
    onBack: PropTypes.oneOf([
        PropTypes.func,
        PropTypes.bool,
    ]),
    loading: PropTypes.bool,
    routes: PropTypes.array,
    title: PropTypes.string,
    footer: PropTypes.object,
    subtitle: PropTypes.string,
    videoList: PropTypes.array,
    titleLoading: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
    extra: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
    headerContent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};

export default PageContainer;

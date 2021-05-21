import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Tabs as AntTabs } from 'antd';
import { withRouter } from 'react-router-dom';
import { getParams, setParams } from '../../utils/QueryController';

const getTabsComplete = tabs => tabs.map(({
    key,
    text,
    render,
    icon = () => {},
    disabled = false,
}) => (
    <AntTabs.TabPane
        key={key}
        disabled={disabled}
        tab={(
            <span>
                {icon()}
                {text}
            </span>
        )}
    >
        {render()}
    </AntTabs.TabPane>
));

const getTabPanes = tabs => tabs.map(({
    key,
    text,
    icon = () => {},
    disabled = false,
}) => (
    <AntTabs.TabPane
        key={key}
        disabled={disabled}
        tab={(
            <span>
                {icon()}
                {text}
            </span>
        )}
    />
));

export const getCurrentRenderTab = (activeTab, tabs) => {
    const tabKeys = tabs.map(e => e.key);
    const index = tabKeys.indexOf(activeTab);

    if (index !== -1) {
        return tabs[index].render;
    }

    return () => {};
};

const Tabs = props => {
    const {
        tabs,
        extra,
        tabKey,
        onlyTabs,
        activeTab,
        changeTab,
        ...otherProps
    } = props;

    const params = getParams();

    useEffect(() => {
        if ((!params || !params[tabKey]) && tabKey) {
            setParams({
                ...params,
                [tabKey]: activeTab,
            });
        }
    }, []);

    const updateHistorySearch = value => {
        if (value && tabKey) {
            setParams({
                [tabKey]: value,
            });
        } else if (tabKey) {
            setParams();
        }
    };

    const onChange = key => {
        updateHistorySearch('');
        changeTab(key, updateHistorySearch);
    };

    return (
        <AntTabs
            {...otherProps}
            onChange={onChange}
            activeKey={activeTab}
            tabBarExtraContent={extra}
            defaultActiveKey={activeTab}
            {...otherProps}
        >
            {onlyTabs ? getTabPanes(tabs) : getTabsComplete(tabs)}
        </AntTabs>
    );
};

Tabs.defaultProps = {
    extra: null,
    onlyTabs: false,
    tabKey: 'tabKey',
};

Tabs.propTypes = {
    extra: PropTypes.object,
    tabKey: PropTypes.string,
    onlyTabs: PropTypes.bool,
    tabs: PropTypes.array.isRequired,
    changeTab: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired,
};

export default withRouter(Tabs);

import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '/helpers/apollo';
import Head from 'next/head';
import fetchSubscription from '/ajax/account/subscription';
import fetchAlertsForCurrentUser from '/ajax/v2/user/alerts/query';
import Layout, { DataWrapper, DataContainer } from '/components/Layout';
import FlexView from '/components/FlexView';
import Text from '/components/Text';
import Spin from '/components/uielements/spin';
import Table from '/container/Table';
import RecentlyViewed from '/container/RecentlyViewed';
import withAAContext from '/modules/pages/withAAContext';

const columns = [
    {
        key: 'id',
        title: 'ID',
        dataIndex: 'id',
    },
    {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
    },
    {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
    },
    {
        key: 'notifications',
        title: 'Notifications',
        dataIndex: 'notifications',
    },
    {
        key: 'object_type',
        title: 'Type',
        dataIndex: 'object_type',
    },
    {
        key: 'email_setting',
        title: 'Email',
        dataIndex: 'email_setting',
    },
    {
        key: 'slack_setting',
        title: 'Slack',
        dataIndex: 'slack_setting',
    },
];

const searchFields = [
    {
        label: 'ID',
        name: 'id',
        type: 'input',
        payload: {
            props: {
                placeholder: 'ID',
            },
        },
    },
    {
        label: 'Email',
        name: 'select',
        type: 'select',
        initialValue: 'daily',
        payload: {
            props: {
                allowClear: true,
            },
            options: [
                { key: '1', label: 'Weekly', value: 'weekly' },
                { key: '2', label: 'Daily', value: 'daily' },
                { key: '3', label: 'Off', value: 'off' },
            ],
        },
    },
    {
        label: 'Name',
        name: 'name',
        type: 'input',
    },
];

const query = gql`
    {
        allUsers {
            id
            name
        }
    }
`;

const Index = ({ subscription, pathname, isNetworkError }) => {
    const { data, loading, error } = useQuery(query);
    const reportParams = {
        offset: 0,
        limit: 50,
        sortedBy: {
            key: 'id',
            dir: 'asc',
        },
    };
    const {
        accountOwnerEmail,
        customerName,
        isActive,
        lastSyncUp,
        basicUserCount,
        advancedUserCount,
        startDate,
        endDate,
        hasWebAccess,
        hasApiAccess,
        hasCsvExport,
        hasIpRestrictions,
        monthlyApiCalls,
        countries,
        categories,
    } = subscription;

    const onSearch = async info => {
        const params = {
            _page: info.page,
            _limit: info.pageSize,
            ...info.values,
        };
        const res = {
            data: [],
        };
        const { meta, data } = await fetchAlertsForCurrentUser({
            offset: reportParams.offset,
            limit: reportParams.limit,
            orderBy: reportParams.sortedBy.key,
            orderType: reportParams.sortedBy.dir,
        });
        return {
            dataSource: data,
            total: Number(data.length),
        };
    };
    return (
        <Layout pathname={pathname}>
            <Head>
                <title>App Annie - Admin - Demo - Data Flow</title>
            </Head>

            <DataWrapper>
                <FlexView column gutter="20px">
                    <DataContainer title="AQL data">
                        <RecentlyViewed />
                    </DataContainer>
                </FlexView>
                <FlexView gutter="20px">
                    <DataContainer title="Ajax call data">
                        <Table
                            rowKey={record => record.id}
                            searchFields={searchFields}
                            initialColumns={columns}
                            onSearch={onSearch}
                            loadDataImmediately={true}
                        />
                    </DataContainer>
                </FlexView>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="Page load data">
                        <Text ellipsis>{accountOwnerEmail}</Text>
                        <Text ellipsis>{customerName}</Text>
                        <Text ellipsis>{isActive}</Text>
                        <Text ellipsis>{lastSyncUp}</Text>
                        <Text ellipsis>{basicUserCount}</Text>
                        <Text ellipsis>{advancedUserCount}</Text>
                        <Text ellipsis>{startDate}</Text>
                        <Text ellipsis>{endDate}</Text>
                        <Text ellipsis>{monthlyApiCalls}</Text>
                    </DataContainer>
                    <DataContainer title="Graphql Data">
                        {loading ? (
                            <div
                                style={{
                                    textAlign: 'center',
                                    background: '#f1f3f6',
                                    padding: '30px 50px',
                                }}
                            >
                                <Spin />
                            </div>
                        ) : (
                            data.allUsers.map((u, i) => <li key={i}>{u.name}</li>)
                        )}
                    </DataContainer>
                </FlexView>
            </DataWrapper>
        </Layout>
    );
};

Index.getInitialProps = async ({ pathname, query, req, res }) => {
    let isNetworkError = false;
    const subscription = await fetchSubscription(req, res).then(
        data => data,
        err => {
            console.error(err);
            isNetworkError = true;
            return {};
        }
    );
    return {
        pathname,
        subscription,
        query,
    };
};

export default withApollo(Index);

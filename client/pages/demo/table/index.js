import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { Drawer, Icon } from 'antd';
import Input from '/components/uielements/input';
import Button from '/components/uielements/button';
import Tag from '/components/uielements/tag';
import Layout, { DataWrapper, DataContainer } from '/components/Layout';
import FlexView from '/components/FlexView';
import withAAContext from '/modules/pages/withAAContext';
import Table from '/container/Table';
import {
    searchFields,
    columns,
    expands,
    onSearch,
    onError,
} from '/modules/fakeData/Table/data';

const Index = ({ pathname }) => {
    let dataTableRef = null;

    const saveDataTableRef = ref => {
        dataTableRef = ref;
    };

    const onClickCustomSearch = () => {
        if (dataTableRef) {
            dataTableRef.fetch(1);
        }
    };
    const actions = [
        {
            label: 'Edit',
            action(record) {
                alert('onClick edit' + record);
            },
        },
        {
            label: 'More',
            children: [
                {
                    label: 'Remove',
                    alert(record) {
                        action('onClick remove' + record);
                    },
                },
                {
                    label: 'Open',
                    alert(record) {
                        action('onClick open' + record);
                    },
                },
            ],
        },
    ];
    return (
        <Layout pathname={pathname}>
            <Head>
                <title>App Annie - Admin - Demo - Table</title>
            </Head>

            <DataWrapper>
                <FlexView gutter="20px">
                    <DataContainer title="A simplest data table">
                        <Table
                            rowKey={record => record.id}
                            searchFields={searchFields}
                            initialColumns={columns}
                            onSearch={onSearch}
                            loadDataImmediately={true}
                            initialExpands={expands}
                        />
                    </DataContainer>
                </FlexView>
                <FlexView column gutter="20px">
                    <DataContainer title="Custom search">
                        <Table
                            ref={saveDataTableRef}
                            name="customSearch"
                            rowKey={record => record.id}
                            searchFields={searchFields}
                            initialColumns={columns}
                            onSearch={onSearch}
                            pageSize={10}
                            onError={onError}
                        />
                        <Button onClick={onClickCustomSearch}>Custom Search</Button>
                    </DataContainer>
                    <DataContainer title="List selection">
                        <Table
                            name="test"
                            enableListSelection
                            rowKey={record => record.id}
                            searchFields={searchFields}
                            initialColumns={columns}
                            onSearch={onSearch}
                            pageSize={10}
                            onError={onError}
                        />
                    </DataContainer>
                    <DataContainer title="Row Actions">
                        <Table
                            rowKey={record => record.id}
                            searchFields={searchFields}
                            initialColumns={columns}
                            onSearch={onSearch}
                            pageSize={10}
                            rowActions={actions}
                        />
                    </DataContainer>
                </FlexView>
            </DataWrapper>
        </Layout>
    );
};

Index.getInitialProps = async ({ pathname, query, req, res }) => {
    return {
        pathname,
    };
};

export default Index;

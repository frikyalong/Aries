import React from 'react';
import Head from 'next/head';
import Layout, { DataWrapper, DataContainer } from '/components/Layout';
import FlexView from '/components/FlexView';
import Text from '/components/Text';
import withAAContext from '/modules/pages/withAAContext';

const Index = ({ pathname }) => {
    return (
        <Layout pathname={pathname}>
            <Head>
                <title>App Annie - Admin - Demo - Blank</title>
            </Head>

            <DataWrapper>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="How to build a new page?">
                        <Text ellipsis>Create a new page:</Text>
                        <Text ellipsis>
                            Step 1: create a new file under folder pages.
                        </Text>
                        <Text ellipsis>Step 2: copy the codes from blank_page.js</Text>
                        <Text ellipsis>Step 3: add the url in /server.js</Text>
                        <Text ellipsis>
                            Step 3: add the config in /components/Layout/Sidebar/config.js
                        </Text>
                    </DataContainer>
                    <DataContainer title="Environment Prepare">
                        <Text ellipsis>Make sure you have node and yarn in your mac</Text>
                        <Text ellipsis>Run make dev</Text>
                    </DataContainer>
                </FlexView>
                <FlexView gutter="20px">
                    <DataContainer title="Area Five"></DataContainer>
                </FlexView>
                <FlexView gutter="20px">
                    <FlexView>
                        <DataContainer title="Area Three"></DataContainer>
                    </FlexView>
                    <FlexView grow={2}>
                        <DataContainer title="Area Four"></DataContainer>
                    </FlexView>
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

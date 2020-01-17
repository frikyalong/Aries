import React, { useState } from 'react';
import Head from 'next/head';

import Layout, { DataWrapper, DataContainer } from '/components/Layout';
import FlexView from '/components/FlexView';
import withAAContext from '/modules/pages/withAAContext';

const Index = ({ pathname }) => {
    return (
        <Layout pathname={pathname}>
            <Head>
                <title>App Annie - Admin - Permissions</title>
            </Head>

            <DataWrapper>
                <FlexView column gutter="20px">
                    <DataContainer title="Permissions">
                        This is test line.
                        <br /> This is test line. <br /> This is test line. <br /> This is
                        test line.
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

export default withAAContext(Index);

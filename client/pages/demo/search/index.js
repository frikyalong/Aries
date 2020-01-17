import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import * as colors from '/components/style/colors';
import { DataWrapper, DataContainer } from '/components/Layout';
import WithoutSidebar from '/components/Layout/WithoutSidebar';
import FlexView from '/components/FlexView';
import { InputSearch } from '/components/uielements/input';
import withAAContext from '/modules/pages/withAAContext';
import { createDataGetter } from '/modules/query-language/query';
import SearchResult from '/container/SearchResult';
import LogoSrc from '/static/aa-header-logo.svg';
import LoadingOverlay from '/components/LoadingOverlay';
import { useDatasource } from '/modules/SuperGrid';

const Wrapper = styled(DataWrapper)`
    background-color: white;
`;
const ResultWrapper = styled.div`
    position: relative;
    min-height: 86px;
    display: grid;
    grid-template-columns: repeat(3, 300px);
    justify-content: space-between;
    grid-row-gap: 10px;
`;
const Name = styled(FlexView).attrs({
    hAlignContent: 'center',
})`
    font-size: 38px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
`;

const SearchInput = styled(InputSearch)`
    width: 60%;
`;

const SearchResultWrapper = styled(FlexView)`
    /* margin-top: 80px; */
`;

const HeaderBar = styled(FlexView).attrs({
    hAlignContent: 'center',
    vAlignContent: 'center',
})`
    font-size: 14px;
    color: ${colors.brand.bigStone};
    z-index: 2;
    padding: 0;
    height: 100px;
    padding-top: 20px;
    padding-bottom: 40px;

    & > ${FlexView} {
        height: 100%;
    }
`;
const LogoWrapper = styled(FlexView)`
    /* padding-left: 40px; */
`;
const Index = ({ pathname }) => {
    const [searchKeyword, setSearchKeyword] = useState(undefined);
    let content;

    const onSearch = value => {
        setSearchKeyword(value);
    };

    return (
        <>
            {!searchKeyword && (
                <WithoutSidebar>
                    <Head>
                        <title>App Annie - Admin - Demo - Search</title>
                    </Head>

                    <Wrapper>
                        <FlexView gutter="20px">
                            <DataContainer>
                                <FlexView
                                    hAlignContent="center"
                                    column
                                    style={{ height: '100vh' }}
                                >
                                    <Name>App Annie Search</Name>
                                    <SearchInput
                                        placeholder="App Name..."
                                        defaultValue=""
                                        onSearch={onSearch}
                                    />
                                </FlexView>
                            </DataContainer>
                        </FlexView>
                    </Wrapper>
                </WithoutSidebar>
            )}
            {searchKeyword && (
                <FlexView column>
                    <HeaderBar>
                        <FlexView gutter="15px">
                            <LogoWrapper>
                                <LogoSrc width="140px" />
                            </LogoWrapper>
                            <SearchInput
                                style={{ width: '500px' }}
                                placeholder="App Name..."
                                defaultValue={searchKeyword}
                                onSearch={onSearch}
                            />
                        </FlexView>
                    </HeaderBar>

                    <SearchResultWrapper>
                        <SearchResult keyword={searchKeyword} />
                    </SearchResultWrapper>
                </FlexView>
            )}
        </>
    );
};

Index.getInitialProps = async ({ pathname, query, req, res }) => {
    return {
        pathname,
    };
};

export default withAAContext(Index);

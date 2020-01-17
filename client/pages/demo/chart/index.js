import React from 'react';
import Head from 'next/head';
import Layout, { DataWrapper, DataContainer } from '/components/Layout';
import FlexView from '/components/FlexView';
import Chart from '/container/ECharts';
import { geoData, geoCoordMap } from '/modules/fakeData/chart/geo';
import { barChartData } from '/modules/fakeData/chart/barChart';
import { chartData, chartData02 } from '/modules/fakeData/chart/lineChart';
import { indicator, radarData } from '/modules/fakeData/chart/radar';
import { regressionData } from '/modules/fakeData/chart/regression';

const Index = ({ pathname }) => {
    return (
        <Layout pathname={pathname}>
            <Head>
                <title>App Annie - Admin - Demo - Chart</title>
            </Head>

            <DataWrapper>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="Order Statistics">
                        <Chart
                            data={chartData}
                            type="pie"
                            xAxis="date"
                            yAxis="est_usage_penetration__aggr"
                            groupBy="device_code"
                        />
                    </DataContainer>
                    <DataContainer title="Orders">
                        <Chart
                            data={barChartData}
                            type="bar"
                            xAxis="date"
                            yAxis="est_sdk_install_base__aggr"
                            groupBy="date"
                        />
                    </DataContainer>
                </FlexView>
                <FlexView column gutter="20px">
                    <DataContainer title="Daily Sales">
                        <Chart
                            data={chartData02}
                            width="100%"
                            height={400}
                            type="stacked-area"
                            xAxis="date"
                            yAxis="fact_download__sum"
                            groupBy="product_id"
                        />
                    </DataContainer>
                </FlexView>

                <FlexView gutter="20px">
                    <DataContainer title="Regression">
                        <Chart
                            type="regression"
                            name="Linear Regression"
                            data={regressionData}
                            width="100%"
                            height={500}
                            min={1.5}
                        />
                    </DataContainer>
                </FlexView>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="Radar">
                        <Chart type="radar" indicator={indicator} data={radarData} />
                    </DataContainer>
                    <DataContainer title="Gauge">
                        <Chart
                            type="gauge"
                            name="Gauge"
                            data={[
                                { value: 50, name: 'Order Stat' },
                                { value: 75, name: 'Spark' },
                            ]}
                        />
                    </DataContainer>
                </FlexView>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="Order Statistics">
                        <Chart data={geoData} geoCoordMap={geoCoordMap} type="geo" />
                    </DataContainer>
                    <DataContainer title="Orders">
                        <Chart
                            type="funnel"
                            data={[
                                { value: 60, name: 'Speed' },
                                { value: 40, name: 'Easy of Use' },
                                { value: 20, name: 'Generality' },
                                { value: 80, name: 'Runs' },
                                { value: 100, name: 'Everywhere' },
                            ]}
                        />
                    </DataContainer>
                </FlexView>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="Order Statistics">
                        <Chart
                            data={chartData}
                            type="line"
                            xAxis="date"
                            yAxis="est_usage_penetration__aggr"
                            groupBy="device_code"
                            smooth={true}
                        />
                    </DataContainer>
                    <DataContainer title="Orders">
                        <Chart
                            data={chartData}
                            type="line-area"
                            xAxis="date"
                            yAxis="est_usage_penetration__aggr"
                            groupBy="device_code"
                        />
                    </DataContainer>
                </FlexView>
                <FlexView column gutter="20px">
                    <DataContainer title="Daily Sales">
                        <Chart
                            data={chartData02}
                            width="100%"
                            height={400}
                            type="line"
                            xAxis="date"
                            yAxis="fact_download__sum"
                            groupBy="product_id"
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

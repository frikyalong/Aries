import React from 'react';
import Head from 'next/head';
import { Icon, Tooltip } from 'antd';
import { MdPieChart } from 'react-icons/md';
import { MdLockOutline } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import Layout, { DataWrapper, DataContainer } from '/components/Layout';
import FlexView from '/components/FlexView';
import Sticker from '/components/Widgets/Sticker/StickerWidget';
import Sale from '/components/Widgets/Sale/SaleWidget';
import Card from '/components/Widgets/Card/Card';
import ChartCard from '/components/Widgets/ChartCard/';
import Progress from '/components/Widgets/Progress/ProgressWidget';
import ProgressBar from '/components/uielements/progress';
// import Tooltip from '/components/uielements/tooltip';
import Timeline, { TimelineItem } from '/components/uielements/timeline';
import CardItem from '/components/uielements/card';
import Text from '/components/Text';
import { CHART_COLORS } from '/components/style/colors';
import Trend from '/components/Trend';
import Chart from '/container/ECharts';
import MiniArea from '/container/ECharts/MiniArea';
import MiniBar from '/container/ECharts/MiniBar';
import MiniLine from '/container/ECharts/MiniLine';
import Table from '/container/Tables/TableViews/';
import { columns, tableData } from '/helpers/table_fake_data';
import withAAContext from '/modules/pages/withAAContext';
import { chartData, chartData02 } from '/modules/fakeData/chart/lineChart';
import { STICKER_WIDGET } from '/modules/fakeData/widget/data';

const Index = ({ pathname }) => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState({});
    const setSelectValues = (keys, items) => {
        setSelectedRowKeys(keys);
        setSelectedItem(items);
    };
    return (
        <Layout pathname={pathname}>
            <Head>
                <title>App Annie - Admin - Demo - Blank</title>
            </Head>

            <DataWrapper>
                <FlexView gutter="20px">
                    <DataContainer title="the first day of his new reality">
                        <FlexView gutter="20px">
                            {STICKER_WIDGET.map((widget, idx) => (
                                <Sticker
                                    number={widget.number}
                                    text={widget.text}
                                    icon={widget.icon}
                                    fontColor={widget.fontColor}
                                    bgColor={widget.bgColor}
                                />
                            ))}
                        </FlexView>
                    </DataContainer>
                </FlexView>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="Apps you might be interested in">
                        <FlexView gutter="20px">
                            <Sale
                                label="INCOME"
                                price="$15000"
                                details="the first day when he woke up with"
                                fontColor="#F75D81"
                            />
                            <Sale
                                label="INCOME"
                                price="$3200"
                                details="Johnson and — to mitigate"
                                fontColor="#F75D81"
                            />
                        </FlexView>
                    </DataContainer>
                    <DataContainer title="impeached president to face re-election">
                        <FlexView gutter="20px">
                            <Card
                                icon={<MdLockOutline size={32} />}
                                iconcolor="#42A5F5"
                                number={123}
                                text="NEW MESSAGE"
                            />
                            <Progress
                                label="Download"
                                details="80% Satisfied Customer"
                                icon={<MdPieChart size={20} />}
                                iconcolor="#F75D81"
                                percent={65}
                                barHeight={7}
                                status="active"
                            />
                        </FlexView>
                    </DataContainer>
                </FlexView>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="320-day campaign to convince">
                        <FlexView vAlignContent="stretch" gutter="10px">
                            <ChartCard
                                bordered={false}
                                loading={false}
                                title="Run workloads 100x faster."
                                action={
                                    <Tooltip title="dashboardandanalysis.analysis.introduce">
                                        <Icon type="info-circle-o" />
                                    </Tooltip>
                                }
                                total={8846}
                                footer={
                                    <FlexView>
                                        <Trend
                                            flag="up"
                                            style={{
                                                marginRight: 16,
                                            }}
                                        >
                                            Weekly
                                            <span>12%</span>
                                        </Trend>
                                        <Trend flag="down">
                                            Daily
                                            <span>11%</span>
                                        </Trend>
                                    </FlexView>
                                }
                                contentHeight={80}
                            >
                                <MiniLine
                                    color={CHART_COLORS[0]}
                                    data={[0, 34, 23, 30, 32, 10, 34, 23, 30, 20]}
                                />
                            </ChartCard>
                            <ChartCard
                                bordered={false}
                                loading={false}
                                title="Ease of Use"
                                action={
                                    <Tooltip title="dashboardandanalysis.analysis.introduce">
                                        <Icon type="info-circle-o" />
                                    </Tooltip>
                                }
                                total={8846}
                                footer={
                                    <Text ellipsis>
                                        Spark offers over 80 high-level operators that
                                        make it easy to build parallel apps
                                    </Text>
                                }
                                contentHeight={80}
                            >
                                <MiniBar
                                    color={CHART_COLORS[1]}
                                    data={[20, 34, 23, 30, 32, 10, 34, 23, 30, 20]}
                                />
                            </ChartCard>
                        </FlexView>
                    </DataContainer>
                    <DataContainer title="But barring the unforeseen">
                        <FlexView gutter="20px">
                            <ChartCard
                                bordered={false}
                                loading={false}
                                title="Ease of Use"
                                action={
                                    <Tooltip title="dashboardandanalysis.analysis.introduce">
                                        <Icon type="info-circle-o" />
                                    </Tooltip>
                                }
                                total="78%"
                                footer="dashboardandanalysis.analysis"
                                contentHeight={80}
                            >
                                <MiniArea
                                    color={CHART_COLORS[6]}
                                    data={[20, 34, 23, 30, 32, 10, 34, 23, 30, 20]}
                                />
                            </ChartCard>
                            <ChartCard
                                bordered={false}
                                loading={false}
                                title="Apache Spark achieves"
                                action={
                                    <Tooltip title="dashboardandanalysis.analysis.introduce">
                                        <Icon type="info-circle-o" />
                                    </Tooltip>
                                }
                                total={8846}
                                footer="dashboardandanalysis.analysis"
                                contentHeight={80}
                            >
                                <MiniLine
                                    color={CHART_COLORS[4]}
                                    data={[20, 34, 23, 30, 32, 10, 34, 23, 30, 20]}
                                />
                            </ChartCard>
                        </FlexView>
                    </DataContainer>
                </FlexView>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="he woke up with the scarlet">
                        <FlexView gutter="20px">
                            <CardItem
                                title="counterassault"
                                extra={<a href="# ">more</a>}
                                style={{ width: '100%' }}
                            >
                                <p>impeachment</p>
                                <p>voters that he was right and</p>
                            </CardItem>{' '}
                            <CardItem
                                title="setting up a"
                                extra={<a href="# ">more</a>}
                                style={{ width: '100%' }}
                            >
                                <p>Democrats who</p>
                                <p>campaign to convince</p>
                            </CardItem>{' '}
                            <CardItem
                                title="orchestrated"
                                extra={<a href="# ">more</a>}
                                style={{ width: '100%' }}
                            >
                                <p>indelible</p>
                                <p>party-line scheme to nullify </p>
                            </CardItem>
                        </FlexView>
                    </DataContainer>
                </FlexView>

                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="Visitor statistics from 2010 to 2016">
                        <ProgressBar percent={30} />
                        <ProgressBar percent={50} status="active" />
                        <ProgressBar percent={70} status="exception" />
                        <ProgressBar percent={100} />
                        <ProgressBar percent={50} showInfo={false} />
                    </DataContainer>
                    <DataContainer title="Pie Chart">
                        <Chart
                            data={chartData}
                            type="pie"
                            xAxis="date"
                            yAxis="est_usage_penetration__aggr"
                            groupBy="device_code"
                        />
                    </DataContainer>
                </FlexView>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="a largely his election.">
                        <FlexView>
                            <Timeline>
                                <TimelineItem>
                                    Create a services site 2015-09-01
                                </TimelineItem>
                                <TimelineItem>
                                    Solve initial network problems 2015-09-01
                                </TimelineItem>
                                <TimelineItem
                                    dot={<FiTrash2 size={16} />}
                                    color={CHART_COLORS[3]}
                                >
                                    Technical testing 2015-09-01
                                </TimelineItem>
                                <TimelineItem>
                                    Network problems being solved 2015-09-01
                                </TimelineItem>
                            </Timeline>
                        </FlexView>
                    </DataContainer>
                    <DataContainer title="Trump characterizes as the corrupt">
                        <Timeline pending={<a href="# ">seeMore</a>}>
                            <TimelineItem>Create a services site 2015-09-01</TimelineItem>
                            <TimelineItem>
                                Solve initial network problems 2015-09-01
                            </TimelineItem>
                            <TimelineItem>Technical testing 2015-09-01</TimelineItem>
                        </Timeline>
                    </DataContainer>
                </FlexView>
                <FlexView gutter="20px">
                    <DataContainer title="Table Demo">
                        <Table
                            columns={columns}
                            dataSource={tableData}
                            pagination={tableData}
                            updateSelectedItem={setSelectValues}
                            selectedRowKeys={selectedRowKeys}
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

// export default withAAContext(Index);
export default Index;

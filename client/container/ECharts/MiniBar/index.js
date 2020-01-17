import React from 'react';
import autoHeight from '/container/ECharts/autoHeight';
import styled from 'styled-components';
import ReactEcharts from 'echarts-for-react';
import { CHART_COLORS } from '/components/style/colors';

const MiniBarWrapper = styled.div`
    position: relative;
    width: 100%;
    .chartContent {
        position: relative;
        bottom: -28px;
        width: 100%;
        > div {
            margin: 0 -5px;
            overflow: hidden;
        }
    }
`;

const MiniBar = props => {
    const { height = 1, data = [], color = 'rgba(24, 144, 255, 0.2)' } = props;
    const chartHeight = height + 54;
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                },
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show: false,
        },
        yAxis: {
            type: 'value',
            show: false,
        },
        series: [
            {
                type: 'bar',
                data,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            return CHART_COLORS[params.dataIndex];
                        },
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
        grid: {
            top: '30%',
        },
    };
    return (
        <MiniBarWrapper
            style={{
                height,
            }}
        >
            <div className="chartContent">
                {height > 0 && (
                    <ReactEcharts
                        style={{ height: chartHeight, width: '100%' }}
                        option={option}
                    ></ReactEcharts>
                )}
            </div>
        </MiniBarWrapper>
    );
};

export default autoHeight()(MiniBar);

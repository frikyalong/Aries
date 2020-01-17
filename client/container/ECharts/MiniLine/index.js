import React from 'react';
import autoHeight from '/container/ECharts/autoHeight';
import styled from 'styled-components';
import ReactEcharts from 'echarts-for-react';

const MiniLineWrapper = styled.div`
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

const MiniLine = props => {
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
                data,
                type: 'line',
                color,
            },
        ],
        grid: {
            top: '30%',
            left: '-20%',
            right: '-20%',
        },
    };
    return (
        <MiniLineWrapper
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
        </MiniLineWrapper>
    );
};

export default autoHeight()(MiniLine);

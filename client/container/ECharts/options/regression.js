import _ from 'lodash';
import tools from '/modules/utils';
import ecStat from 'echarts-stat';

export const respToRegressionChartOptions = (resp, title, min) => {
    const myRegression = ecStat.regression('linear', resp);

    myRegression.points.sort(function(a, b) {
        return a[0] - b[0];
    });
    const options = {
        title: {
            text: title,
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
        },
        xAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                },
            },
        },
        yAxis: {
            type: 'value',
            min,
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                },
            },
        },
        series: [
            {
                name: 'scatter',
                type: 'scatter',
                label: {
                    emphasis: {
                        show: true,
                        position: 'left',
                        textStyle: {
                            color: 'blue',
                            fontSize: 16,
                        },
                    },
                },
                data: resp,
            },
            {
                name: 'line',
                type: 'line',
                showSymbol: false,
                data: myRegression.points,
                markPoint: {
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                        },
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            formatter: myRegression.expression,
                            textStyle: {
                                color: '#333',
                                fontSize: 14,
                            },
                        },
                    },
                    data: [
                        {
                            coord: myRegression.points[myRegression.points.length - 1],
                        },
                    ],
                },
            },
        ],
    };
    return options;
};

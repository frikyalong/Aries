import _ from 'lodash';
import tools from '/modules/utils';
import { ECHART_COLORS } from '/components/style/colors';

export const respToLineChartOptions = (resp, xAxis, yAxis, groupBy, type, smooth) => {
    const groups = _.groupBy(resp, groupBy);
    let groupKey;
    let legendData = [];
    let areaStyle = undefined;
    if (type === 'line-area') {
        areaStyle = {};
    }
    if (type === 'stacked-area') {
        areaStyle = { normal: {} };
    }
    const series = Object.keys(groups).map(id => {
        groupKey = id;
        legendData.push(id);
        return {
            name: id,
            type: 'line',
            data: groups[id].map(d => d[yAxis]),
            areaStyle,
            smooth: smooth,
        };
    });

    const xAxisData = groups[groupKey].map(d =>
        xAxis === 'date' ? tools.formateShortDate(d[xAxis]) : d[xAxis]
    );

    const options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                },
            },
        },
        legend: {
            data: legendData,
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        color: ECHART_COLORS,
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
        },
        yAxis: {
            type: 'value',
        },
        series: series,
    };
    return options;
};

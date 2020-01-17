import _ from 'lodash';
import tools from '/modules/utils';
import { ECHART_COLORS } from '/components/style/colors';

export const respToPieChartOptions = (
    resp,
    xAxis,
    yAxis,
    groupBy,
    type,
    smooth,
    seriesColors,
    seriesNames,
    legendStatus
) => {
    const groups = _.groupBy(resp, groupBy);
    let groupKey;
    let legendData = [];
    const series = Object.keys(groups).map(id => {
        groupKey = id;
        legendData.push(id);
        return {
            type: 'pie',
            radius: ['35%', '70%'],
            center: ['50%', '60%'],
            data: groups[id].map(d => {
                return { value: d[yAxis], name: d[xAxis] };
            }),
        };
    });

    const options = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        color: ECHART_COLORS,
        legend: {
            data: legendData,
        },
        series: series,
    };
    return options;
};

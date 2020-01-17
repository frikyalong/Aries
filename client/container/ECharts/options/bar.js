import _ from 'lodash';
import tools from '/modules/utils';
import { ECHART_COLORS } from '/components/style/colors';

export const respToBarChartOptions = (resp, xAxis, yAxis, groupBy, type) => {
    const groups = _.groupBy(resp, groupBy);
    let groupKey;
    let legendData = [];
    let dataset = { source: [] };
    let series = [];
    let xAxisData = [];
    dataset.source.push([groupBy]);

    Object.keys(groups).map(id => {
        const _id = id;
        id = 'date' ? tools.formateShortDate(parseInt(id)) : id;
        groupKey = id;
        legendData.push(id);
        dataset.source[0].push(id);
        let items = [id];
        groups[_id].map(d => {
            return items.push(d[yAxis]);
        });
        dataset.source.push(items);
        series.push({ type: 'bar' });
    });

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
        color: ECHART_COLORS,
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            // data: xAxisData,
        },
        dataset,
        yAxis: {},
        series,
    };
    return options;
};

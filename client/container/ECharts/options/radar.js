import _ from 'lodash';
import tools from '/modules/utils';
import { ECHART_COLORS } from '/components/style/colors';

export const respToRadarChartOptions = (resp, indicator) => {
    let names = [];
    let data = [];
    resp.map(r => {
        names.push(r.key);
        let values = [];
        _.forOwn(r.value, function(value) {
            values.push(value);
        });
        data.push({ value: values, name: r.key });
    });
    const options = {
        tooltip: {},
        legend: {
            data: names,
        },
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5],
                },
            },
            indicator,
        },
        color: ECHART_COLORS,
        series: [
            {
                name: names.join(' - '),
                type: 'radar',
                data,
            },
        ],
    };
    return options;
};

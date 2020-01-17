import _ from 'lodash';
import tools from '/modules/utils';

export const respToGaugeChartOptions = (resp, name) => {
    const options = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%',
        },
        series: [
            {
                name,
                type: 'gauge',
                detail: { formatter: '{value}%' },
                data: resp,
            },
        ],
    };
    return options;
};

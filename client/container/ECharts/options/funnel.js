import _ from 'lodash';
import tools from '/modules/utils';
import { ECHART_COLORS } from '/components/style/colors';

export const respToFunnelChartOptions = resp => {
    let legendData = [];
    resp.map(d => legendData.push(d.name));

    const options = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%',
        },
        legend: {
            data: legendData,
        },
        calculable: true,
        series: [
            {
                name: '',
                type: 'funnel',
                left: '10%',
                top: 60,
                //x2: 80,
                bottom: 60,
                width: '80%',
                // height: {totalHeight} - y - y2,
                color: ECHART_COLORS,
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20,
                        },
                    },
                },
                labelLine: {
                    normal: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid',
                        },
                    },
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 1,
                    },
                },
                data: resp,
            },
        ],
    };
    return options;
};

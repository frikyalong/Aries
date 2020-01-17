import _ from 'lodash';
import tools from '/modules/utils';
import 'echarts/map/js/china';

export const respToGeoChartOptions = (
    resp,
    geoCoordMap,
    xAxis,
    yAxis,
    groupBy,
    type,
    smooth,
    seriesColors,
    seriesNames,
    legendStatus
) => {
    const convertData = data => {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };
    const series = [
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: function(val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false,
                },
                emphasis: {
                    show: true,
                },
            },
            itemStyle: {
                normal: {
                    color: '#ddb926',
                },
            },
            data: convertData(resp),
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(
                resp
                    .sort(function(a, b) {
                        return b.value - a.value;
                    })
                    .slice(0, 6)
            ),
            symbolSize: function(val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true,
                },
            },
            itemStyle: {
                normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333',
                },
            },
            zlevel: 1,
        },
    ];

    const options = {
        backgroundColor: '#404a59',
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['pm2.5'],
            textStyle: {
                color: '#fff',
            },
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false,
                },
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111',
                },
                emphasis: {
                    areaColor: '#2a333d',
                },
            },
        },
        series,
    };
    return options;
};

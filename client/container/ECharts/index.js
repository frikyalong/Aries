import FlexView from '/components/FlexView';
import EChart from '/components/ECharts/Chart';
import { CHART_COLORS } from '/components/style/colors';
import { respToLineChartOptions } from './options/line';
import { respToBarChartOptions } from './options/bar';
import { respToPieChartOptions } from './options/pie';
import { respToGeoChartOptions } from './options/geo';
import { respToFunnelChartOptions } from './options/funnel';
import { respToRegressionChartOptions } from './options/regression';
import { respToRadarChartOptions } from './options/radar';
import { respToGaugeChartOptions } from './options/gauge';

const Chart = props => {
    const {
        data,
        type,
        width,
        height,
        xAxis,
        yAxis,
        groupBy,
        smooth,
        geoCoordMap,
        name,
        indicator,
        min,
    } = props;
    let component;
    const chartWidth = width || 600;
    const chartHeight = height || 300;
    let option;
    if (type === 'pie') {
        option = respToPieChartOptions(data, xAxis, yAxis, groupBy, type, smooth);
    } else if (type === 'bar') {
        option = respToBarChartOptions(data, xAxis, yAxis, groupBy, type, smooth);
    } else if (type === 'line' || type === 'line-area' || type === 'stacked-area') {
        option = respToLineChartOptions(data, xAxis, yAxis, groupBy, type, smooth);
    } else if (type === 'geo') {
        option = respToGeoChartOptions(data, geoCoordMap);
    } else if (type === 'funnel') {
        option = respToFunnelChartOptions(data);
    } else if (type === 'regression') {
        option = respToRegressionChartOptions(data, name, min);
    } else if (type === 'radar') {
        option = respToRadarChartOptions(data, indicator);
    } else if (type === 'gauge') {
        option = respToGaugeChartOptions(data, name);
    }

    return (
        <FlexView gutter="5px">
            <EChart style={{ height: chartHeight, width: chartWidth }} option={option} />
        </FlexView>
    );
};

export default Chart;

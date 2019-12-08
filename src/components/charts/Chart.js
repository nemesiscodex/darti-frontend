import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/calendar';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/chart/custom';
import 'echarts/lib/chart/heatmap';
import { NoSsr } from '@material-ui/core';

export const { addCommas } = echarts.format;
export const { formatTime } = echarts.format;

export function Chart({ options, height = '300px' }) {
  const [loading, setLoading] = React.useState(true);

  function onChartReady(_) {
    setLoading(false);
  }

  function loader() {
    if (loading) {
      return (<CircularProgress />);
    } return null;
  }

  return (
    <div style={(loading) ? {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: height,
    } : null}
    >
      {loader()}
      <NoSsr>
        <ReactEchartsCore
          style={{ height }}
          notMerge
          theme="light"
          echarts={echarts}
          option={options}
          aria-label="Chart"
          onChartReady={onChartReady}
        />
      </NoSsr>
    </div>
  );
}

export default Chart;

import React from 'react';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Chart, formatTime } from './Chart';
import theme from '../../theme';

function calendarData(t, data) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(t);
  const days = ['0S', '1M', '2T', '3W', '4T', '5F', '6S'].map(t);

  const now = new Date();
  let max = 0;
  let min = Infinity;

  const dailyActivations = data.reduce((map, value) => {
    const date = formatTime('yyyy-MM-dd', value.timestamp);
    map[date] = map[date] || 0;
    map[date] = map[date] + value.activationCount;
    return map;
  }, {});


  let monthsBefore = 12;

  if (useMediaQuery(theme.breakpoints.only('lg'))) {
    monthsBefore = 10;
  }
  if (useMediaQuery(theme.breakpoints.only('md'))) {
    monthsBefore = 8;
  }
  if (useMediaQuery(theme.breakpoints.only('sm'))) {
    monthsBefore = 4;
  }
  if (useMediaQuery(theme.breakpoints.only('xs'))) {
    monthsBefore = 4;
  }

  const range = [formatTime('yyyy-MM-dd', new Date().setMonth(now.getMonth() - monthsBefore)),
    formatTime('yyyy-MM-dd', now)];

  const dataList = Object.keys(dailyActivations).sort().map((date) => {
    if (dailyActivations[date] > max) {
      max = dailyActivations[date];
    }
    if (dailyActivations[date] < min) {
      min = dailyActivations[date];
    }

    return [date, dailyActivations[date]];
  });

  return {
    tooltip: {
      formatter(params) {
        return `${params.data[0]}: ${params.data[1]}`;
      },
    },
    visualMap: {
      min: 2000,
      max: 6000,
      // splitNumber: ,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 120,
      textStyle: {
        color: '#000',
      },
      minOpen: true,
      inRange: { color: ['#fff', '#536F86'] },
    },
    calendar: {
      top: 20,
      left: 30,
      right: 30,
      cellSize: ['auto', 13],
      // range: '2019',
      range,
      itemStyle: {
        normal: { borderWidth: 0.5 },
      },
      yearLabel: {
        show: true,
        position: 'top',
      },
      monthLabel: {
        nameMap: months,
      },
      dayLabel: {
        nameMap: days,
      },
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: dataList,
    },
    grid: {
      top: 0,
    },
  };
}

export default function CalendarChart({ t, data }) {
  return (
    <>
      <Chart options={calendarData(t, data)} height="200px" />
      <Divider />
    </>
  );
}

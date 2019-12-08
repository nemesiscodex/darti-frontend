import React from 'react';
import { Chart, addCommas } from './Chart';

function pressureData(t, data) {
  const dataSize = data.length;
  const dataStart = Math.min(99, Math.max(0, Math.round((dataSize - 30) * 100 / dataSize)));

  return {
    title: {
      text: addCommas(data.length) + t(' Datapoints'),
    },
    legend: {
      top: 30,
    },
    xAxis: [
      {
        type: 'time',
      },
    ],
    toolbox: {
      // y: 'bottom',
      feature: {
        magicType: {
          type: ['line', 'bar'],
          title: {
            line: t('Line'),
            bar: t('Bar'),
          },
        },
        dataView: {
          title: t('Data view'),
          lang: ['Data view', 'Close'].map(t),
          optionToContent(opt) {
            const axisData = opt.dataset[0].source;

            const { series } = opt;
            let textArea = `${'<textarea style="width: 100%; height: 100%; font-family: monospace; font-size: 14px; line-height: 1.6rem; color: rgb(0, 0, 0); border-color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);">'
                            + '"Time",'
                            + '"'}${series[0].name}"\n`;
            for (let i = 1, l = axisData.length; i < l; i++) {
              textArea += `${axisData[i][0]},${
                axisData[i][1]}\n`;
            }
            textArea += '</textarea>';
            return textArea;
          },
          readOnly: true,
        },
        saveAsImage: {
          pixelRatio: 4,
          title: t('Save Image'),
        },
        restore: {
          title: t('Restore'),
        },
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    dataZoom: [{
      type: 'inside',
      start: dataStart,
      end: 100,
      handleSize: 40,
      realtime: false,
      top: 'bottom',
    },
    {
      type: 'slider',
      start: dataStart,
      end: 100,
      handleSize: 40,
      realtime: false,
      top: 'bottom',
    }],
    // calculable : true,
    yAxis: [
      {
        type: 'value',
        name: t('Pressure (mbar)'),
        nameLocation: 'middle',
        nameGap: 42,
        scale: true,
      },
    ],
    dataset: {
      source: [[data[0].timestamp - 1, 1000],
        ...data.map((entry) => [entry.timestamp, entry.weatherInfo.atmosphericPressure])],
      dimensions: ['Timestamp', 'Atmospheric Pressure'].map(t),
    },
    series: [
      {
        name: t('Atmospheric Pressure'),
        type: 'bar',
        large: true,
        smooth: true,
        itemStyle: {
          color: '#536F86',
        },
        encode: {
          x: t('Timestamp'),
          y: t('Atmospheric Pressure'),
        },
        yAxisIndex: 0,
        areaStyle: {},
      },
    ],
    grid: {
      left: 60,
      right: 15,
    },
  };
}

export default function PressureChart({ t, data }) {
  return (
    <>
      <Chart options={pressureData(t, data)} />
    </>
  );
}

import Chart from "./Chart";
import React from "react";
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/custom';


function renderArrow(param, api) {
    var point = api.coord([
        api.value(0),
        api.value(1)
    ]);

    var arrowSize = 18;

    return {
        type: 'path',
        shape: {
            pathData: 'M62 0v15H0v16h62v16l41-24L62 0z',
            x: -arrowSize / 2,
            y: -arrowSize / 2,
            width: arrowSize,
            height: arrowSize
        },
        rotation: api.value(2),
        position: point,
        style: api.style({
            stroke: '#555',
            lineWidth: 1
        })
    };
}

function windData(data) {
    const dataSize = data.length;
    const dataStart = Math.min(99, Math.max(0, Math.round((dataSize-30)*100/dataSize)));

    return {
        title: {
            text: echarts.format.addCommas(data.length) + ' Datapoints',
        },
        legend: {
            top: 30,
        },
        xAxis: [
            {
                type: "time",
            },
        ],
        toolbox: {
            // y: 'bottom',
            feature: {
                magicType: {
                    type: ['line', 'bar'],
                    title: {
                        line: "Line",
                        bar: "Bar"
                    }
                },
                dataView: {
                    title: "Data view",
                    lang: ['Data view', 'Close', 'Refresh'],
                    optionToContent: function(opt) {
                        console.log(opt.dataset[0].source);
                        var axisData = opt.dataset[0].source;

                        console.log(axisData.length);
                        var series = opt.series;
                        var textArea = '<textarea style="width: 100%; height: 100%; font-family: monospace; font-size: 14px; line-height: 1.6rem; color: rgb(0, 0, 0); border-color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);">'
                            + '"Time",'
                            + '"' + series[0].name + '"'
                            + '"' + series[1].name + '"\n';
                        for (var i = 1, l = axisData.length; i < l; i++) {
                            textArea += axisData[i][0] + ','
                                + axisData[i][1] + ','
                                + axisData[i][2] + '\n';
                        }
                        textArea += '</textarea>';
                        return textArea;
                    },
                    readOnly: true
                },
                saveAsImage: {
                    pixelRatio: 4,
                    title: "Save Image"
                },
                restore: {
                    title: "Restore"
                },
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        dataZoom: [{
                type: 'inside',
                start: dataStart,
                end: 100,
                handleSize: 40,
                realtime: false,
                top: 'bottom'
            },
            {
                type: 'slider',
                start: dataStart,
                end: 100,
                handleSize: 40,
                realtime: false,
                top: 'bottom'
            }],
        yAxis: [
            {
                type: "value",
                name: "Velocity (km/h)",
                nameLocation: 'middle',
                nameGap: 25
            },
        ],
        dataset: {
            source: [[data[0].timestamp - 1, 0, 0],
                ...data.map((entry) =>
                    [entry.timestamp, entry.weatherInfo.windVelocity, entry.weatherInfo.windDirection])],
            dimensions: ['Timestamp', 'Wind Velocity', 'Wind Direction']
        },
        series: [
            {
                name: 'Velocity',
                type: 'line',
                large: true,
                smooth:true,
                itemStyle: {
                    color: "#536F86"
                },
                encode: {
                    x: 'Timestamp',
                    y: 'Wind Velocity'
                },
                // areaStyle: {}
            },
            {
                name: 'Direction',
                type: 'custom',
                renderItem: renderArrow,
                large: true,
                z: 10,
                itemStyle: {
                    color: "#fff"
                },
                encode: {
                    tooltip: 'Wind Direction'
                }
            }
        ],
        grid: {
            left: 40,
            right: 15
        }
    }
}

export default function WindChart({data}) {
    return (<>
        <Chart options={windData(data)}/>
    </>)
}
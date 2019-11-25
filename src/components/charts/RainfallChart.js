import Chart from "./Chart";
import React from "react";
import echarts from "echarts/lib/echarts";

function rainfallData(data) {
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
        // calculable : true,
        yAxis: [
            {
                type: "value",
                name: "Rainfall (mm)",
                nameLocation: 'middle',
                nameGap: 25
            },
            {
                type: "value",
                name: "Humidity (%)",
                nameLocation: 'middle',
                nameGap: 25
            },
        ],
        dataset: {
            source: [[data[0].timestamp - 1, 0, 0],
                ...data.map((entry) =>
                    [entry.timestamp, entry.weatherInfo.interiorTemperature, entry.weatherInfo.exteriorTemperature])],
            dimensions: ['Timestamp', 'Rainfall', 'Humidity']
        },
        series: [
            {
                name: 'Rainfall',
                type: 'bar',
                large: true,
                smooth:true,
                itemStyle: {
                    color: "#536F86"
                },
                encode: {
                    x: 'Timestamp',
                    y: 'Rainfall'
                },
                yAxisIndex: 0,
                areaStyle: {}
            },
            {
                name: 'Humidity',
                type: 'bar',
                large: true,
                smooth:true,
                itemStyle: {
                    color: "#FBB043"
                },
                encode: {
                    x: 'Timestamp',
                    y: 'Humidity'
                },
                yAxisIndex: 1,
                areaStyle: {}
            }
        ],
        grid: {
            left: 40,
            right: 40
        }
    }
}

export default function RainFallChart({data}) {
    return (<>
        <Chart options={rainfallData(data)}/>
    </>)
}
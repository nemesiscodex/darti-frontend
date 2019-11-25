import Chart from "./Chart";
import React from "react";
import echarts from "echarts/lib/echarts";

function sensorData(data) {

    let categoryData = data.reduce(function(map, value) {
        let index = parseInt(value.sensorIdentifier);
        map[index] = map[index] || 0;
        map[index] = map[index] + parseInt(value.activationCount);
        return map;
    }, {});

    let categories = Object.keys(categoryData).sort((a, b) => a - b);

    console.log(categories);

    return {
        title: {
            text: echarts.format.addCommas(data.length) + ' Datapoints',
        },
        legend: {
            top: 30,
        },
        xAxis: [
            {
                type: "category",
                data: categories
            },
        ],
        toolbox: {
            // y: 'bottom',
            feature: {
                dataView: {
                    title: "Data view",
                    lang: ['Data view', 'Close', 'Refresh'],
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
        yAxis: [
            {
                type: "value",
                name: "Activation Count",
                nameLocation: 'middle',
                nameGap: 50,
                scale: true
            },
        ],
        series: [
            {
                type: 'bar',
                itemStyle: {
                    color: "#536F86"
                },
                data: categories.map((category) => categoryData[category])
            },
        ],
        grid: {
            left: 70,
            right: 15
        }
    }
}

export default function SensorChart({data}) {
    return (<>
        <Chart options={sensorData(data)}/>
    </>)
}
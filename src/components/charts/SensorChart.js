import { Chart, addCommas } from "./Chart";


import React from "react";

function sensorData(t, data) {

    let categoryData = data.reduce(function(map, value) {
        let index = parseInt(value.sensorIdentifier);
        map[index] = map[index] || 0;
        map[index] = map[index] + parseInt(value.activationCount);
        return map;
    }, {});

    let categories = Object.keys(categoryData).sort((a, b) => a - b);

    return {
        aria: {
          show: true
        },
        title: {
            text: addCommas(data.length) + t(' Datapoints'),
        },
        legend: {
            top: 30,
        },
        xAxis: [
            {
                type: "category",
                data: categories,
                name: t("Sensor Identifier"),
                nameLocation: 'middle',
                nameGap: 25,
                scale: true
            },
        ],
        toolbox: {
            // y: 'bottom',
            feature: {
                dataView: {
                    title: t("Data view"),
                    lang: [t('Data view'), t('Close')],
                    readOnly: true,
                    optionToContent: function(opt) {
                        let axisData = opt.series[0].data;

                        let textArea = '<textarea style="width: 100%; height: 100%; font-family: monospace; font-size: 14px; line-height: 1.6rem; color: rgb(0, 0, 0); border-color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);">'
                            + '"' + t("Sensor Identifier") + '",'
                            + '"' + t("Activation Count") + '\n';
                        for (let i = 0, l = axisData.length; i < l; i++) {
                            textArea += categories[i] + ','
                                + axisData[i] + '\n';
                        }
                        textArea += '</textarea>';
                        return textArea;
                    },
                },
                saveAsImage: {
                    pixelRatio: 4,
                    title: t("Save Image")
                },
                restore: {
                    title: t("Restore")
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
                name: t("Activation Count"),
                nameLocation: 'middle',
                nameGap: 60,
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
            left: 75,
            right: 15
        }
    }
}

export default function SensorChart({t, data}) {
    return (<>
        <Chart options={sensorData(t, data)}/>
    </>)
}
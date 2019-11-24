import React from "react";
import Dashboard from "../components/Dashboard";
import fetch from 'isomorphic-unfetch';
import Grid from "@material-ui/core/Grid";
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";


const content = (data) => {


    function temperatureData() {
        return {
            title: {
                text: echarts.format.addCommas(data.length) + ' Datapoints',
                left: 10
            },
            legend: {
                data: ['Interior Temperature', 'Exterior Temperature']
            },
            xAxis: [
                {
                    type: "category",
                    inverse: true,
                    data: data.map((entry) => echarts.format.formatTime(entry.timestamp)),
                },
            ],
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['line', 'bar']
                    },
                    dataView: {
                        title: "Data view",
                        lang: ['Data view', 'Close', 'Refresh']
                    },
                    saveAsImage: {
                        pixelRatio: 2,
                        title: "Save as Image"
                    }
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            dataZoom: [{
                type: 'slider',
                start: 70,
                end: 100,
                handleSize: 40
            }],
            calculable : true,
            yAxis: [
                {
                    type: "value",
                },
            ],
            series: [
                {
                    name: 'Interior Temperature',
                    type: 'bar',
                    data: data.map((entry) => parseFloat(entry.weather_info.interior_temperature)),
                    // large: true,
                },
                {
                    name: 'Exterior Temperature',
                    type: 'bar',
                    data: data.map((entry) => parseFloat(entry.weather_info.exterior_temperature)),
                    // large: true,
                }
            ]
        }
    }


    const option = temperatureData();

    if(data) {
        return (
            <>
                <Grid container spacing={2} style={{marginTop: 2}}>
                    <Grid item xs={12}>
                        <Paper style={{padding: 10}}>
                            <Typography variant={"h4"}>
                                Chart
                            </Typography>
                            <ReactEchartsCore
                                echarts={echarts}
                                option={option}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    } else {
        return <>Nothing to show</>
    }

}

function charts({data}) {
    return <Dashboard title={"Charts"} content={content(data)} menuSelected={"charts"} user={null} />
}

charts.getInitialProps = async function() {
  const response = await fetch('http://localhost:9000/readings');
  const json = await response.json();
  return {
      data: json.data
  }
};

export default charts;
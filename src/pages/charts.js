import React from "react";
import Dashboard from "../components/Dashboard";
import fetch from 'isomorphic-unfetch';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TemperatureChart from '../components/charts/TemperatureChart';
import WindChart from "../components/charts/WindChart";
import RainFallChart from "../components/charts/RainfallChart";
import PressureChart from "../components/charts/PresureChart";
import SensorChart from "../components/charts/SensorChart";


const content = (readings, activations) => {

    console.log(readings.length);
    console.log(activations[0]);

    if(readings && readings.length > 0) {
        return (
            <>
                <Grid container spacing={2} style={{marginTop: 2, textAlign: "center"}}>
                    <Grid item xs={12}>
                        <Typography variant={"h4"}>
                            Sensor Activations
                        </Typography>
                        <SensorChart data={activations} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography variant={"h4"}>
                            Temperature
                        </Typography>
                        <TemperatureChart data={readings} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography variant={"h4"}>
                            Wind
                        </Typography>
                        <WindChart data={readings} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography variant={"h4"}>
                            Rainfall/Humidity
                        </Typography>
                        <RainFallChart data={readings} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography variant={"h4"}>
                            Atmospheric Pressure
                        </Typography>
                        <PressureChart data={readings} />
                    </Grid>
                </Grid>
            </>
        )
    } else {
        return (
            <>
                <Grid container spacing={3} style={{marginTop: 2}}>
                    <Grid item xs={12}>
                        <Paper style={{padding: 20, textAlign: "center"}}>
                            <Typography variant={"h4"}>
                                No data found.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    }

}

function charts({readings, activations}) {
    return <Dashboard title={"Charts"} content={content(readings.data, activations.data)} menuSelected={"charts"} user={null} />
}

async function getReadings() {
    const response = await fetch('http://localhost:9000/readings?elements=500');
    return await response.json();
}
async function getActivations() {
    const response = await fetch('http://localhost:9000/activations?elements=500');
    return await response.json();
}

charts.getInitialProps = async function() {
  return {
      readings: await getReadings(),
      activations: await getActivations()
  }
};

export default charts;
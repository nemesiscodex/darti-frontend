import React from "react";
import Dashboard from "../components/Dashboard";
import fetch from 'isomorphic-unfetch';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TemperatureChart from '../components/charts/TemperatureChart';
import WindChart from "../components/charts/WindChart";
import RainfallChart from "../components/charts/RainfallChart";
import PressureChart from "../components/charts/PressureChart";
import SensorChart from "../components/charts/SensorChart";
import CalendarChart from "../components/charts/CalendarChart";
import { withTranslation } from '../i18n'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh"
import backend from '../backend'

const datePicker = (t, selectedDate, setDate, label) => (

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            style={{width: "100%"}}
            disableToolbar
            autoOk
            disableFuture
            format={t("MM/dd/yyyy")}
            margin="normal"
            label={label}
            value={selectedDate}
            onChange={setDate}
            // views={["year", "month"]
            variant={"inline"}
        />
    </MuiPickersUtilsProvider>
);
const content = (t, readings, activations) => {

    const [readingsState, setReadings] = React.useState(readings);
    const [activationsState, setActivations] = React.useState(activations);
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);

    function changeDate(from, to) {
        return function() {
            if (from) {
                activations = activations.filter((a) => new Date(a.timestamp) >= new Date(from));
                readings = readings.filter((a) => new Date(a.timestamp) >= new Date(from));
            }

            if (to) {
                activations = activations.filter((a) => new Date(a.timestamp) <= new Date(to));
                readings = readings.filter((a) => new Date(a.timestamp) <= new Date(to));
            }

            setActivations(activations);
            setReadings(readings);
        }
    }

    if(readings && readings.length > 0 && activations && activations.length > 0) {
        return (
            <>
                <Grid container spacing={2} style={{marginTop: 2, textAlign: "center"}}>
                    <Grid item xs={12}>
                            <Grid container spacing={3} style={{padding: "5px"}}>
                                <Grid item lg={4} md={5} sm={12} xs={12}>
                                    {datePicker(t, fromDate, setFromDate, t("From Date"))}
                                </Grid>
                                <Grid item lg={4} md={5} sm={12} xs={12}>
                                    {datePicker(t, toDate, setToDate, t("To Date"))}
                                </Grid>
                                <Grid item lg={4} md={2} sm={12} xs={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <Button onClick={changeDate(fromDate, toDate)} variant={"outlined"} style={{marginTop: "25px", width:"100%"}}>
                                        <RefreshIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h4"}>
                            {t("Sensor Activations")}
                        </Typography>
                        <SensorChart t={t} data={activationsState} />
                    </Grid>
                    <Grid item xs={12}>
                        <CalendarChart t={t} data={activationsState} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography variant={"h4"}>
                            {t("Temperature")}
                        </Typography>
                        <TemperatureChart t={t} data={readingsState} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography variant={"h4"}>
                            {t("Wind")}
                        </Typography>
                        <WindChart t={t} data={readingsState} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography variant={"h4"}>
                            {t("Rainfall/Humidity")}
                        </Typography>
                        <RainfallChart t={t} data={readingsState} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography variant={"h4"}>
                            {t("Atmospheric Pressure")}
                        </Typography>
                        <PressureChart t={t} data={readingsState} />
                    </Grid>
                </Grid>
            </>
        )
    } else {
        return (
            <>
                <Grid container spacing={3} style={{marginTop: 2}}>
                    <Grid item xs={12}>
                        <Grid container spacing={3} style={{padding: "5px"}}>
                            <Grid item lg={4} md={5} sm={12} xs={12}>
                                {datePicker(t, fromDate, setFromDate, t("From Date"))}
                            </Grid>
                            <Grid item lg={4} md={5} sm={12} xs={12}>
                                {datePicker(t, toDate, setToDate, t("To Date"))}
                            </Grid>
                            <Grid item lg={4} md={2} sm={12} xs={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Button onClick={changeDate(fromDate, toDate)} variant={"outlined"} style={{marginTop: "25px", width:"100%"}}>
                                    <RefreshIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
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

};

function charts({t, readings, activations}) {
    return <Dashboard t={t} title={t("Charts")} content={content(t, readings.data, activations.data)} menuSelected={"charts"} user={null} />
}

async function getReadings() {
    const response = await fetch(backend + '/readings?elements=500');
    return await response.json();
}
async function getActivations() {
    const response = await fetch(backend + '/activations?elements=16000');
    return await response.json();
}

charts.getInitialProps = async function() {
    let [readings, activations] = await Promise.all([getReadings(), getActivations()]);
  return {
      readings: readings,
      activations: activations,
      namespacesRequired: ['common']
  }
};

export default withTranslation('common')(charts);
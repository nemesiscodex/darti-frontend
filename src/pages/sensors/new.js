import Dashboard from "../../components/Dashboard";
import React from "react";
import {withTranslation} from "../../i18n";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "../../components/Link";
import IconButton from "@material-ui/core/IconButton";
import MapIcon from "@material-ui/icons/LocationOn";
import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from "@material-ui/core/Modal";
import dynamic from "next/dynamic";
import Router from "next/router";
import fetch from 'isomorphic-unfetch';
import backend from '../../backend'

const useStyles = makeStyles(theme => ({
    grid: {
      textAlign: "center",
      marginTop: 2
    },
    form: {
        textAlign: "center"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 280,
    },
    paper: {
        // position: 'absolute',
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            height: "100%",
        },

        width: "80%",
        height: "80%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 0, 3),
        textAlign: "center"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: "100%",
        height: "calc(100% - 55px)"
    }
}));



function content(t) {

    const MapPicker = dynamic(() => import('../../components/maps/MapPicker'), {
        ssr: false
    });

    const [sensor, setSensor] = React.useState({
        identifier: "",
        sensorType: "KissingBug",
        areaIdentifier: "",
        latitude: "",
        longitude: ""
    });

    const [modalOpen, setModalOpen] = React.useState(false);

    function toggleModal() {
        setModalOpen(!modalOpen);
    }

    const handleChange = name => event => {
        console.log(event);
        setSensor({
            ...sensor,
            [name]: event.target.value,
        });
    };

    function handleLocationChange(center) {
        setSensor({
            ...sensor,
            latitude: center[0].toString(),
            longitude: center[1].toString()
        });
        toggleModal();
    }

    async function save() {

        let payload = {
            identifier: sensor.identifier,
            sensorType: sensor.sensorType,
            areaIdentifier: sensor.areaIdentifier,
            location: {
                latitude: sensor.latitude,
                longitude: sensor.longitude
            }
        };
        let result = await fetch(backend + "/sensors", {
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        console.log(result);
        Router.push('/sensors');
    }



    let classes = useStyles();

    return (<>
        <form autoComplete={"off"} className={classes.form}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            type={"number"}
                            label={t("Identifier")}
                            inputProps={{
                                name: 'identifier',
                                id: 'identifier',
                            }}
                            value={sensor.identifier}
                            onChange={handleChange('identifier')}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel required htmlFor="sensor-type">
                            {t("Sensor type")}
                        </InputLabel>
                        <Select
                            required
                            value={sensor.sensorType}
                            onChange={handleChange('sensorType')}
                            inputProps={{
                                name: 'sensorType',
                                id: 'sensor-type',
                            }}
                            native
                        >
                            <option value={"KissingBug"}>Kissing Bug</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label={t("Area Identifier")}
                            inputProps={{
                                name: 'areaIdentifier',
                                id: 'areaIdentifier',
                            }}
                            value={sensor.areaIdentifier}
                            type={"number"}
                            onChange={handleChange('areaIdentifier')}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            label={t("Latitude")}
                            inputProps={{
                                name: 'latitude',
                                id: 'latitude',
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleModal}><MapIcon /></IconButton>
                                    </InputAdornment>
                            }}
                            value={sensor.latitude}
                            onChange={handleChange('latitude')}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            label={t("Longitude")}
                            inputProps={{
                                name: 'longitude',
                                id: 'longitude',
                            }}
                            value={sensor.longitude}
                            onChange={handleChange('longitude')}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleModal}><MapIcon /></IconButton>
                                    </InputAdornment>
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid container item xs={6} justify={"flex-end"}>
                    <Link href={"/sensors"}>
                        <Button variant="contained" color="default">
                            Cancel
                        </Button>
                    </Link>
                </Grid>
                <Grid container item xs={6} justify={"flex-start"} >
                    <Button onClick={save} variant="contained" color="secondary">
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
        <Modal className={classes.modal} open={modalOpen} onClose={toggleModal}>
            <div className={classes.paper}>
                <MapPicker
                    className={classes.map}
                    latitude={sensor.latitude}
                    longitude={sensor.longitude}
                    onChange={handleLocationChange}
                />
            </div>
        </Modal>
    </>)
}

function newSensor({t}) {

    return <Dashboard t={t} title={t("New Sensor")} content={content(t)} menuSelected={"sensors"} user={null} />
}

export default withTranslation('common')(newSensor);
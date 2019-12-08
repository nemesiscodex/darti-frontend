import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import fetch from 'isomorphic-unfetch';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { TableBody } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import Grow from '@material-ui/core/Grow';
import theme from '../theme';
import Link from '../components/Link';
import backend from '../backend';
import { withTranslation } from '../i18n';
import Dashboard from '../components/Dashboard';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
  },
  paperBox: {
    boxShadow: '0px 2px 0px 0px #1f2b38',
  },
  table: {
    minWidth: '100%',
    '& td': {
      minWidth: '150px',
      textAlign: 'center',
    },
  },
  actions: {
    textAlign: 'right !important',
  },
}));

function sensorItem(sensor, classes) {
  return (

    <Grow in timeout={80 * sensor.identifier} key={sensor.identifier}>
      <Paper className={classes.paper} elevation={3}>

        <Hidden mdDown implementation="css" className={classes.paperBox}>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell>
                  {sensor.identifier}
                  <br />
                  <Typography variant="subtitle2">
                                        Identifier
                  </Typography>
                </TableCell>
                <TableCell>
                  {sensor.sensorType}
                  <Typography variant="subtitle2">
                                        Sensor Type
                  </Typography>
                </TableCell>
                <TableCell>
                  {(sensor.areaIdentifier) ? sensor.areaIdentifier : '-'}
                  <Typography variant="subtitle2">
                                        Area Identifier
                  </Typography>
                </TableCell>
                <TableCell>
                  {sensor.location.latitude}
                  <Typography variant="subtitle2">
                                        Latitude
                  </Typography>
                </TableCell>
                <TableCell>
                  {sensor.location.longitude}
                  <Typography variant="subtitle2">
                                        Longitude
                  </Typography>
                </TableCell>
                <TableCell className={classes.actions}>
                  <IconButton href="#" color="primary">
                    <LocationOnIcon />
                  </IconButton>
                  <IconButton href="#" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton href="#" color="primary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Hidden>
        <Hidden lgUp implementation="css" className={classes.paperBox}>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">
                                        Identifier
                  </Typography>
                </TableCell>
                <TableCell>
                  {sensor.identifier}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">
                                        Sensor Type
                  </Typography>
                </TableCell>
                <TableCell>
                  {sensor.sensorType}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">
                                        Area Identifier
                  </Typography>
                </TableCell>
                <TableCell>
                  {(sensor.areaIdentifier) ? sensor.areaIdentifier : '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">
                                        Latitude
                  </Typography>
                </TableCell>
                <TableCell>
                  {sensor.location.latitude}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">
                                        Longitude
                  </Typography>
                </TableCell>
                <TableCell>
                  {sensor.location.longitude}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <IconButton href="#" color="primary">
                    <LocationOnIcon />
                  </IconButton>
                  <IconButton href="#" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton href="#" color="primary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Hidden>
      </Paper>
    </Grow>
  );
}

function content(t, sensorsData) {
  let sensorList = [];

  if (sensorsData) {
    sensorList = sensorsData.data;
  }

  sensorList.sort((a, b) => parseInt(a.identifier) - parseInt(b.identifier));

  const classes = useStyles();
  return (
    <>
      {sensorList.map((sensor) => sensorItem(sensor, classes))}
      <Hidden lgUp>
        <Link href="/sensors/new">
          <Fab className={classes.fab}><AddIcon /></Fab>
        </Link>
      </Hidden>
    </>
  );
}

function toolbar(t) {
  if (useMediaQuery(theme.breakpoints.up('lg'))) {
    return (
      <Link href="/sensors/new">
        <Fab variant="extended" color="secondary">
          <AddIcon />
                    Add
        </Fab>
      </Link>
    );
  } return null;
}

function sensors({ t, sensorsData }) {
  return <Dashboard t={t} title={t('Sensors')} content={content(t, sensorsData)} menuSelected="sensors" toolbar={toolbar(t)} user={null} />;
}

async function getSensors() {
  const response = await fetch(`${backend}/sensors`);
  return await response.json();
}

sensors.getInitialProps = async function () {
  return {
    sensorsData: await getSensors(),
    namespacesRequired: ['common'],
  };
};

export default withTranslation('common')(sensors);

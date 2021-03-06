import IconButton from '@material-ui/core/IconButton/index';
import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import MapIcon from '@material-ui/icons/Map';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider/index';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import Drawer from '@material-ui/core/Drawer/index';
import Hidden from '@material-ui/core/Hidden/index';
import Link from '../Link';
import Darti from '../../icons/Darti';
import theme from '../../theme';
import { i18n } from '../../i18n';
import LangPicker from "./LangPicker";

function useStyles(drawerWidth) {
  return makeStyles((theme) => ({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-end',
      },
      [theme.breakpoints.up('xs')]: {
        justifyContent: 'center',
      },
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    darti: {
      fill: theme.palette.primary.main,
      height: '1.2em',
      marginRight: theme.spacing(2),
    },
    dartiButton: {
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  }))();
}

function menuItems(t, classes, open, openDrawer, closeDrawer, menuSelected) {
  function createItem({ key, title, icon }) {
    const CurrentIcon = icon;

    if (key.startsWith('divider')) {
      return <Divider key={key} />;
    }
    const href = `/${(key === 'home') ? '' : key}`;

    return (
      <ListItem
        key={key}
        selected={key === menuSelected}
        href={href}
        component={Link}
        style={(key === menuSelected) ? { backgroundColor: theme.palette.secondary.main } : {}}
        onClick={closeDrawer}
        button
      >
        <ListItemIcon><CurrentIcon style={{ color: theme.palette.primary.main }} /></ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    );
  }


  const items = [
    {
      key: 'home',
      title: t('Home'),
      icon: HomeIcon,
    },
    {
      key: 'map',
      title: t('Map'),
      icon: MapIcon,
    },
    {
      key: 'charts',
      title: t('Charts'),
      icon: InsertChartIcon,
    },
    {
      key: 'divider1',
    },
    {
      key: 'download',
      title: t('Download Data'),
      icon: CloudDownloadIcon,
    },
    {
      key: 'divider2',
    },
    {
      key: 'areas',
      title: t('Areas'),
      icon: LocationOnIcon,
    },
    {
      key: 'sensors',
      title: t('Sensors'),
      icon: TrackChangesIcon,
    },
    {
      key: 'users',
      title: t('Users'),
      icon: PeopleIcon,
    },
    {
      key: 'divider3',
    },
    {
      key: 'settings',
      title: t('Settings'),
      icon: SettingsIcon,
    },
    {
      key: 'logout',
      title: t('Log out'),
      icon: ExitToAppIcon,
    },
  ];

  return (
    <>
      <div className={classes.toolbar}>
        <IconButton
          className={classes.dartiButton}
          disableRipple
          disableFocusRipple
          aria-label="Darti Web Logo"
        >
          <Darti className={classes.darti} />
        </IconButton>

        <Hidden smUp implementation="css">
          <IconButton
            onClick={closeDrawer}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Hidden>
      </div>
      {items.map((item) => createItem({ ...item }))}

    </>
  );
}

function DashboardDrawer({
  t, drawerWidth, open, openDrawer, closeDrawer, menuSelected,
}) {
  const classes = useStyles(drawerWidth);

  const { language } = i18n;

  return (
    <>
      <Hidden smUp implementation="css">
        <SwipeableDrawer
          variant="temporary"
          onBackdropClick={closeDrawer}
          onOpen={openDrawer}
          onClose={closeDrawer}
          open={open}
          disableBackdropTransition
          disableDiscovery
        >
          {menuItems(t, classes, open, openDrawer, closeDrawer, menuSelected)}
          <LangPicker t={t} language={language} drawerWidth={drawerWidth} />
        </SwipeableDrawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
        >
          {menuItems(t, classes, open, openDrawer, closeDrawer, menuSelected)}
          <LangPicker t={t} language={language} drawerWidth={drawerWidth} />
        </Drawer>
      </Hidden>
    </>
  );
}

export default DashboardDrawer;

import IconButton from "@material-ui/core/IconButton";
import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import makeStyles from "@material-ui/core/styles/makeStyles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MapIcon from '@material-ui/icons/Map';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import Darti from "../icons/Darti";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import Link from "./Link";
import theme from '../theme'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Drawer} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";

function useStyles(drawerWidth) {
    return makeStyles(theme => ({
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                justifyContent: 'flex-end'
            },
            [theme.breakpoints.up('xs')]: {
                justifyContent: 'center'
            },
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        darti: {
            fill: theme.palette.primary.main,
            height: "1.2em",
            marginRight: theme.spacing(2),
        },
        dartiButton: {
            '&:hover': {
                backgroundColor: "rgba(0, 0, 0, 0)"
            }
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

function menuItems(classes, open, openDrawer, closeDrawer, menuSelected) {


    function createItem({key, title, icon}) {
        const CurrentIcon = icon;

        if (key.startsWith("divider")) {
            return <Divider key={key} />
        }
        const href = "/" + ((key === "home")? "": key);

        return (
            <ListItem
                key={key}
                selected={key === menuSelected}
                href={href}
                component={Link}
                onClick={closeDrawer}
                button>
                <ListItemIcon><CurrentIcon/></ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>
        )
    }


    const items = [
        {
            key: "home",
            title: "Home",
            icon: HomeIcon
        },
        {
            key: "map",
            title: "Map",
            icon: MapIcon
        },
        {
            key: "charts",
            title: "Charts",
            icon: InsertChartIcon
        },
        {
            key: "divider1"
        },
        {
            key: "download",
            title: "Download Data",
            icon: CloudDownloadIcon
        },
        {
            key: "divider2"
        },
        {
            key: "areas",
            title: "Areas",
            icon: LocationOnIcon
        },
        {
            key: "sensors",
            title: "Sensors",
            icon: TrackChangesIcon
        },
        {
            key: "users",
            title: "Users",
            icon: PeopleIcon
        },
        {
            key: "divider3"
        },
        {
            key: "settings",
            title: "Settings",
            icon: SettingsIcon
        },
        {
            key: "logout",
            title: "Log out",
            icon: ExitToAppIcon
        },
    ];

    return (<>
        <div className={classes.toolbar}>
            <IconButton className={classes.dartiButton}
                        disableRipple={true}
                        disableFocusRipple={true}
            >
                <Darti className={classes.darti} />
            </IconButton>

            <Hidden smUp implementation="css">
                <IconButton
                    onClick={closeDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Hidden>
        </div>
        <List>
            {items.map((item) => createItem({...item}))}
        </List>
    </>)
}

function DashboardDrawer({drawerWidth, open, openDrawer, closeDrawer, menuSelected}) {


    const classes = useStyles(drawerWidth);

    return (<>
        <Hidden xsUp implementation="css">
            <SwipeableDrawer
                variant={"temporary"}
                onBackdropClick={closeDrawer}
                onOpen={openDrawer}
                onClose={closeDrawer}
                open={open}
                disableBackdropTransition={true}
                disableDiscovery={true}
                >
                {menuItems(classes, open, openDrawer, closeDrawer, menuSelected)}
            </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant={"permanent"}
            >
                {menuItems(classes, open, openDrawer, closeDrawer, menuSelected)}
            </Drawer>
        </Hidden>
    </>)
}

export default DashboardDrawer
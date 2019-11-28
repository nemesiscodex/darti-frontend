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
import {Drawer} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TranslateIcon from "@material-ui/icons/Translate"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { i18n } from "../i18n";

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

function menuItems(t, classes, open, openDrawer, closeDrawer, menuSelected) {


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
            title: t("Home"),
            icon: HomeIcon
        },
        {
            key: "map",
            title: t("Map"),
            icon: MapIcon
        },
        {
            key: "charts",
            title: t("Charts"),
            icon: InsertChartIcon
        },
        {
            key: "divider1"
        },
        {
            key: "download",
            title: t("Download Data"),
            icon: CloudDownloadIcon
        },
        {
            key: "divider2"
        },
        {
            key: "areas",
            title: t("Areas"),
            icon: LocationOnIcon
        },
        {
            key: "sensors",
            title: t("Sensors"),
            icon: TrackChangesIcon
        },
        {
            key: "users",
            title: t("Users"),
            icon: PeopleIcon
        },
        {
            key: "divider3"
        },
        {
            key: "settings",
            title: t("Settings"),
            icon: SettingsIcon
        },
        {
            key: "logout",
            title: t("Log out"),
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

function DashboardDrawer({t, drawerWidth, open, openDrawer, closeDrawer, menuSelected}) {


    const classes = useStyles(drawerWidth);

    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (lang) => {
        return function() {
            i18n.changeLanguage(lang);
            handleClose();
        }
    };

    const language = i18n.language;

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
                {menuItems(t, classes, open, openDrawer, closeDrawer, menuSelected)}
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
                {menuItems(t, classes, open, openDrawer, closeDrawer, menuSelected)}
                <List>
                    <ListItem onClick={handleClick} href="#" >
                        <ListItemIcon><TranslateIcon /></ListItemIcon>
                        <ListItemText>{(language == "en")? t("English"): t("Spanish")}</ListItemText>
                        <ListItemIcon><ExpandMoreIcon /></ListItemIcon>
                    </ListItem>
                </List>
                <Menu
                    variant={"menu"}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                    <MenuItem
                        style={{width: drawerWidth-50}} onClick={changeLanguage("en")} selected={language === "en"}>
                        {t("English")}
                    </MenuItem>
                    <MenuItem onClick={changeLanguage("es")} selected={language === "es"}>
                        {t("Spanish")}
                    </MenuItem>
                </Menu>
            </Drawer>
        </Hidden>
    </>)
}

export default DashboardDrawer
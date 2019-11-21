import AppBar from "@material-ui/core/AppBar";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from 'clsx';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {SwipeableDrawer} from "@material-ui/core";
import Container from "@material-ui/core/Container";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
}));

function Dashboard() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    function openDrawer() {
        setOpen(true);
    }

    function closeDrawer() {
        setOpen(false);
    }

    return (<>
        <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
        >
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    aria-label="open drawer"
                    onClick={openDrawer}
                    color="inherit"
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    href='#'
                >
                    <Icon>menu</Icon>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            open={open}
            anchor="left"
            onBackdropClick={closeDrawer}
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
            }}
        >

            <div className={classes.toolbarIcon}>
                <IconButton
                    onClick={closeDrawer}
                    href='#'
                >
                    <Icon>chevron_left</Icon>
                </IconButton>
            </div>
            <Divider/>

            <List>
                <ListItem button>
                    <ListItemIcon>
                        <Icon>map</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Map"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Icon>insert_chart</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Charts"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Icon>bug_report</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Sensors"/>
                </ListItem>
            </List>
            <Divider/>
        </Drawer>
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
            </Container>
        </main>
    </>)
}


export default Dashboard
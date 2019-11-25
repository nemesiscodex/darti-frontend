import AppBar from "@material-ui/core/AppBar";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Container from '@material-ui/core/Container';
import makeStyles from "@material-ui/core/styles/makeStyles";
import DashboardDrawer from "./DashboardDrawer";
import theme from '../theme'
import Hidden from "@material-ui/core/Hidden";


const drawerWidth = 250;
const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        }
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
    darti: {
        fill: "#fff",
        height: "1.2em",
        marginRight: theme.spacing(2)
    }
}));

function Dashboard({title, menuSelected, content, user=null}) {

    function userLogin() {

        if(user) {
            return (<>
                <Typography variant="h5" className={classes.title}>
                    {user}
                </Typography>
            </>)
        } else {
            return (<IconButton color="inherit" >
                <AccountCircleIcon className={classes.menuButton}/>
                Log in
            </IconButton>)
        }

    }

    const [open, setOpen] = React.useState(false);

    const openDrawer = () => {
        setOpen(true);
    };

    const closeDrawer = () => {
        setOpen(false);
    };

    const classes = useStyles();
    return (<>
        <AppBar className={classes.root} position={"static"}>
            <Toolbar>
                <Hidden smUp implementation="css">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={openDrawer}>
                        <MenuIcon/>
                    </IconButton>
                </Hidden>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                {userLogin()}
            </Toolbar>
        </AppBar>
        <DashboardDrawer
            drawerWidth={drawerWidth}
            open={open}
            closeDrawer={closeDrawer}
            openDrawer={openDrawer}
            menuSelected={menuSelected}
        />
        <div className={classes.root}>
            <Container >
                {content}
            </Container>
        </div>
    </>)
}

export default Dashboard
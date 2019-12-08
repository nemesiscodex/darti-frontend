import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import DashboardDrawer from './DashboardDrawer';
import Link from './Link';


const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    margin: theme.spacing(0, 1, 0),
  },
  title: {
    flexGrow: 1,
  },
  darti: {
    fill: '#fff',
    height: '1.2em',
    marginRight: theme.spacing(2),
  },
}));

function Dashboard({
  t, title, menuSelected, content, toolbar = null, user = null,
}) {
  function userLogin() {
    if (user) {
      return (
        <>
          <Typography variant="h5" className={classes.title}>
            {user}
          </Typography>
        </>
      );
    }
    return (
      <Link href="/logout" className={classes.menuButton}>
        <Fab variant="extended" color="default">
          <AccountCircleIcon />
          {t('Log in')}
        </Fab>
      </Link>
    );
  }

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Hidden mdUp implementation="css">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={openDrawer}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {toolbar}
          {userLogin()}
        </Toolbar>
      </AppBar>
      <DashboardDrawer
        t={t}
        drawerWidth={drawerWidth}
        open={open}
        closeDrawer={closeDrawer}
        openDrawer={openDrawer}
        menuSelected={menuSelected}
      />
      <div className={classes.root}>
        <Container>
          {content}
        </Container>
      </div>
    </>
  );
}

export default Dashboard;

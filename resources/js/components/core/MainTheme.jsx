import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import config from '../../config';
import getNavItems from '../../core/navigation/getNavItems';
import {SnackbarProvider} from 'notistack';
import {createMuiTheme} from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import brown from '@material-ui/core/colors/brown';
import blue from '@material-ui/core/colors/blue';
import {default as MotionDrawer} from 'react-motion-drawer';
import classNames from 'classnames';

const drawerWidth = 240;

const mainTheme = createMuiTheme({
    palette: {
        primary: brown,
        secondary: blue,
    },
});

/* eslint-disable sort-keys */
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    buttonProgress: {
        backgroundColor: 'red',
    },
}));
/* eslint-enable sort-keys */

function MainTheme(props) {
    const {window, children} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (closeOnClick = false) => {
        const drawerProps = closeOnClick ? {onClick: handleDrawerToggle} : null;

        return (
            <div>
                <div className={classes.toolbar}/>
                <Divider/>
                <div {...drawerProps}>
                    {getNavItems()}
                </div>
            </div>
        );
    };

    // eslint-disable-next-line no-undefined
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={mainTheme}>
            <div className={classes.root}>
                <CssBaseline/>

                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        horizontal: 'center',
                        vertical: 'bottom',
                    }}
                    hideIconVariant
                >
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                {config.appTitle}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <nav className={classNames(classes.drawer, 'mobile-navigation')} aria-label="mailbox folders">
                        <Hidden mdUp implementation="css">
                            <MotionDrawer open={mobileOpen} onChange={handleDrawerToggle} handleWidth={50} overlayColor="transparent" zIndex={10}>
                                <Drawer
                                    container={container}
                                    variant="temporary"
                                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                    open={mobileOpen}
                                    onClose={handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    ModalProps={{
                                        keepMounted: true,
                                    }}
                                >
                                    {drawer(true)}
                                </Drawer>
                            </MotionDrawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer()}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>

                        {children}
                    </main>
                </SnackbarProvider>
            </div>
        </ThemeProvider>
    );
}

export default MainTheme;

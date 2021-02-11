import {
    Box,
    makeStyles,
    Switch,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { FC } from 'react';

const useStyles = makeStyles(() => ({
    headerBox: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    switcherBox: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    mob: {
        justifyContent: 'center',
    },
}));

type TProps = {
    isDark: boolean;
    setIsDark: (arg0: boolean) => void;
};

export const Header: FC<TProps> = ({ isDark, setIsDark }) => {
    // Theme preference
    const toggleTheme = () => {
        localStorage.setItem('Theme', isDark ? 'dark' : 'light');
        setIsDark(!isDark);
    };
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            <Box my={2} className={classes.headerBox}>
                <Typography variant="h5" component="h1">
                    Weather App
                </Typography>
                <Box
                    className={`${classes.switcherBox} ${
                        matches ? null : classes.mob
                    }`}>
                    <WbSunnyIcon />
                    <Switch checked={!isDark} onChange={toggleTheme} />
                    <Brightness3Icon />
                </Box>
            </Box>
        </>
    );
};

import { FC } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import imgSource from '../../assets/three-dots.svg';

const useStyles = makeStyles((theme: Theme) => ({
    loaderLight: {
        marginTop: '3.5rem',
        backgroundColor: theme.palette.background.paper,
        padding: '5px',
        borderRadius: '8px',
    },
    loaderDark: {
        marginTop: '3.5rem',
    },
}));

export const Preloader: FC = () => {
    const classes = useStyles();
    const theme = useTheme();

    return theme.palette.type === 'dark' ? (
        <img src={imgSource} alt="Loading..." className={classes.loaderDark} />
    ) : (
        <img src={imgSource} alt="Loading..." className={classes.loaderLight} />
    );
};

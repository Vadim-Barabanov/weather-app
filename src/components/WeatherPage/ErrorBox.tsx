import { Box, makeStyles } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { FC } from 'react';

const useStyles = makeStyles((theme) => ({
    errorTypoBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.2rem',
        color: theme.palette.secondary.light,
    },
}));

type TErrorBox = {
    error: any;
};

export const ErrorBox: FC<TErrorBox> = ({ error }) => {
    const classes = useStyles();

    return (
        <Box style={{ textAlign: 'center', fontSize: '20px' }}>
            {/* @ts-ignore*/}
            {error.message === 'Request failed with status code 404' ? (
                <Box className={classes.errorTypoBox}>
                    <span style={{ marginRight: '0.5rem' }}>
                        City not fount{' '}
                    </span>
                    <ErrorIcon />
                </Box>
            ) : (
                //@ts-ignore
                error.message
            )}
        </Box>
    );
};

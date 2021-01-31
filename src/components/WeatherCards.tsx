import React, { FC, useEffect, useState } from 'react';
import {
    Box,
    Container,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { weatherAPI } from '../api/api';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        padding: '20px',
        margin: '0 1rem',
        borderRadius: '10px',
        border: `1px solid ${theme.palette.primary.light}`,
    },
}));

export const WeatherCards = () => {
    const [wData, setWData] = useState({});

    useEffect(() => {
        setWData(weatherAPI.getWeatherData('Minsk'));
    }, []);

    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.root}>
            <WeatherCard data={wData} />
        </Container>
    );
};

type CardPropsType = {
    data: any;
};

const WeatherCard: FC<CardPropsType> = ({ data }) => {
    const handleCardCilck = () => {
        console.log('weathercardlick');
    };

    const classes = useStyles();
    return (
        <Box onClick={handleCardCilck} className={classes.card}>
            <Typography variant="h6">{JSON.stringify(data)}</Typography>
        </Box>
    );
};

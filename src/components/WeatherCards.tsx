import React, { FC, useEffect, useState } from 'react';
import {
    Box,
    Container,
    makeStyles,
    Theme,
    Typography,
    useTheme,
} from '@material-ui/core';
import { weatherAPI } from '../api/api';
import Preloader from '../assets/three-dots.svg';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    card: {
        padding: '1rem',
        margin: '1rem',
        width: '180px',
        borderRadius: '10px',
        border: `1px solid ${theme.palette.primary.light}`,
    },
}));

type WeatherCardsPropsType = {
    city: string;
};

export const WeatherCards: FC<WeatherCardsPropsType> = ({ city }) => {
    const [wData, setWData] = useState(null);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const classes = useStyles();
    const theme = useTheme();

    let today = new Date();
    let todayData: string = today.toJSON();
    todayData = todayData.slice(0, 10);

    useEffect(() => {
        setIsFetching(true);
        weatherAPI
            .getWeatherData(city)
            .then((res) => {
                setError(null);
                setWData(res.data);
                setIsFetching(false);
            })
            .catch((reason) => {
                setError(reason);
                setIsFetching(false);
            });
    }, [city]);

    let weatherCards: any[] = [];

    if (wData !== null) {
        //@ts-ignore
        weatherCards = wData.list.map((data: any) => {
            let sliced = data.dt_txt.slice(0, 10);
            if (sliced === todayData) {
                return <WeatherCard data={data} key={data.dt} />;
            } else {
                return null;
            }
        });
    }

    if (error) {
        return (
            <Box style={{ textAlign: 'center', fontSize: '20px' }}>
                {/* @ts-ignore*/}
                {error.message}
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            {isFetching && theme.palette.type === 'light' ? (
                <img
                    src={Preloader}
                    alt="Loading..."
                    style={{
                        marginTop: '3.5rem',
                        backgroundColor: theme.palette.background.paper,
                        padding: '5px',
                        borderRadius: '8px',
                    }}
                />
            ) : isFetching && theme.palette.type === 'dark' ? (
                <img
                    src={Preloader}
                    alt="Loading..."
                    style={{ marginTop: '3.5rem' }}
                />
            ) : (
                weatherCards
            )}
        </Container>
    );
};

type CardPropsType = {
    data: any;
};

const WeatherCard: FC<CardPropsType> = ({ data }) => {
    const handleCardCilck = () => {
        console.log('weathercard click action');
    };

    const baseImgURL = 'http://openweathermap.org/img/wn/';

    const t = data.dt_txt.slice(11, 16);
    let stringTime: string =
        t === '09:00'
            ? 'Morning'
            : t === '12:00'
            ? 'Midday'
            : t === '15:00'
            ? 'Afternoon'
            : t === '18:00'
            ? 'Evening'
            : t === '21:00'
            ? 'Night'
            : t;

    const classes = useStyles();
    return (
        <Box onClick={handleCardCilck} className={classes.card}>
            <Typography variant="h6">{stringTime}</Typography>
            <Typography
                style={{
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                }}
                component="p">
                <span>{Math.round(data.main.temp)} C&deg;</span>
                <img
                    src={`${baseImgURL + data.weather[0].icon}.png`}
                    alt="Weather"
                />
            </Typography>
            <Typography component="p">
                Feels like: {Math.round(data.main.feels_like)} C&deg;
            </Typography>
        </Box>
    );
};

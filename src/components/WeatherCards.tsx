import React, { ComponentType, FC, useEffect, useState } from 'react';
import {
    Box,
    Container,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { weatherAPI } from '../api/api';
import { TUnits } from '../App';
import ErrorIcon from '@material-ui/icons/Error';
import { Preloader } from '../common/Preloader/Preloader';

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
    mainTemp: {
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
    },
    errorTypoBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.2rem',
        color: theme.palette.secondary.light,
    },
}));

type TWeatherCards = {
    city: string;
    units: TUnits;
};

type TWeatherData = {
    list: any;
};

export const WeatherContainer: FC<TWeatherCards> = ({ city, units }) => {
    const [weatherData, setWeatherData] = useState<TWeatherData | undefined>(
        undefined
    );
    const [error, setError] = useState<{} | undefined>(undefined);
    const [isFetching, setIsFetching] = useState(false);
    const classes = useStyles();

    let today = new Date();
    let todayData: string = today.toJSON();
    todayData = todayData.slice(0, 10);

    useEffect(() => {
        setIsFetching(true);
        weatherAPI
            .getWeatherData(city, units)
            .then((res) => {
                setError(undefined);
                setWeatherData(res.data);
                setIsFetching(false);
            })
            .catch((reason) => {
                setError(reason);
                setIsFetching(false);
            });
    }, [city, units]);

    let weatherCards: ComponentType[] = [];

    if (weatherData) {
        weatherCards = weatherData.list.map((data: any) => {
            let sliced = data.dt_txt.slice(0, 10);
            if (sliced === todayData) {
                return <WeatherCard units={units} data={data} key={data.dt} />;
            } else {
                return null;
            }
        });
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            {isFetching ? (
                <Preloader />
            ) : error ? (
                <ErrorBox error={error} />
            ) : (
                weatherCards
            )}
        </Container>
    );
};

type TWeatherCard = {
    data: any;
    units: TUnits;
};

const WeatherCard: FC<TWeatherCard> = ({ data, units }) => {
    const handleCardCilck = () => {
        console.log('weathercard click action');
    };

    const baseImgURL = 'https://openweathermap.org/img/wn/';

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
            <Typography className={classes.mainTemp} component="p">
                <span>{Math.round(data.main.temp)}</span>
                <span>
                    {units === 'metric' ? (
                        <span>&deg;C</span>
                    ) : (
                        <span>&deg;F</span>
                    )}
                </span>
                <img
                    src={`${baseImgURL + data.weather[0].icon}.png`}
                    alt="Weather"
                />
            </Typography>
            <Typography component="p">
                Feels like {Math.round(data.main.feels_like)}
                <span>
                    {units === 'imperial' ? (
                        <span>&deg;F</span>
                    ) : (
                        <span>&deg;C</span>
                    )}
                </span>
            </Typography>
        </Box>
    );
};

type TErrorBox = {
    error: any;
};

const ErrorBox: FC<TErrorBox> = ({ error }) => {
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

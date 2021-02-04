import React, { ComponentType, FC, useEffect, useState } from 'react';
import {
    Box,
    Container,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { weatherAPI } from '../api/api';
import ErrorIcon from '@material-ui/icons/Error';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Preloader } from '../common/Preloader/Preloader';
import { TUnits } from '../common/types';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    arrowBtn: {
        padding: '0 1rem',
        justifySelf: 'center',
        alignSelf: 'center',
        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.secondary.light,
        },
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '1rem 1rem 0.5rem 1rem',
        margin: '1rem',
        width: '180px',
        borderRadius: '10px',
        border: `1px solid ${theme.palette.primary.light}`,
        transition: '0.3s',
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
    detailedBox: {
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
    const [detailedCards, setDetailedCards] = useState<number[] | []>([]);

    const addDetailedCard = (cardId: number) => {
        console.log('card added');
        setDetailedCards([...detailedCards, cardId]);
    };
    const removeDetailedCard = (cardId: number) => {
        console.log('card removed');
        setDetailedCards(detailedCards.filter((c) => cardId !== c));
    };

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
            let isDetailed = detailedCards.some((c) => c === data.dt);
            if (sliced === todayData) {
                return (
                    <WeatherCard
                        isDetailed={isDetailed}
                        addDetailedCard={addDetailedCard}
                        removeDetailedCard={removeDetailedCard}
                        units={units}
                        data={data}
                        id={data.dt}
                        key={data.dt}
                    />
                );
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
    id: number;
    data: any;
    units: TUnits;
    isDetailed: boolean;
    addDetailedCard: (cardId: number) => void;
    removeDetailedCard: (cardId: number) => void;
};

const WeatherCard: FC<TWeatherCard> = ({
    id,
    data,
    units,
    isDetailed,
    addDetailedCard,
    removeDetailedCard,
}) => {
    const handleCardCilck = () => {
        if (isDetailed) {
            removeDetailedCard(id);
        } else {
            addDetailedCard(id);
        }
    };

    console.log('card ' + data.dt + ' detailed is ' + isDetailed);
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
    const jsxUnits = (
        <span>
            {units === 'metric' ? <span>&deg;C</span> : <span>&deg;F</span>}
        </span>
    );
    return (
        <Box className={classes.card}>
            <Typography variant="h6">{stringTime}</Typography>
            <Typography className={classes.mainTemp} component="p">
                <span>{Math.round(data.main.temp)}</span>
                {jsxUnits}
                <img
                    src={`${baseImgURL + data.weather[0].icon}.png`}
                    alt="Weather"
                />
            </Typography>
            <Typography component="p">
                Feels like {Math.round(data.main.feels_like)}
                {jsxUnits}
            </Typography>
            <Box className={classes.arrowBtn} onClick={handleCardCilck}>
                {isDetailed ? (
                    <ExpandLessIcon style={{ alignSelf: 'center' }} />
                ) : (
                    <ExpandMoreIcon />
                )}
            </Box>

            {isDetailed ? (
                <Box className={classes.detailedBox}>
                    <Typography component="p">
                        Humidity: {data.main.humidity} %
                    </Typography>
                    <Typography component="p">
                        <span>Max temp: {Math.round(data.main.temp_max)} </span>
                        {jsxUnits}
                    </Typography>
                    <Typography component="p">
                        <span>Min temp: {Math.round(data.main.temp_min)} </span>
                        {jsxUnits}
                    </Typography>
                    <Typography component="p">
                        Wind speed: {Math.round(data.wind.speed)} m/s
                    </Typography>
                </Box>
            ) : null}
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

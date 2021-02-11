import { Chart } from './Chart';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import React, { ComponentType, FC, useEffect, useState } from 'react';
import { weatherAPI } from '../../api/api';
import { Preloader } from '../../common/Preloader/Preloader';
import { TUnits } from '../../common/types';
import { ErrorBox } from './ErrorBox';
import { WeatherCard } from './WeatherCard';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    cardsBox: {
        maxWidth: '700px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: '2rem',
    },
}));

type TWeatherCards = {
    city: string;
    units: TUnits;
};

type TWeatherData = {
    list: any;
};

export const WeatherPage: FC<TWeatherCards> = ({ city, units }) => {
    const [weatherData, setWeatherData] = useState<TWeatherData | undefined>(
        undefined
    );
    const [error, setError] = useState<{} | undefined>(undefined);
    const [isFetching, setIsFetching] = useState(false);
    const classes = useStyles();
    const [detailedCards, setDetailedCards] = useState<number[] | []>([]);

    const addDetailedCard = (cardId: number) => {
        setDetailedCards([...detailedCards, cardId]);
    };
    const removeDetailedCard = (cardId: number) => {
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
                console.log(res.data);
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
                <Box>
                    <Typography
                        component="h2"
                        variant="h4"
                        style={{
                            textAlign: 'center',
                            margin: '30px 0 15px 0',
                        }}>
                        {`${city} today:`}
                    </Typography>
                    <Box className={classes.cardsBox}>{weatherCards}</Box>
                    <Box className={classes.cardsBox}>
                        {weatherData ? (
                            <Chart data={weatherData} units={units} />
                        ) : null}
                    </Box>
                </Box>
            )}
        </Container>
    );
};

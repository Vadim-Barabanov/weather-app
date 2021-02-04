import { Container, makeStyles } from '@material-ui/core';
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

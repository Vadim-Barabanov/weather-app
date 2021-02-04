import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { FC } from 'react';
import { TUnits } from '../../common/types';
import { Typography, Box, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
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
    detailedBox: {
        color: theme.palette.secondary.light,
    },
}));

type TWeatherCard = {
    id: number;
    data: any;
    units: TUnits;
    isDetailed: boolean;
    addDetailedCard: (cardId: number) => void;
    removeDetailedCard: (cardId: number) => void;
};

export const WeatherCard: FC<TWeatherCard> = ({
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
    const adaptUnits = (
        <span>
            {units === 'metric' ? <span>&deg;C</span> : <span>&deg;F</span>}
        </span>
    );
    return (
        <Box className={classes.card}>
            <Typography variant="h6">{stringTime}</Typography>
            <Typography className={classes.mainTemp} component="p">
                <span>{Math.round(data.main.temp)}</span>
                {adaptUnits}
                <img
                    src={`${baseImgURL + data.weather[0].icon}.png`}
                    alt="Weather"
                />
            </Typography>
            <Typography component="p">
                Feels like {Math.round(data.main.feels_like)}
                {adaptUnits}
            </Typography>
            <Box className={classes.arrowBtn} onClick={handleCardCilck}>
                {isDetailed ? (
                    <ExpandLessIcon style={{ alignSelf: 'center' }} />
                ) : (
                    <ExpandMoreIcon />
                )}
            </Box>

            {isDetailed ? (
                <DetailedBox data={data} adaptUnits={adaptUnits} />
            ) : null}
        </Box>
    );
};

type TDetailedBox = {
    data: any;
    adaptUnits: any;
};

const DetailedBox: FC<TDetailedBox> = ({ data, adaptUnits }) => {
    const classes = useStyles();

    return (
        <Box className={classes.detailedBox}>
            <Typography component="p">
                Humidity: {data.main.humidity} %
            </Typography>
            <Typography component="p">
                <span>Max temp: {Math.round(data.main.temp_max)} </span>
                {adaptUnits}
            </Typography>
            <Typography component="p">
                <span>Min temp: {Math.round(data.main.temp_min)} </span>
                {adaptUnits}
            </Typography>
            <Typography component="p">
                Wind speed: {Math.round(data.wind.speed)} m/s
            </Typography>
        </Box>
    );
};

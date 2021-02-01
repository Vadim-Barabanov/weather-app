import {
    Box,
    Container,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { FC } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        padding: '1.5rem',
        margin: '0 1rem',
        borderRadius: '10px',
        border: `1px solid ${theme.palette.primary.light}`,
        transition: '0.3s',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.background.paper,
        },
    },
}));

type CityCardsPropsType = {
    changeCity: (city: string) => void;
};

export const CityCards: FC<CityCardsPropsType> = ({ changeCity }) => {
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.root}>
            <CityCard city="Kyiv" changeCity={changeCity} />
            <CityCard city="Minsk" changeCity={changeCity} />
            <CityCard city="Paris" changeCity={changeCity} />
            <CityCard city="Oslo" changeCity={changeCity} />
        </Container>
    );
};

type CardPropsType = {
    city: string;
    changeCity: (city: string) => void;
};

const CityCard: FC<CardPropsType> = ({ city, changeCity }) => {
    const handleCardCilck = () => {
        changeCity(city);
    };

    const classes = useStyles();
    return (
        <Box onClick={handleCardCilck} className={classes.card}>
            <Typography variant="h6">{city}</Typography>
        </Box>
    );
};

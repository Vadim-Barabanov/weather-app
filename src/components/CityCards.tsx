import {
    Box,
    Container,
    makeStyles,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { FC } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    card: {
        padding: '1.5rem',
        margin: '1rem',
        borderRadius: '10px',
        border: `1px solid ${theme.palette.primary.light}`,
        transition: '0.3s',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.background.paper,
        },
    },
    none: {
        display: 'none',
    },
}));

type CityCardsPropsType = {
    changeCity: (city: string) => void;
};

export const CityCards: FC<CityCardsPropsType> = ({ changeCity }) => {
    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    // To add city card, just add the name of the city to array:
    const cities = ['Kyiv', 'Minsk', 'Toronto', 'Oslo'];

    return (
        <Container
            maxWidth="md"
            className={`${classes.root} ${matches ? null : classes.none}`}>
            {cities.map((c) => (
                <CityCard city={c} changeCity={changeCity} key={c} />
            ))}
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

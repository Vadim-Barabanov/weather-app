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

export const CityCards = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="md" className={classes.root}>
            <CityCard city="Kyiv" />
            <CityCard city="Minsk" />
            <CityCard city="Paris" />
            <CityCard city="Oslo" />
        </Container>
    );
};

type CardPropsType = {
    city: string;
};

const CityCard: FC<CardPropsType> = ({ city }) => {
    const handleCardCilck = () => {
        console.log('cardlick');
    };

    const classes = useStyles();
    return (
        <Box onClick={handleCardCilck} className={classes.card}>
            <Typography variant="h6">{city}</Typography>
        </Box>
    );
};

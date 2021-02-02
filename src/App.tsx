import {
    Box,
    Container,
    Switch,
    Typography,
    useMediaQuery,
} from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline';
import {
    createMuiTheme,
    makeStyles,
    ThemeProvider,
    useTheme,
} from '@material-ui/core/styles';
import React, { useState } from 'react';
import './App.css';
import { CityCards } from './components/CityCards';
import { InputBar } from './components/InputBar';
import { WeatherCards } from './components/WeatherCards';
import { dark, light } from './themes/default';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

const useStyles = makeStyles(() => ({
    switcherBox: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    swBphone: {
        justifyContent: 'center',
    },
}));

export type TUnits = 'metric' | 'imperial' | '';

const App = () => {
    // Theme preference
    const toggler = localStorage.getItem('Theme');
    const [theme, setTheme] = useState(toggler === 'dark' ? false : true);
    const appliedTheme = createMuiTheme(theme ? light : dark);
    const toggleTheme = () => {
        localStorage.setItem('Theme', theme ? 'dark' : 'light');
        setTheme(!theme);
    };
    const classes = useStyles();
    const themeQ = useTheme();
    const matches = useMediaQuery(themeQ.breakpoints.up('sm'));

    // Initial data
    const [city, setCity] = useState('Kyiv');

    const [units, setUnits] = useState<TUnits>('metric');

    const changeUnits = (value: TUnits) => {
        setUnits(value);
    };

    const changeCity = (value: string) => {
        setCity(value);
    };

    return (
        <ThemeProvider theme={appliedTheme}>
            <CssBaseLine />
            <Container maxWidth="lg">
                <Box
                    className={`${classes.switcherBox} ${
                        matches ? null : classes.swBphone
                    }`}>
                    <WbSunnyIcon />
                    <Switch checked={!theme} onChange={toggleTheme} />
                    <Brightness3Icon />
                </Box>
                <Box
                    my={4}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Weather App
                    </Typography>
                </Box>
                <Box my={4}>
                    <InputBar
                        changeUnits={changeUnits}
                        changeCity={changeCity}
                    />
                    <CityCards changeCity={changeCity} />
                    <Typography
                        component="h2"
                        variant="h4"
                        style={{
                            textAlign: 'center',
                            margin: '30px 0 15px 0',
                        }}>
                        {city + ' today:'}
                    </Typography>
                    <WeatherCards units={units} city={city} />
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default App;

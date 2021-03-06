import { Box, Container } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import './App.css';
import { INITIAL_CITY, INITIAL_UNITS } from './common/constants';
import { TUnits } from './common/types';
import { CityCards } from './components/CityCards';
import { Header } from './components/Header';
import { InputBar } from './components/InputBar';
import { WeatherPage } from './components/WeatherPage/WeatherPage';
import { dark, light } from './themes/default';

const App = () => {
    const toggler = localStorage.getItem('Theme');
    const [isDark, setIsDark] = useState(toggler === 'dark' ? false : true);
    const [city, setCity] = useState(INITIAL_CITY);
    const [units, setUnits] = useState<TUnits>(INITIAL_UNITS);
    const appliedTheme = createMuiTheme(isDark ? light : dark);

    const changeUnits = (value: TUnits) => {
        setUnits(value);
    };
    const changeCity = (value: string) => {
        setCity(value);
    };

    return (
        <ThemeProvider theme={appliedTheme}>
            <Header isDark={isDark} setIsDark={setIsDark} />
            <CssBaseLine />
            <Container maxWidth="lg">
                <Box my={4}>
                    <InputBar
                        changeUnits={changeUnits}
                        changeCity={changeCity}
                    />
                    <CityCards changeCity={changeCity} />
                    <WeatherPage units={units} city={city} />
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default App;

import { Box, Container, Switch, Typography } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import './App.css';
import { CityCards } from './components/CityCards';
import { InputBar } from './components/InputBar';
import { WeatherCards } from './components/WeatherCards';
import { dark, light } from './themes/default';

const App = () => {
    // Theme swither & saving theme between page realoading
    const toggler = localStorage.getItem('Theme');
    const [theme, setTheme] = useState(toggler === 'dark' ? false : true);
    const appliedTheme = createMuiTheme(theme ? light : dark);
    const toggleTheme = () => {
        localStorage.setItem('Theme', theme ? 'dark' : 'light');
        setTheme(!theme);
    };

    // Initial city
    const [city, setCity] = useState('Kyiv');

    const changeCity = (value: string) => {
        setCity(value);
    };

    return (
        <ThemeProvider theme={appliedTheme}>
            <CssBaseLine />
            <Container maxWidth="lg">
                <Box
                    my={4}
                    style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Weather App
                    </Typography>
                    <Switch checked={!theme} onChange={toggleTheme} />
                </Box>
                <Box my={4}>
                    <InputBar changeCity={changeCity} />
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
                    <WeatherCards city={city} />
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default App;

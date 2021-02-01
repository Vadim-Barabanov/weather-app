import { Box, Container, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
// Material-UI
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { light, dark } from './themes/default';
import { InputBar } from './components/InputBar';
import { WeatherCards } from './components/WeatherCards';
import { CityCards } from './components/CityCards';

const App = () => {
    const [theme, setTheme] = useState(true);
    const [city, setCity] = useState('Kyiv');

    const changeCity = (value: string) => {
        setCity(value);
    };

    const appliedTheme = createMuiTheme(theme ? light : dark);

    return (
        <ThemeProvider theme={appliedTheme}>
            <CssBaseLine />
            <Container maxWidth="lg">
                <Box
                    my={4}
                    style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Weater App
                    </Typography>
                    <Switch
                        checked={!theme}
                        onChange={() => setTheme(!theme)}
                    />
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

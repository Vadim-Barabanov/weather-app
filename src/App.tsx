import { Box, Container, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
// Material-UI
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { light, dark } from './themes/default';

const App = () => {
    const [theme, setTheme] = useState(true);

    const appliedTheme = createMuiTheme(theme ? light : dark);

    return (
        <ThemeProvider theme={appliedTheme}>
            <CssBaseLine />
            <Container maxWidth="sm">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Hi world!
                    </Typography>
                    <Switch
                        checked={!theme}
                        onChange={() => setTheme(!theme)}
                    />
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default App;

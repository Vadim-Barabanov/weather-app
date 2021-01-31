import { Container, makeStyles, TextField } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export const InputBar = () => {
    const [value, setValue] = useState('');
    const classes = useStyles();

    const submit = () => {
        console.log(value);
    };

    const handleKeyPress = (e: any) => {
        if (e!.key === 'Enter') {
            submit();
        }
    };

    return (
        <Container className={classes.root} maxWidth="sm">
            <TextField
                name="city"
                variant="outlined"
                placeholder="Kyiv"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={submit}
                onKeyPress={handleKeyPress}
            />
        </Container>
    );
};

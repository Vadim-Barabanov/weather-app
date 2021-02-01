import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import { FC, useState } from 'react';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

type InputBarPropsType = {
    changeCity: (city: string) => void;
};

export const InputBar: FC<InputBarPropsType> = ({ changeCity }) => {
    const [value, setValue] = useState('');
    const classes = useStyles();

    const submit = () => {
        if (!value) return 0;
        changeCity(value);
        setValue('');
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
                placeholder="Your city"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <Button
                onClick={submit}
                style={{ marginTop: '20px' }}
                variant="contained">
                Get forecast
            </Button>
        </Container>
    );
};

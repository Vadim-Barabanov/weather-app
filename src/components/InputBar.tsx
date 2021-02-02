import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { Settings } from './Settings';
import { TUnits } from '../App';

const useStyles = makeStyles(() => ({
    root: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridTemplateRows: 'fr 1fr',
        gridGap: '2rem',
        alignItems: 'center',
    },
    textfield: {
        gridColumn: '1/3',
        justifySelf: 'center',
    },
    btn: {
        justifySelf: 'flex-end',
    },
}));

type InputBarPropsType = {
    changeCity: (city: string) => void;
    changeUnits: (value: TUnits) => void;
};

export const InputBar: FC<InputBarPropsType> = ({
    changeCity,
    changeUnits,
}) => {
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
                className={classes.textfield}
                name="city"
                variant="outlined"
                placeholder="Your city"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <Button
                onClick={submit}
                className={classes.btn}
                variant="contained">
                Get forecast
            </Button>
            <Settings changeUnits={changeUnits} />
        </Container>
    );
};

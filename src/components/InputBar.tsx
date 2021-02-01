import { Container, makeStyles, TextField } from '@material-ui/core';
import { FC, useState } from 'react';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

type InputBarPropsType = {
    changeCity: (city: string) => void;
};

export const InputBar: FC<InputBarPropsType> = ({ changeCity }) => {
    const [value, setValue] = useState('');
    const classes = useStyles();

    const submit = () => {
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
        </Container>
    );
};

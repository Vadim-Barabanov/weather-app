import { IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { FC } from 'react';
import { TUnits } from '../App';

type TProps = {
    changeUnits: (value: TUnits) => void;
};

export const Settings: FC<TProps> = ({ changeUnits }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e: any) => {
        if (e.target.innerText === 'Celsius') {
            changeUnits('metric');
        } else if (e.target.innerText === 'Fahrenheit') {
            changeUnits('imperial');
        }
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <SettingsIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>Celsius</MenuItem>
                <MenuItem onClick={handleClose}>Fahrenheit</MenuItem>
            </Menu>
        </div>
    );
};

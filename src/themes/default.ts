type ThemeType = {
    palette: {
        type: 'light' | 'dark' | undefined;
    };
};

export const light: ThemeType = {
    palette: {
        type: 'light',
    },
};

export const dark: ThemeType = {
    palette: {
        type: 'dark',
    },
};

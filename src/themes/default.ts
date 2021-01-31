type ThemeType = {
    palette: {
        type: 'light' | 'dark' | undefined;
        background?: {
            paper: string;
        };
    };
};

export const light: ThemeType = {
    palette: {
        type: 'light',
        background: {
            paper: '#ddd',
        },
    },
};

export const dark: ThemeType = {
    palette: {
        type: 'dark',
    },
};

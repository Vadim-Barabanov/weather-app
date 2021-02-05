type ThemeType = {
    palette: {
        type: 'light' | 'dark' | undefined;
        background?: {
            default: string;
            paper: string;
        };
    };
};

export const light: ThemeType = {
    palette: {
        type: 'light',
        background: {
            default: '#F8F8FF',
            paper: '#ddd',
        },
    },
};

export const dark: ThemeType = {
    palette: {
        type: 'dark',
    },
};

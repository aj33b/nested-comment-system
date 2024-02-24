import { createTheme } from "@mui/material";

interface CustomColors {
    grey: string;
    grey48: string;
    darkGrey: string;
    fixedButton: string;
    midGrey: string;
    border: string;
    tableHeader: string;
    lightBlue: string;
    aliceBlue: string;
    mediumCyan: string;
}

interface MaxWidth {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

interface WidthHeight {
    width?: string;
    height?: string;
}
interface Measurements {
    header: WidthHeight;
    sidebar: WidthHeight;
    footer: WidthHeight;
    content: WidthHeight;
}

const headerHeight = '4rem';
const sidebarWidth = '18rem';

const measurements: Measurements = {
    header: { height: headerHeight, width: `calc(100% - ${sidebarWidth})` },
    sidebar: { width: sidebarWidth },
    content: { height: `calc(100vh - ${headerHeight})` },
    footer: { height: '4rem' },
};

declare module '@mui/material/styles/createTypography' {
    interface TypographyOptions {
        fontWeightSemiBold?: number;
    }
}

declare module '@mui/material/styles' {
    interface Theme {
        colors: CustomColors;
        maxWidths: MaxWidth;
        measurements: Measurements;
        activeNavLink: Record<string, string | number>;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        colors?: Partial<CustomColors>;
        maxWidths?: Partial<MaxWidth>;
        measurements?: Partial<Measurements>;
        activeNavLink?: Partial<Record<string, string | number>>;
    }
}

export const theme = createTheme({
    typography: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightSemiBold: 600,
        fontWeightBold: 700,
        h1: {
            fontSize: '3.875rem',
            lineHeight: '5.8125rem',
        },
        h2: {
            fontSize: '3rem',
            lineHeight: '4.5rem',
        },
        h3: {
            fontSize: '2.5rem',
            lineHeight: '3.75rem',
        },
        h4: {
            fontSize: '2rem',
            lineHeight: '3rem',
        },
        h5: {
            fontSize: '1.5625rem',
            lineHeight: '2.34375rem',
        },
        h6: {
            fontSize: '1.250rem',
            lineHeight: '1.875rem',
        },
        //p
        body1: {
            fontSize: '1rem',
            lineHeight: '1.5rem',
        },
        //sm
        subtitle1: {
            fontSize: '0.875rem',
            lineHeight: '1.3125rem',
        },
        //xs
        subtitle2: {
            fontSize: '0.75rem',
            lineHeight: '1.125rem',
        },
    },
    maxWidths: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1280,
        xl: 1536,
    },
    measurements,
    colors: {
        grey: '#BFBFBF',
        midGrey: '#5A5A5A',
        border: '#999999',
        grey48: '#7a7a7a',
        fixedButton: '#F2F2F2',
        darkGrey: '#666666',
        tableHeader: '#DDF3FC',
        lightBlue: '#DDF3FC',
        aliceBlue: '#E5F0F7',
        mediumCyan: '#0077AA',
    },

    palette: {
        mode: 'light',
        primary: {
            main: '#005A80',
            dark: '#004866',
            light: '#337B99',
        },
        secondary: {
            main: '#994421',
            dark: '#7A361A',
            light: '#AD694D',
        },
        warning: {
            main: '#FFA500',
            dark: '##CC8400',
            light: '#FFA500',
        },
        success: {
            main: '#1E9966',
            dark: '#00CC00',
            light: '#33FF33',
        },
        error: {
            main: '#FF0000',
            dark: '#CC0000',
            light: '#FF3333',
        },
        background: {
            paper: '#fff',
            default: '#fafafa',
        },
    },

    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) => ({
                    [theme.breakpoints.up('xs')]: {
                        maxWidth: '100%',
                    },
                    [theme.breakpoints.up('sm')]: {
                        maxWidth: theme.maxWidths.sm,
                    },
                    [theme.breakpoints.up('md')]: {
                        maxWidth: theme.maxWidths.md,
                    },
                    [theme.breakpoints.up('lg')]: {
                        maxWidth: theme.maxWidths.lg,
                    },
                    [theme.breakpoints.up('xl')]: {
                        maxWidth: theme.maxWidths.xl,
                    },
                }),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: () => ({
                    textTransform: 'none',
                }),
            },
        },
    },
});

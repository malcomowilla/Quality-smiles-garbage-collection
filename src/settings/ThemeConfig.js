import { createTheme } from '@mui/material/styles';

const defaultTheme = {
  primary: '#1976d2',
  secondary: '#dc004e',
  background: '#ffffff',
  primary_color: '#008000',
  secondary_color: '#dc004e',
  background_color: '#ffffff',
  text: '#000000',
  sidebar_color: '#1a237e',
  sidebar: '#1a237e',
  header: '#f5f5f5',
  accent: '#2196f3',
  success: '#4caf50',
  warning: '#ff9800',
  header_color: '#2196f3',
  error: '#f44336',
  text_color: '#000000',
   accent_color: '#ff4081',
   sidebar_menu_items_background_color_active: '#008000',


};

export const createCustomTheme = (colors = defaultThemeColors) => {
  const safeColors = {
    ...defaultThemeColors,
    ...colors
  };

  return createTheme({
    palette: {
      primary: {
        main: safeColors.primary_color,
      },
      secondary: {
        main: safeColors.secondary_color,
      },
      background: {
        default: safeColors.background_color,
      },
      text: {
        primary: safeColors.text_color,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--primary-color': safeColors.primary_color,
            '--header-color': safeColors.header_color,
            '--accent-color': safeColors.accent_color,
            '--sidebar-menu-items-background-color-active': safeColors.sidebar_menu_items_background_color_active,
          },
        },
      },
    },
  });
};
export const defaultThemeColors = defaultTheme;

import { createContext, useContext, useState, useEffect } from 'react';

const LayoutSettingsContext = createContext();

const defaultSettings = {
  sidebarPosition: 'left',
  sidebarCollapsed: false,
  theme: 'light',
  colorScheme: 'green',
  borderColorFocused: 'border_focused_green', 
  colorSchemeWarn: 'warn_red',
  fontSize: 'medium',
  borderRadius: 'medium',
  compactMode: false,
  sidebarOrientation: 'vertical', 

};




// Color scheme CSS variables
const colorSchemeVariables = {

  border_focused_green: {
    lightest_green: '#f0fdf4',  // Lightest - Background hints
    super_light_green: '#dcfce7', // Super light - Subtle borders
    very_light_green: '#bbf7d0', // Very light - Hover states
    light_green: '#86efac', // Light - Active states
    medium_light_green: '#4ade80', // Medium light - Secondary actions
    base_green: '#22c55e', // Base - Primary actions
    medium_dark_green: '#16a34a', // Medium dark - Pressed states
    dark_green: '#15803d', // Dark - Focus rings
    very_dark_green: '#166534', // Very dark - Text on light
    super_dark_green: '#14532d', // Super dark - Headings
    darkest_green: '#052e16'  // Darkest - Deep backgrounds
    
  },



  border_focused_orange: {
    lightest_orange: '#fff7ed',  // Lightest - Soft background
    pearl_orange: '#ffedd5', // Pearl orange - Subtle highlights
    pale_orange: '#fed7aa', // Pale orange - Hover effects
    light_orange: '#fdba74', // Light orange - Active elements
    bright_orange: '#fb923c', // Bright orange - Secondary actions
    pure_orange: '#f97316', // Pure orange - Primary actions
    deep_orange: '#ea580c', // Deep orange - Pressed states
    burnt_orange: '#c2410c', // Burnt orange - Focus indicators
    rich_orange: '#9a3412', // Rich orange - Text on light
    dark_orange: '#7c2d12', // Dark orange - Headings
    deepest_orange: '#431407'  // Deepest orange - Dark backgrounds
  },





  border_focused_sky: {
    lightest_sky: '#f0f9ff',  // Lightest - Background hints
    super_light_sky: '#e0f2fe', // Super light - Subtle borders
    very_light_sky: '#bae6fd', // Very light - Hover states
    light_sky: '#7dd3fc', // Light - Active states
    medium_light_sky: '#38bdf8', // Medium light - Secondary actions
    base_sky: '#0ea5e9', // Base - Primary actions
    medium_sky: '#0284c7', // Medium dark - Pressed states
    dark_sky: '#0369a1', // Dark - Focus rings
    very_dark_sky: '#075985', // Very dark - Text on light
    super_dark_sky: '#0c4a6e', // Super dark - Headings
    darkest_sky: '#082f49'  // Darkest - Deep backgrounds
  },

  green: {
    primary: '#10B981',
    secondary: '#059669',
    hover: '#047857',
    light: '#D1FAE5',
  },
  blue: {
    primary: '#3B82F6',
    secondary: '#2563EB',
    hover: '#1D4ED8',
    light: '#DBEAFE',
  },
  
  purple: {
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    hover: '#6D28D9',
    light: '#EDE9FE',
  },

  light_red: {
    // Light red secondary
    primary: '#FFCCCB',    // Light red primary
    secondary: '#059669',  // Light red secondary
    hover: '#ffb3b3',      // Light red hover
    light: '#D1FAE5',     // Lightest red
  },

  warn_red: {
    primary: '#EF4444',
    secondary: '#DC2626',
    hover: '#991B1B',     // Changed to a deeper red
    light: '#FEE2E2',
  },


  warn_yellow: {
    primary: '#F59E0B',
    secondary: '#F97316',
    hover: '#D97706',
    light: '#FDE68A',
  },
};

const fontSizeClasses = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
};

const borderRadiusClasses = {
  rounded: 'rounded',
  small: 'rounded-sm',
  medium: 'rounded-md',
  extra_large: 'rounded-xl',
  two_extra_large: 'rounded-2xl',
  three_extra_large: 'rounded-3xl',
  large: 'rounded-lg',
  full: 'rounded-full',
};

const colorSchemeClasses = {
  green: 'theme-green',
  blue: 'theme-blue',
  purple: 'theme-purple',
};

export const LayoutSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('layoutSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('layoutSettings', JSON.stringify(settings));
    
    // Apply theme
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    
    const colors = colorSchemeVariables[settings.colorScheme ];




    // Apply color scheme CSS variables
    const borderColorFocused = colorSchemeVariables[settings.borderColorFocused];



if (borderColorFocused) {
  
  document.documentElement.style.setProperty('--color-border-focused-green', colors.border_focused_green);
  document.documentElement.style.setProperty('--color-border-focused-orange', colors.border_focused_orange);
  document.documentElement.style.setProperty('--color-border-focused-sky', colors.border_focused_sky);
  // document.documentElement.style.setProperty('--color-light', colors.light);


}



if (colors) {


  document.documentElement.style.setProperty('--color-primary', colors.primary);
  document.documentElement.style.setProperty('--color-secondary', colors.secondary);
  document.documentElement.style.setProperty('--color-hover', colors.hover);
  document.documentElement.style.setProperty('--color-light', colors.light);






}


const warnColors = colorSchemeVariables[settings.colorSchemeWarn];  

if (warnColors) {

  document.documentElement.style.setProperty('--color-warn-primary', warnColors.primary);
  document.documentElement.style.setProperty('--color-warn-secondary', warnColors.secondary);
  document.documentElement.style.setProperty('--color-warn-hover', warnColors.hover);
  document.documentElement.style.setProperty('--color-warn-light', warnColors.light);


}


  
    // Apply font size
    document.documentElement.className = document.documentElement.className
      .replace(/text-\w+/, '')
      .trim();
    document.documentElement.classList.add(fontSizeClasses[settings.fontSize]);
    
    // Apply border radius
    document.documentElement.className = document.documentElement.className
      .replace(/rounded-\w+/, '')
      .trim();
    document.documentElement.classList.add(borderRadiusClasses[settings.borderRadius]);
    
    // Apply compact mode
    document.documentElement.classList.toggle('compact-mode', settings.compactMode);
    
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };


  const updateSettingsWarn = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };
  return (
    <LayoutSettingsContext.Provider value={{ settings, updateSettings,
     updateSettingsWarn, colorSchemeVariables, borderRadiusClasses, fontSizeClasses }}>
      {children}
    </LayoutSettingsContext.Provider>
  );
};

export const useLayoutSettings = () => {
  const context = useContext(LayoutSettingsContext);
  if (!context) {
    throw new Error('useLayoutSettings must be used within a LayoutSettingsProvider');
  }
  return context;
};

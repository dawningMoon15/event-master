export interface Theme {
  primary: string;
  'primary-light': string;
  secondary: string;
  'secondary-light': string;
  accent: string;
  background: string;
  text: string;
  'text-secondary': string;
  border: string;
  'border-light': string;
  success: string;
  error: string;
  warning: string;
  info: string;
}

export const lightTheme: Theme = {
  primary: '#6F1D1B',        // Original primary color
  'primary-light': '#BB9457', // Original primary-light color
  secondary: '#432818',       // Original secondary color
  'secondary-light': '#99582A', // Original secondary-light color
  accent: '#FFE6A7',         // Original accent color
  background: '#f5f5f5',      // Light background
  text: '#1a1a1a',           // Dark text
  'text-secondary': '#4b5563', // Gray text
  border: '#e5e7eb',         // Light border
  'border-light': '#f3f4f6',  // Lighter border
  success: '#10b981',        // Green for success
  error: '#ef4444',          // Red for errors
  warning: '#f59e0b',        // Yellow for warnings
  info: '#3b82f6'           // Blue for info
};

export const darkTheme: Theme = {
  primary: '#BB9457',        // Lightened primary for dark mode
  'primary-light': '#D4B483', // Lightened primary-light
  secondary: '#99582A',       // Lightened secondary
  'secondary-light': '#B3743A', // Lightened secondary-light
  accent: '#FFE6A7',         // Original accent color
  background: '#111827',      // Dark background
  text: '#f9fafb',           // Light text
  'text-secondary': '#9ca3af', // Gray text
  border: '#374151',         // Dark border
  'border-light': '#1f2937',  // Darker border
  success: '#34d399',        // Light green for success
  error: '#f87171',          // Light red for errors
  warning: '#fbbf24',        // Light yellow for warnings
  info: '#60a5fa'           // Light blue for info
};

export const getThemeStyles = (theme: Theme) => ({
  '--color-primary': theme.primary,
  '--color-primary-light': theme['primary-light'],
  '--color-secondary': theme.secondary,
  '--color-secondary-light': theme['secondary-light'],
  '--color-accent': theme.accent,
  '--color-background': theme.background,
  '--color-text': theme.text,
  '--color-text-secondary': theme['text-secondary'],
  '--color-border': theme.border,
  '--color-border-light': theme['border-light'],
  '--color-success': theme.success,
  '--color-error': theme.error,
  '--color-warning': theme.warning,
  '--color-info': theme.info,
}); 
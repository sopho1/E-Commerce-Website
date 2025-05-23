export const theme = {
  colors: {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    accent: 'var(--accent)',
    background: 'var(--background)',
    text: 'var(--text)',
    white: 'var(--white)',
    black: 'var(--black)',
    gray: 'var(--gray)',
    lightGray: 'var(--light-gray)',
    darkGray: 'var(--dark-gray)',
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Poppins, sans-serif',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
};

export const lightTheme = {
  '--primary': '#0D47A1', // Deep Blue
  '--secondary': '#C51162', // Rich Magenta
  '--accent': '#00BCD4', // Aqua
  '--background': '#F5F5F5', // Light Gray
  '--text': '#212121', // Charcoal
  '--white': '#FFFFFF',
  '--black': '#000000',
  '--gray': '#757575', // Medium Gray
  '--light-gray': '#E0E0E0', // Light Gray
  '--dark-gray': '#424242', // Dark Gray
};

export const darkTheme = {
  '--primary': '#1976D2', // Lighter Deep Blue
  '--secondary': '#E91E63', // Lighter Rich Magenta
  '--accent': '#4DD0E1', // Lighter Aqua
  '--background': '#121212', // Dark Background
  '--text': '#FFFFFF',
  '--white': '#212121',
  '--black': '#FFFFFF',
  '--gray': '#BDBDBD', // Light Gray
  '--light-gray': '#424242', // Dark Gray
  '--dark-gray': '#E0E0E0', // Light Gray
}; 
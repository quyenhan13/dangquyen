// Capacitor iOS also runs on localhost; only Vite uses port 5173.

export const CONFIG = {
  API_BASE_URL: window.location.origin + '/api',
  SITE_BASE_URL: window.location.origin,
  APP_NAME: 'VTeen Pro',
  VERSION: '2.0.0'
};

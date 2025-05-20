import { analytics } from './firebase-config.js';

// Custom event tracking function
export const trackEvent = (eventName, eventParams) => {
    gtag('event', eventName, eventParams);
};

// Page view tracking
export const trackPageView = (pagePath) => {
    gtag('config', 'G-073H96LD75', {
        page_path: pagePath
    });
};

// User tracking
export const trackUserProperties = (properties) => {
    gtag('set', 'user_properties', properties);
};
// In a real application, these base64 strings would be generated from the actual image files.
// Fixed: Using proper forward slashes and URL encoding for spaces
export const SLIDESHOW_IMAGES = [
    './WhatsApp%20Image%202025-08-09%20at%2021.48.41.jpeg',
    './WhatsApp%20Image%202025-08-09%20at%2021.48.46.jpeg',
    './WhatsApp%20Image%202025-08-09%20at%2021.48.50.jpeg'
];

// Alternative Vite-compatible approach
export const SLIDESHOW_IMAGE_URLS = [
    new URL('./WhatsApp Image 2025-08-09 at 21.48.41.jpeg', import.meta.url).href,
    new URL('./WhatsApp Image 2025-08-09 at 21.48.46.jpeg', import.meta.url).href,
    new URL('./WhatsApp Image 2025-08-09 at 21.48.50.jpeg', import.meta.url).href
];

// Dynamically import all possible media extensions in the assets directory
const assets = import.meta.glob('../assets/**/*.{png,jpg,jpeg,jfif,webp,mp4,webm,svg,avif}', { eager: true });

/**
 * Retrieves the compiled path for a given asset base name regardless of its extension.
 * Allows users to safely replace an image with a new one of a different extension type
 * (.webp instead of .jpg) without needing to change the React component import code.
 * 
 * @param {string} baseName - The filename of the asset without its extension (e.g. 'sam-morsy')
 * @returns {string|null} - The resolved asset URL or null if not found
 */
export const getAssetPath = (baseName) => {
    for (const path in assets) {
        // Extract the filename without extension: '../assets/sam-morsy.jpg' -> 'sam-morsy'
        const fileName = path.split('/').pop().split('.')[0];
        if (fileName === baseName) {
            return assets[path].default;
        }
    }

    // Fallback if the asset couldn't be found
    console.warn(`Asset not found for base name: ${baseName}`);
    return null;
};

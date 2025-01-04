/**
 * Function to convert price to words
 * Ex: 7500000 to 75 Lakhs, 10000000 to 1 Crore
 *
 * @param {Number} price
 * @returns {String} Price in words
 */
export const convertPriceToWords = (price) => {
    if (price === 0) {
        return '0';
    }

    if (!price || isNaN(price)) {
        return 'Invalid input';
    }

    if (price >= 10000000) {
        // Convert to Crores
        const inCrores = price / 10000000;
        const formattedCrores = Number(inCrores).toFixed(2).replace(/\.?0+$/, '');
        return `${formattedCrores} Crores`;
    } else if (price >= 100000) {
        // Convert to Lakhs
        const inLakhs = price / 100000;
        const formattedLakhs = Number(inLakhs).toFixed(2).replace(/\.?0+$/, '');
        return `${formattedLakhs} Lakhs`;
    } else if (price >= 1000) {
        // Convert to Thousands
        const inThousands = price / 1000;
        const formattedThousands = Number(inThousands).toFixed(2).replace(/\.?0+$/, '');
        return `${formattedThousands} Thousand`;
    } else {
        // Less than a thousand
        return price.toString();
    }
};

/**
 * Function to check if the device is mobile
 * @returns {Boolean} True if window width is less than 768px
 */
export const isMobile = () => {
    if (typeof window === 'undefined') {
        return false; // Assume non-mobile if no window (e.g., server-side rendering)
    }
    return window.innerWidth < 768;
};

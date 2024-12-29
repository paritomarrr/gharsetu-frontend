/**
 * Function to convert price to words
 * Ex: 7500000 to 75 Lakhs, 10000000 to 1 Crore
 * 
 * @param {Number} price 
 * @returns {String} Price in words
 */
export const convertPriceToWords = (price) => {
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
        // include commas for thousands
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        // Less than a thousand
        return price.toString();
    }
};


export const isMobile = () => {
    return window.innerWidth < 768;
}
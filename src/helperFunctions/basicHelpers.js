
/**
 * Function to convert price to words
 * Ex : 7500000 to 75 Lakhs
 * 
 * @param {Number} price 
 * @returns Number
 */
export const convertPriceToWords = (price) => {
    if (!price || isNaN(price)) {
        return 'Invalid input';
    }
    const inLakhs = price / 100000;
    const formattedLakhs = Number(inLakhs).toFixed(2);
    const cleanNumber = formattedLakhs.replace(/\.?0+$/, '');
    return `${cleanNumber} Lakhs`;
}


export const addCommaToNumber = (number) => {
    if (!number || isNaN(number)) {
        return 'Invalid input';
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
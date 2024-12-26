// Property filtering utility functions
export const filterProperties = (properties, minPrice, maxPrice) => {
    if (!properties || !Array.isArray(properties)) {
        return [];
    }


    return properties.filter(property => {
        const price = property.askedPrice;

        // If no price filters are set, include all properties
        if (!minPrice && !maxPrice) {
            return true;
        }

        // If only minPrice is set
        if (minPrice && !maxPrice) {
            return price >= minPrice;
        }

        // If only maxPrice is set
        if (!minPrice && maxPrice) {
            return price <= maxPrice;
        }

        // If both min and max prices are set
        return price >= minPrice && price <= maxPrice;
    });
};

export const validatePriceRange = (minPrice, maxPrice) => {
    const validatedMin = minPrice ? Number(minPrice) : undefined;
    const validatedMax = maxPrice ? Number(maxPrice) : undefined;

    // Check if the conversion to number was successful
    if (minPrice && isNaN(validatedMin)) {
        throw new Error('Invalid minimum price');
    }
    if (maxPrice && isNaN(validatedMax)) {
        throw new Error('Invalid maximum price');
    }

    // Check if min price is less than max price when both are provided
    if (validatedMin && validatedMax && validatedMin > validatedMax) {
        throw new Error('Minimum price cannot be greater than maximum price');
    }

    return {
        minPrice: validatedMin,
        maxPrice: validatedMax
    };
};
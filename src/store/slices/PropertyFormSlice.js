import { createSlice } from "@reduxjs/toolkit";

const PropertyFromSlice = createSlice({
    name: "propertyForm",
    initialState: {
        listedBy: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        propertyType: '',
        firmName: '',
        propertySubType: '',
        availableFor: '',
        project: '',
        area: '',
        address: {
            houseNumber: '',
            street: '',
            state: '',
            pincode: '',
            city: '',
            locality: '',
        },
        plotSize: {
            plotLength: '',
            plotWidth: ''
        },
        furnishType: '',
        flatAmenities: [],
        propertyAmenities: [],
        askedPrice: '',
        propertyStatus: '',
        coordinates: {
            latitude: '',
            longitude: ''
        }
    },
    reducers: {
        toggleIsPropertyFormOpen: (state) => {
            state.isPropertyFormOpen = !state.isPropertyFormOpen;
        },
        setPropertyId: (state, action) => {
            state.propertyId = action.payload;
        },
    },
})

export const { toggleIsPropertyFormOpen, setPropertyId } = PropertyFromSlice.actions;
export default PropertyFromSlice.reducer;

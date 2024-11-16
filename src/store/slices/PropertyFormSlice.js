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
            buildingProjectSociety: '',
            state: '',
            pincode: '',
            city: '',
            locality: '',
        },
        plotSize: {
            plotLength: '',
            plotWidth: '',
            plotArea: ''
        },
        furnishType: '',
        flatFurnishings: [],
        societyAmenities: [],
        askedPrice: '',
        propertyStatus: '',
        coordinates: {
            latitude: '',
            longitude: ''
        },
        images: [],
        description: '',
        showError: false, // Error state for validation
        isPropertyFormOpen: false, // Added missing state
    },
    reducers: {
        toggleIsPropertyFormOpen: (state) => {
            state.isPropertyFormOpen = !state.isPropertyFormOpen;
        },
        setPropertyId: (state, action) => {
            state.propertyId = action.payload;
        },
        updatePropertyForm: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        toggleError: (state, action) => {
            state.showError = action.payload;
        }
    },
})

export const { toggleIsPropertyFormOpen, setPropertyId, updatePropertyForm, toggleError } = PropertyFromSlice.actions;
export default PropertyFromSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  bhkConfig: '',
  propertyAge:'',
  askedPrice: '',
  propertyStatus: '',
  coordinates: {
    latitude: '',
    longitude: ''
  },
  images: [],
  description: '',
  showError: false,
  isPropertyFormOpen: false,
};

const propertyFormSlice = createSlice({
  name: "propertyForm",
  initialState,
  reducers: {
    toggleIsPropertyFormOpen: (state) => {
      state.isPropertyFormOpen = !state.isPropertyFormOpen;
    },
    updatePropertyForm: (state, action) => {
      const updates = action.payload;
      Object.entries(updates).forEach(([key, value]) => {
        if (['address', 'plotSize', 'coordinates'].includes(key)) {
          state[key] = { ...state[key], ...value };
        } else {
          state[key] = value;
        }
      });
    },
    toggleError: (state, action) => {
      state.showError = action.payload;
    },
    resetForm: () => initialState
  },
});

export const {
  toggleIsPropertyFormOpen,
  updatePropertyForm,
  toggleError,
  resetForm
} = propertyFormSlice.actions;

export default propertyFormSlice.reducer;
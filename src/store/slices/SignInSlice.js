import { createSlice } from '@reduxjs/toolkit';

const SignInSlice = createSlice({
  name: 'signInModal',
  initialState: {
    isOpen: false, // Should be an object, not an array
  },
  reducers: {
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen; // Toggling the value of isOpen
    }
  }
});

// Export the correct action from your slice
export const { toggleIsOpen } = SignInSlice.actions;
export default SignInSlice.reducer;

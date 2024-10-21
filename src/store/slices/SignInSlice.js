import { createSlice } from '@reduxjs/toolkit';

const SignInSlice = createSlice({
  name: 'signInModal',
  initialState: {
    isSignInModalOpen: false, // Should be an object, not an array
    isNewUserModalOpen: false,
    newUserId: null,
  },
  reducers: {
    toggleIsSignInOpen: (state) => {
      state.isSignInModalOpen = !state.isSignInModalOpen; // Toggling the value of isOpen
    },
    toggleIsNewUserModalOpen: (state) => {
      state.isNewUserModalOpen = !state.isNewUserModalOpen; // Toggling the value of isNewUserModalOpen
    },
    setNewUserId: (state, action) => {
      state.newUserId = action.payload; // Setting the newUserId to the value passed
    },
  }
});

// Export the correct action from your slice
export const { toggleIsSignInOpen, toggleIsNewUserModalOpen, setNewUserId } = SignInSlice.actions;
export default SignInSlice.reducer;

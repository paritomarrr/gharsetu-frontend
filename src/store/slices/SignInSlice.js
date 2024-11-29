import { createSlice } from '@reduxjs/toolkit';

const SignInSlice = createSlice({
  name: 'signInModal',
  initialState: {
    isSignInModalOpen: false, // Should be an object, not an array
    isNewUserModalOpen: false,
    newUserId: null,
    SignInModalTitle: 'Sign In',
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
    setSignInModalTitle: (state, action) => {
      state.SignInModalTitle = action.payload; // Setting the SignInModalTitle to the value passed
    },
  }
});

// Export the correct action from your slice
export const { toggleIsSignInOpen, toggleIsNewUserModalOpen, setNewUserId, setSignInModalTitle } = SignInSlice.actions;
export default SignInSlice.reducer;

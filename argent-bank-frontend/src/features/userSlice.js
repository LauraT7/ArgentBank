import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: null,
    firstName: null, 
    lastName: null,  
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName; 
      state.lastName = action.payload.lastName;   
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userName = null;
      state.firstName = null; 
      state.lastName = null;  
      state.isLoggedIn = false;
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { login, logout, updateUserName } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    username: '',  // Ajout du champ username
    email: '',
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.username = '';
      state.email = '';
      state.isLoggedIn = false;
    },
    updateUsername: (state, action) => {  // Ajout de l'action updateUsername
      state.username = action.payload;
    },
  },
});

export const { login, logout, updateUsername } = userSlice.actions;

export default userSlice.reducer;

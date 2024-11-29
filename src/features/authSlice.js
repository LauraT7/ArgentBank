import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials);
      console.log('API login response:', response.data);
      const { token } = response.data.body; 
      return { token }; 
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/profile', null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Profile API response:', response.data.body);
      const { userName, firstName, lastName } = response.data.body;
      return { userName, firstName, lastName };
    } catch (error) {
      console.error('Error fetching profile:', error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || 'Unknown error');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userName: null,
    firstName: null,
    lastName: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userName = null;
      state.firstName = null;
      state.lastName = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const { userName, firstName, lastName } = action.payload;
        console.log('Storing profile in Redux:', { userName, firstName, lastName });
        state.userName = userName;
        state.firstName = firstName;
        state.lastName = lastName;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

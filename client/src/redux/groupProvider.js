import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './api';

export const createGroup = createAsyncThunk('group/createGroup',
  async( {formData, toast} , {rejectWithValue}) => {
    try {
      const result = await api.createGroup(formData);
      toast.success('Group Created!');
      return result.data;
    }catch(err) {
      return rejectWithValue(err.response.data);
  }
})
export const getGroups = createAsyncThunk('group/getGroups',
  async( rejectWithValue) => {
    try {
      const result = await api.getGroups();
      return result.data;
    }catch(err) {
      return rejectWithValue(err.response.data);
  }
})

const initialState = {
  group: null,
  error: '',
	loading: false,
  groupsToShow: []
}

const groupSlice = createSlice({
  name: "group",
  initialState,
  extraReducers: {
    [createGroup.pending]: (state, action) => {
      state.loading = true;
      state.error='';
    },
    [createGroup.fulfilled]: (state, action) => {
      state.loading = false;
      state.groupsToShow.unshift(action.payload)
    },
    [createGroup.rejected]: (state, action) => {
      state.loading = false;
			state.error = action.payload.message;
    },
    [getGroups.pending]: (state, action) => {
      state.loading = true;
      state.error='';
    },
    [getGroups.fulfilled]: (state, action) => {
      state.loading = false;
      state.groupsToShow = action.payload;
    },
    [getGroups.rejected]: (state, action) => {
      state.loading = false;
			state.error = action.payload.message;
    },
  }
})

export default groupSlice.reducer;

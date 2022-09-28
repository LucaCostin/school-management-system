import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './api';

export const checkEmail = createAsyncThunk('auth/checkEmail',
  async({ formData, navigate }, {rejectWithValue}) => {
    try {
      const result = await api.checkEmail(formData);
      console.log('Checking email')
      navigate('/login');
      return result.data;
    }catch(err) {
      return rejectWithValue(err.response.data);
  }
})

export const createPass = createAsyncThunk('auth/createPassword',
  async({ formData, navigate }, {rejectWithValue}) => {
    try {
      const result = await api.createPass(formData);
      navigate('/home');
      console.log(result.data);
      return result.data;
    }catch(err) {
      return rejectWithValue(err.response.data);
  }
})

export const checkPass = createAsyncThunk('auth/checkPassword',
  async({ formData, navigate }, {rejectWithValue}) => {
    try {
      const result = await api.checkPass(formData);
      navigate('/home');
      return result.data;
    }catch(err) {
      return rejectWithValue(err.response.data);
  }
})

export const createUser = createAsyncThunk('user/createUser',
  async( {formData, toast} , {rejectWithValue}) => {
    try {
      const result = await api.createUser(formData);
      toast.success('User created!');
      return result.data;
    }catch(err) {
      return rejectWithValue(err.response.data);
  }
})
export const getUsers = createAsyncThunk('user/getUsers',
  async( role , {rejectWithValue}) => {
    try {
      const result = await api.getUsers(role.props);
      return result.data;
    }catch(err) {
      return rejectWithValue(err.response.data);
  }
})

export const deleteUser = createAsyncThunk('user/deleteUser',
	async( {userId, toast} , {rejectWithValue}) => {
	try{
		const result = await api.deleteUser(userId);
    toast.success('User Deleted!');
		return result.data;
	} catch(err) {
		return rejectWithValue(err.response.data);
	}
});
export const editUser = createAsyncThunk('user/editUser',
	async( {formData, userId, toast} , {rejectWithValue}) => {
	try{
		const result = await api.editUser(formData, userId);
    toast.success('User Updated!');
		return result.data;
	} catch(err) {
		return rejectWithValue(err.response.data);
	}
});

const initialState = {
  user: null,
  dataToLog: null,
  error: '',
	loading: false,
  usersToShow: []
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		logOut: (state, action) => {
			state.user = null;
			localStorage.removeItem('profile');
		},
	},
  extraReducers: {
    [checkEmail.pending]: (state, action) => {
      state.loading = true;
      state.error='';
    },
    [checkEmail.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataToLog = action.payload;
      localStorage.setItem('emailToLog', JSON.stringify({...action.payload}));
    },
    [checkEmail.rejected]: (state, action) => {
      state.loading = false;
			state.error = action.payload.message;
    },
    [createPass.pending]: (state, action) => {
      state.loading = true;
      state.error='';
    },
    [createPass.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('profile', JSON.stringify({...action.payload}));
      localStorage.removeItem('emailToLog');
      state.dataToLog = null;
    },
    [createPass.rejected]: (state, action) => {
      state.loading = false;
			state.error = action.payload.message;
    },
    [checkPass.pending]: (state, action) => {
      state.loading = true;
      state.error='';
    },
    [checkPass.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('profile', JSON.stringify({...action.payload}));
      localStorage.removeItem('emailToLog');
      state.dataToLog = null;
    },
    [checkPass.rejected]: (state, action) => {
      state.loading = false;
			state.error = action.payload.message;
    },
    [createUser.pending]: (state, action) => {
      state.loading = true;
      state.error='';
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.usersToShow.unshift(action.payload)
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
			state.error = action.payload.message;
    },
    [getUsers.pending]: (state, action) => {
      state.loading = true;
      state.error='';
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.usersToShow = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
			state.error = action.payload.message;
    },
    [deleteUser.pending]: (state, action) => {
			state.loading = true;
			state.error = '';
		},
    [deleteUser.fulfilled]: (state, action) => {
			state.loading = false;
			const userId = action.meta.arg.userId
        console.log(userId)
			if(userId) {
				state.usersToShow = state.usersToShow.filter(user => user._id !== userId);
			}
		},
		[deleteUser.rejected] : (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		},
    [editUser.pending]: (state, action) => {
			state.loading = true;
			state.error = '';
		},
    [editUser.fulfilled]: (state, action) => {
			state.loading = false;
			const userId = action.meta.arg.userId
        console.log(userId)
			if(userId) {
				state.usersToShow = state.usersToShow.map(user => user._id === userId ? action.payload : user);
			}
		},
		[editUser.rejected] : (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		},
  }
})

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;

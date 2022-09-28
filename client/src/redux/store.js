import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userProvider';
import groupReducer from './groupProvider';

const reducer = {
  user: userReducer,
  group: groupReducer
}

export default configureStore({
  reducer
});

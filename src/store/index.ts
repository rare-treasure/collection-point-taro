import { configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import userSlice from './slice/user';

// configureStore创建一个redux数据
const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: [
    logger
  ]
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

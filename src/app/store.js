import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';
import cameraReducer from '../features/cameraSlice';

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'



export const store = configureStore({
  reducer: {
    app: appReducer,
    camera:cameraReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

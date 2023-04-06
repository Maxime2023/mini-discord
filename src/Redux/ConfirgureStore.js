import { configureStore } from '@reduxjs/toolkit';
import slice from './Store';

export default configureStore({
  reducer: {
    store: slice,
  },
});
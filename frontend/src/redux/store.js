import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import messageReducer from './messageSlice.js';
import socketReducer from './socketSlice.js';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage

// 👇 Combine all your reducers
const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket: socketReducer, // This won't be persisted
});

// 👇 Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'message'], // don't persist 'socket'
};

// 👇 Wrap root reducer with persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 👇 Create store
const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Allow non-serializable values in redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 👇 Create persistor
export const persistor = persistStore(store);

export default store;






// // src/redux/store.js

// import { configureStore, combineReducers } from '@reduxjs/toolkit';

// // Import your slice reducers
// import userReducer from './userSlice';
// import messageReducer from './messageSlice';
// import socketReducer from './socketSlice';

// // Combine all reducers
// const rootReducer = combineReducers({
//   user: userReducer,
//   message: messageReducer,
//   socket: socketReducer,
// });

// // Create the Redux store with the combined reducer
// const store = configureStore({
//   reducer: rootReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   // Middleware default is fine for most cases here
// });

// export default store;





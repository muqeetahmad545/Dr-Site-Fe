// // store/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Default to localStorage

// // Persist configuration for the Redux store
// const persistConfig = {
//   key: 'root',
//   storage, // Store in localStorage
//   whitelist: ['auth'], // Only persist the 'auth' slice
// };

// // Create a persisted version of the auth reducer
// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// // Configure the Redux store
// const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer, // Persisted auth slice
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }), // Ignore serializability checks
// });

// const persistor = persistStore(store);

// export { store, persistor };

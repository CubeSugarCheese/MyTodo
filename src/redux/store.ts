import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {tasksSlice} from './slice/taskSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const savedReducer = combineReducers({
  tasks: tasksSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, savedReducer);
const rootReducer = combineReducers({
  saved: persistedReducer,
});
export const store = configureStore({
  reducer: {
    root: rootReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true,
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

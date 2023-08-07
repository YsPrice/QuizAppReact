import { configureStore , combineReducers} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react";
import questionsReducer from './questionSlice';
import thunk from 'redux-thunk';
export const defaultUrlManga = 'https://opentdb.com/api.php?amount=10&category=31&encode=base64';
export const defaultUrlMusic = 'https://opentdb.com/api.php?amount=10&category=12&encode=base64';

const persistConfig = {
    version:1,
    key:'root',
    storage
};
const rootReducer = combineReducers({
   questions: questionsReducer
});
const persistedReducer = rootReducer;
export const store = configureStore({
  reducer: persistedReducer,
});



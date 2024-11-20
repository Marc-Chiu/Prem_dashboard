import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './reducers.js';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('playerState');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
        console.error("Failed to load state from localStorage:", error);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('playerState', serializedState);
    } catch (error) {
        console.error("Failed to save state to localStorage:", error);
    }
};

const preloadedState = loadState();

const store = configureStore({
    reducer: playerReducer,
    preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import currentSectionReducer from './currentSection/currentSectionSlice';
import currentCardReducer from './currentCard/currentCardSlice';
import isVisibleModalWindowReducer from './isVisibleModalWindow/isVisibleModalWindowSlice';
import modalWindowContentReducer  from './modalWindowContent/modalWindowContentSlice';

export default configureStore({
    reducer: {
        currentSection: currentSectionReducer,
        currentCard: currentCardReducer,
        isVisibleModalWindow: isVisibleModalWindowReducer,
        modalWindowContent: modalWindowContentReducer,
    },
});
import { Middleware } from 'redux';

import { saveToLocalStorage } from '../utils/localStorage';
import { AppState } from './index';

const localStorageMiddleware: Middleware = store =>
    next =>
        action => {
            const result = next(action);

            const state = store.getState() as AppState;
            saveToLocalStorage(JSON.stringify(state));

            return result;
        };

export default localStorageMiddleware;
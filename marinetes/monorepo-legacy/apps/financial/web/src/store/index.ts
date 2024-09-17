import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { rootSaga, rootReducer } from './modules';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const enhacer =
  process.env.NODE_ENV !== 'production'
    ? compose(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

const store = createStore(combineReducers(rootReducer), enhacer);
const persistor = persistStore(store as any);

sagaMiddleware.run(rootSaga);

export { store, persistor };

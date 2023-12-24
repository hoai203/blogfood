import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import reducer from './reducers'
import rootSaga from './rootSaga'
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer,
    middleware: (gDM) => gDM({
        serializableCheck: false,
    }).concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)

export default store
import {composeWithDevTools} from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../rootReducer';
import {applyMiddleware, createStore} from 'redux';

export default function () {
  const middleware = [
    promiseMiddleware,
  ];

  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}

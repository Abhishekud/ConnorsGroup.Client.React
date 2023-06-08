import {composeWithDevTools} from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../rootReducer';
import {applyMiddleware, createStore} from 'redux';

export default function () {
  const middleware = [
    promiseMiddleware,
  ];

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      const nextReducer = require('../rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

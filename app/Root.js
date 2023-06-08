import React from 'react';
import {Provider} from 'react-redux';
//import {hot} from 'react-hot-loader';
import routes from './routes';
import {Router} from 'react-router';
import DragDropRoot from './DragDropRoot';

function Root({history, store}) {
  return (
    <Provider store={store}>
      <DragDropRoot>
        <Router history={history} routes={routes} />
      </DragDropRoot>
    </Provider>
  );
}

// This currently breaks the Kendo Grid so is not enabled
//export default hot(module)(Root);
export default Root;

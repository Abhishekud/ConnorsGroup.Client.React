import './styles/styles.scss';
import './babelHelpers';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import configureStore from './store/configureStore';
import {http} from './features/shared/services';
import React from 'react';
import {render} from 'react-dom';
import Spin from 'react-tiny-spin';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import {MainContent, Page, PageBody} from './features/layout/components';
import {loadBrand, loadSettings} from './features/shared/actions';
import Root from './Root';
import {ApplicationInsights} from '@microsoft/applicationinsights-web';

const bootstrapApp = () => {

  const store = configureStore();
  store.dispatch(loadSettings());
  store.dispatch(loadBrand());

  const history = syncHistoryWithStore(browserHistory, store);

  const appElement = document.getElementById('app');

  function launchApplication() {
    render(<Root history={history} store={store} />, appElement);
  }

  if (/^(.*;)?XSRF-TOKEN=[^;]+(.*)?$/.test(document.cookie)) {
    launchApplication();
  } else {
    render(
      <Page pageClassName="loading-page">
        <PageBody>
          <MainContent>
            <h1 style={{marginTop: '15px', paddingLeft: '15px'}}>Loading...<Spin config={{left: '260px', top: '65px'}} /></h1>
          </MainContent>
        </PageBody>
      </Page>,
      appElement
    );
    http.get('anti-forgery-token')
      .then(() => launchApplication())
      .catch(error => {
        render(<h1 style={{marginTop: '15px', paddingLeft: '15px'}}>Application failed to load</h1>, appElement);
        throw error;
      });
  }
};

const bootstrapLogging = ({data}) => {
  const ai = new ApplicationInsights({
    config: {
      instrumentationKey: data.applicationInsightsInstrumentationKey,
      disableTelemetry: data.disableTelemetry,
      enableAutoRouteTracking: true,
    },
  });
  ai.loadAppInsights();
  ai.trackPageView();
};

http
  .get('settings/app')
  .then(bootstrapLogging)
  .then(bootstrapApp)
  .catch(bootstrapApp);



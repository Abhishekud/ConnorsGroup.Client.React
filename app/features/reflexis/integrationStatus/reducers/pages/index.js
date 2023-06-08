import {combineReducers} from 'redux';
import page from './page';
import endpointList from './endpointList';
import attributeList from './attributeList';
import locationList from './locationList';
import integrationStatus from './integrationStatus';

export default combineReducers({
  endpointList,
  attributeList,
  locationList,
  page,
  integrationStatus,
});

import {combineReducers} from 'redux';
import importAttributes from './importAttributes';
import createIntegrationRequest from './createIntegrationRequest';
import createAttribute from './createAttribute';

export default combineReducers({
  importAttributes,
  createIntegrationRequest,
  createAttribute,
});

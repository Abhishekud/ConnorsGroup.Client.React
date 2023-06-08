import {combineReducers} from 'redux';
import _import from './import';
import importValidationErrors from './importValidationErrors';

export default combineReducers({
  _import,
  importValidationErrors,
});

import {combineReducers} from 'redux';
import create from './create';
import _delete from './delete';
import _import from './import';
import importValidationErrors from './importValidationErrors';

export default combineReducers({
  create,
  _delete,
  _import,
  importValidationErrors,
});

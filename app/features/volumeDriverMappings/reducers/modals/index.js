import {combineReducers} from 'redux';
import create from './create';
import createSet from './createSet';
import _delete from './delete';
import deleteSet from './deleteSet';
import _import from './import';
import importValidationErrors from './importValidationErrors';

export default combineReducers({
  create,
  createSet,
  _delete,
  deleteSet,
  _import,
  importValidationErrors,
});

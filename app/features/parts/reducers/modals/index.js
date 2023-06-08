import {combineReducers} from 'redux';
import create from './create';
import _delete from './delete';
import deleteAll from './deleteAll';
import deleteAllConfirm from './deleteAllConfirm';
import _import from './import';
import importValidationErrors from './importValidationErrors';

export default combineReducers({
  create,
  _delete,
  deleteAll,
  deleteAllConfirm,
  _import,
  importValidationErrors,
});

import {combineReducers} from 'redux';
import _import from './import';
import importValidationErrors from './importValidationErrors';
import create from './create';
import importVolumeDriverValuesValidationErrors from './importVolumeDriverValuesValidationErrors';
import _delete from './delete';

export default combineReducers({
  _import,
  importValidationErrors,
  create,
  importVolumeDriverValuesValidationErrors,
  _delete,
});

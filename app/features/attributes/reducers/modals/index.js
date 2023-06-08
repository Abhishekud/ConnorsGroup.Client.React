import {combineReducers} from 'redux';
import create from './create';
import _delete from './delete';
import _import from './import';
import importValidationErrors from './importValidationErrors';
import importLocationAttributes from './importLocationAttributes';
import importLocationAttributesValidationErrors from './importLocationAttributesValidationErrors';
import confirmSelectAllAttributes from './confirmSelectAllAttributes';

export default combineReducers({
  create,
  _delete,
  _import,
  importValidationErrors,
  importLocationAttributes,
  importLocationAttributesValidationErrors,
  confirmSelectAllAttributes,
});

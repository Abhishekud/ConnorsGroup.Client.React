import {combineReducers} from 'redux';
import importLocationMapping from './importLocationMapping';
import importLocationMappingValidationErrors from './importLocationMappingValidationErrors';

export default combineReducers({
  importLocationMapping,
  importLocationMappingValidationErrors,
});

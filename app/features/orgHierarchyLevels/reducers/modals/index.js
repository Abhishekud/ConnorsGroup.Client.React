import {combineReducers} from 'redux';
import _delete from './delete';
import importHierarchyLevels from './importHierarchyLevels';
import importHierarchyLevelsValidationErrors from './importHierarchyLevelsValidationErrors';

export default combineReducers({
  _delete,
  importHierarchyLevels,
  importHierarchyLevelsValidationErrors,
});

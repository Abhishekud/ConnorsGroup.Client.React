import {combineReducers} from 'redux';
import create from './create';
import createProfile from './createProfile';
import _delete from './delete';
import deleteProfile from './deleteProfile';
import _import from './import';
import importLocationProfiles from './importLocationProfiles';
import importLocationProfilesValidationErrors from './importLocationProfilesValidationErrors';
import importValidationErrors from './importValidationErrors';
import confirmSelectAllLocationDepartments from './confirmSelectAllLocationDepartments';

export default combineReducers({
  create,
  createProfile,
  _delete,
  deleteProfile,
  _import,
  importLocationProfiles,
  importLocationProfilesValidationErrors,
  importValidationErrors,
  confirmSelectAllLocationDepartments,
});

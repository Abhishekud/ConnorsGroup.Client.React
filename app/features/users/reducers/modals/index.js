import {combineReducers} from 'redux';
import create from './create';
import _delete from './delete';
import setUserPassword from './setUserPassword';
import importUsers from './importUsers';
import importUsersValidationErrors from './importUsersValidationErrors';

export default combineReducers({
  create,
  _delete,
  setUserPassword,
  importUsers,
  importUsersValidationErrors,
});

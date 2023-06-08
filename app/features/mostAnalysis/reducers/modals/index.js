import {combineReducers} from 'redux';
import _delete from './delete';
import moveToPosition from './moveToPosition';
import applicationRules from './applicationRules';

export default combineReducers({
  _delete,
  moveToPosition,
  applicationRules,
});

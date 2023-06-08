import {combineReducers} from 'redux';
import _delete from './delete';
import moveToPosition from './moveToPosition';

export default combineReducers({
  _delete,
  moveToPosition,
});

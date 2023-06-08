import {combineReducers} from 'redux';
import create from './create';
import _delete from './delete';
import createTime from './createTime';
import deleteTime from './deleteTime';
import duplicate from './duplicate';

export default combineReducers({
  create,
  _delete,
  createTime,
  deleteTime,
  duplicate,
});

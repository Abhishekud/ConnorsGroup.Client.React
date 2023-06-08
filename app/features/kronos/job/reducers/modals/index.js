import {combineReducers} from 'redux';
import create from './create';
import _delete from './delete';

export default combineReducers({
  create,
  _delete,
});

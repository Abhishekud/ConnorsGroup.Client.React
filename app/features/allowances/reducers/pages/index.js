import {combineReducers} from 'redux';
import builder from './builder';
import list from './list';

export default combineReducers({
  builder,
  list,
});

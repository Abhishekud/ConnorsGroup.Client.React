import {combineReducers} from 'redux';
import list from './list';
import details from './details';
export default combineReducers({
  details,
  list,
});

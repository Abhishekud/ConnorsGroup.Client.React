import {combineReducers} from 'redux';
import edit from './edit';
import filters from './filters';

export default combineReducers({
  edit,
  filters,
});

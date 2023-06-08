import {combineReducers} from 'redux';
import sets from './sets';
import edit from './edit';
import filters from './filters';

export default combineReducers({
  sets,
  edit,
  filters,
});

import {combineReducers} from 'redux';
import edit from './edit';
import profiles from './profiles';
import filters from './filters';

export default combineReducers({
  edit,
  profiles,
  filters,
});

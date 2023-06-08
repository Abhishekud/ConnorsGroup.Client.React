import {combineReducers} from 'redux';
import selectStandards from './selectStandards';
import searchElements from './searchElements';

export default combineReducers({
  selectStandards,
  searchElements,
});

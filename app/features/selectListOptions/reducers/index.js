import {combineReducers} from 'redux';
import selectList from './selectList';
import filingFieldSelectList from './filingFieldSelectList';

export default combineReducers({
  selectList,
  filingFieldSelectList,
});

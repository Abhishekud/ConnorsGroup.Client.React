import {combineReducers} from 'redux';
import industryAllowanceDetails from './industryAllowanceDetails';
import industryAllowanceRestDetails from './industryAllowanceRestDetails';

export default combineReducers({
  industryAllowanceDetails,
  industryAllowanceRestDetails,
});

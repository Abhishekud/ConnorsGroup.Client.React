import dashboard from './dashboard';
import departments from './departments';
import locations from './locations';
import orgHierarchies from './orgHierarchies';
import standards from './standards';
import {combineReducers} from 'redux';

export default combineReducers({
  dashboard,
  departments,
  locations,
  orgHierarchies,
  standards,
});

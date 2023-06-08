import {combineReducers} from 'redux';
import currentUser from './currentUser';
import pages from './pages';

export default combineReducers({
  currentUser,
  pages,
});

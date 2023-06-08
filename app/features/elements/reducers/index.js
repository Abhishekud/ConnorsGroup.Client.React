import {combineReducers} from 'redux';
import pages from './pages';
import sidebars from './sidebars';
import modals from './modals';

export default combineReducers({
  pages,
  sidebars,
  modals,
});

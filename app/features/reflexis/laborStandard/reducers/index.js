import {combineReducers} from 'redux';
import modals from './modals';
import pages from './pages';
import sidebars from './sidebars';

export default combineReducers({
  modals,
  sidebars,
  pages,
});

import {combineReducers} from 'redux';
import pages from './pages';
import modals from './modals';
import sidebars from './sidebars';

export default combineReducers({
  pages,
  modals,
  sidebars,
});


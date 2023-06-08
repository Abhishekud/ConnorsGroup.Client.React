import {combineReducers} from 'redux';
import modals from './modals';
import pages from './pages';
import sidebars from './sidebars';
import selectListOptions from './selectListOptions';

export default combineReducers({
  modals,
  pages,
  sidebars,
  selectListOptions,
});

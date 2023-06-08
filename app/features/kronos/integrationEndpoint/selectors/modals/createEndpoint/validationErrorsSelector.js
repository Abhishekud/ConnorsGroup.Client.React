import {createSelector} from 'reselect';
import sidebarSelector from './modalSelector';

export default createSelector(
  sidebarSelector,
  sidebar => sidebar.get('validationErrors')
);

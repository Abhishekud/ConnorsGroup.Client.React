import {createSelector} from 'reselect';
import sidebarSelector from './sidebarSelector';

export default createSelector(
  sidebarSelector,
  sidebar => sidebar.get('loading')
);


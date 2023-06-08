import {createSelector} from 'reselect';
import pageSelector from './sidebarSelector';

export default createSelector(
  pageSelector,
  page => page.get('validationErrors'),
);

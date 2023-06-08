import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

export default createSelector(
  pageSelector,
  page => !page.get('sort') || !page.get('sort').length
);
import {createSelector} from 'reselect';
import pageSelector from './modalSelector';

export default createSelector(
  pageSelector,
  page => page.get('validationErrors'),
);

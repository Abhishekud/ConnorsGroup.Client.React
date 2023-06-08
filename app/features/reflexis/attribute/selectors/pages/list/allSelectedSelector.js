import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

const allSelectedSelector = createSelector(
  pageSelector,
  page => page.get('allSelected')
);

export default allSelectedSelector;

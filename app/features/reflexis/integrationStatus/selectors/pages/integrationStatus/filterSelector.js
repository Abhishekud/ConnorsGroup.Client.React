import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

const filterSelector = createSelector(
  pageSelector,
  page => page.get('filter')
);

export default filterSelector;

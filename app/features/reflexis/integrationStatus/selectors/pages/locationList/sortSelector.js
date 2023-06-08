import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

const sortSelector = createSelector(
  pageSelector,
  page => page.get('sort')
);

export default sortSelector;

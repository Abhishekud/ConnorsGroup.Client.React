import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import sortedAndFilteredSelectorBuilder from '../../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

const rawRequestsSelector = createSelector(
  pageSelector,
  page => page.getIn(['endpoint', 'requests'])
);

export default sortedAndFilteredSelectorBuilder(rawRequestsSelector, sortSelector, filterSelector);

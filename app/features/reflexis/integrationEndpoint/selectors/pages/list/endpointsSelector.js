import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import sortedAndFilteredSelectorBuilder from '../../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

const endpointsSelector = createSelector(
  pageSelector,
  page => page.get('endpoints')
);

export default sortedAndFilteredSelectorBuilder(endpointsSelector, sortSelector, filterSelector);

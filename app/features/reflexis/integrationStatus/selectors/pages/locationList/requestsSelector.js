import {createSelector} from 'reselect';
import locationSelector from './locationSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import sortedAndFilteredSelectorBuilder from '../../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

const rawRequestsSelector = createSelector(
  locationSelector,
  location => location.get('requests')
);

export default sortedAndFilteredSelectorBuilder(rawRequestsSelector, sortSelector, filterSelector);

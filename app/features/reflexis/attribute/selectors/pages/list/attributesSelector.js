import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import selectedSelector from './selectedSelector';
import allSelectedSelector from './allSelectedSelector';
import sortedAndFilteredSelectorBuilder from '../../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

const attributesSelector = createSelector(
  pageSelector,
  page => page.get('attributes')
);

const withSelectedPropertySelector = createSelector(
  attributesSelector,
  selectedSelector,
  allSelectedSelector,
  (attributes, selectedIds, allSelected) => attributes.map(a => a.set('selected', allSelected || selectedIds.has(a.get('id'))))
);

export default sortedAndFilteredSelectorBuilder(withSelectedPropertySelector, sortSelector, filterSelector);


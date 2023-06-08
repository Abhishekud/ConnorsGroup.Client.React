import {createSelector} from 'reselect';
import attributeSelector from './attributeSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import sortedAndFilteredSelectorBuilder from '../../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

const rawRequestsSelector = createSelector(
  attributeSelector,
  attribute => attribute.get('requests')
);

export default sortedAndFilteredSelectorBuilder(rawRequestsSelector, sortSelector, filterSelector);

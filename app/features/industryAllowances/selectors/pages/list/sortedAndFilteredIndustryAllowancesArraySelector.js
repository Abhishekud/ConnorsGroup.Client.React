import {createSelector} from 'reselect';
import mappingSelector from './mappingSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import {fromJS} from 'immutable';
import sortedAndFilteredSelectorBuilder from '../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

const dataSelector = createSelector(
  mappingSelector,
  mappedData => fromJS(mappedData)
);

export default sortedAndFilteredSelectorBuilder(dataSelector, sortSelector, filterSelector);

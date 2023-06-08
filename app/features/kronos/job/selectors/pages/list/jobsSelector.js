import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import selectedJobSelector from './selectedJobSelector';
import sortedAndFilteredSelectorBuilder from '../../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

const dataSelector = createSelector(
  pageSelector,
  page => page.get('jobs')
);

const selectedDataSelector = createSelector(
  dataSelector,
  selectedJobSelector,
  (data, selected) => (selected === null ? data : data.map(d => d.set('selected', d.get('id') === selected.get('id'))))
);

export default sortedAndFilteredSelectorBuilder(selectedDataSelector, sortSelector, filterSelector);


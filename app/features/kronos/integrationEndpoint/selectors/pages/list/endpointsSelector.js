import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import selectedEndpointSelector from './selectedEndpointSelector';
import sortedAndFilteredSelectorBuilder from '../../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

const dataSelector = createSelector(
  pageSelector,
  page => page.get('integrationEndpoints')
);

const selectedDataSelector = createSelector(
  dataSelector,
  selectedEndpointSelector,
  (data, selected) => (selected === null ? data : data.map(d => d.set('selected', d.get('id') === selected.get('id'))))
);

export default sortedAndFilteredSelectorBuilder(selectedDataSelector, sortSelector, filterSelector);


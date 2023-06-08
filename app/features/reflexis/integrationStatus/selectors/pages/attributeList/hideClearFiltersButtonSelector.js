import {createSelector} from 'reselect';
import filterSelector from './filterSelector';

const hideClearFiltersButtonSelector = createSelector(
  filterSelector,
  filter => !filter
);

export default hideClearFiltersButtonSelector;

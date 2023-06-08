import {createSelector} from 'reselect';
import sortSelector from './sortSelector';

const hideClearSortsButtonSelector = createSelector(
  sortSelector,
  sort => sort.isEmpty()
);

export default hideClearSortsButtonSelector;

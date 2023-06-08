import {createSelector} from 'reselect';
import selectedTaskSelector from './selectedTaskSelector';

export default createSelector(
  selectedTaskSelector,
  selected => (selected.isEmpty() ? 0 : 1)
);

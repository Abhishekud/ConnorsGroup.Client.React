import {createSelector} from 'reselect';
import selectedTaskGroupSelector from './selectedTaskGroupSelector';

export default createSelector(
  selectedTaskGroupSelector,
  selected => (selected.isEmpty() ? 0 : 1)
);

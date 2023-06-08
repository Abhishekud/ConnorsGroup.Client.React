import {createSelector} from 'reselect';
import selectedJobSelector from './selectedJobSelector';

export default createSelector(
  selectedJobSelector,
  selected => (selected.isEmpty() ? 0 : 1)
);

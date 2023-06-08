import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedDepartmentIdSelector from './selectedDepartmentIdSelector';
import {List} from 'immutable';

const sortingSelector = createSelector(
  pageSelector,
  page => page.get('sorts')
);

export default createSelector(
  sortingSelector,
  selectedDepartmentIdSelector,
  (sort, selectedDepartmentId) =>
    sort.get(selectedDepartmentId) || new List()
);

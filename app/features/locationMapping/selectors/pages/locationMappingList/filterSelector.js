import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedDepartmentIdSelector from './selectedDepartmentIdSelector';

const filteringSelector = createSelector(
  pageSelector,
  page => page.get('filters')
);

export default createSelector(
  filteringSelector,
  selectedDepartmentIdSelector,
  (filter, selectedDepartmentId) =>
    filter.get(selectedDepartmentId) || null
);

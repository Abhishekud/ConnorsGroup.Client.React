import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedDepartmentIdSelector from './selectedDepartmentIdSelector';
import {List} from 'immutable';

const columnReorder = createSelector(
  pageSelector,
  page => page.get('columnOrder')
);

export default createSelector(
  columnReorder,
  selectedDepartmentIdSelector,
  (order, selectedDepartmentId) => {
    if (order.get(selectedDepartmentId)) {
      return order.get(selectedDepartmentId);
    }
    const defaultOrder = List();
    return defaultOrder;
  }
);

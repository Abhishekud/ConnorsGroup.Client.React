import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedPartFamilyIdSelector from './selectedPartFamilyIdSelector';
import {List} from 'immutable';

const columnReorder = createSelector(
  pageSelector,
  page => page.get('columnOrder')
);

export default createSelector(
  columnReorder,
  selectedPartFamilyIdSelector,
  (order, selectedPartFamilyId) => {
    if (order.get(selectedPartFamilyId)) {
      return order.get(selectedPartFamilyId);
    }
    return List();
  }
);

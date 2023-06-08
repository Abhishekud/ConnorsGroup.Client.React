import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import {
  departmentNameSelector,
  isLaborHoursEnabledSelector,
} from '../../../../shared/selectors/components/settings';
import {DefaultTableHeaderCell, DefaultTableCell, TwoDecimalNumericCell, DefaultTableNumericCell} from '../../../../customizableGrid/components';

export default createSelector(
  departmentNameSelector, isLaborHoursEnabledSelector,
  (departmentName, isLaborHoursEnabled) => {

    const columns =
    fromJS([{
      width: 600,
      field: 'name',
      title: departmentName.toUpperCase(),
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableCell,
    }, {
      field: 'standardCount',
      title: '# STANDARDS',
      filterable: true,
      sortable: true,
      filter: 'numeric',
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    }]);

    const laborHours = fromJS([{
      width: 200,
      field: 'laborHours',
      title: 'LABOR HOURS',
      filterable: true,
      sortable: true,
      filter: 'numeric',
      headerCell: DefaultTableHeaderCell,
      cell: TwoDecimalNumericCell,
    }]);
    if (!isLaborHoursEnabled) {
      return columns;
    }
    return columns.concat(laborHours);
  }
);

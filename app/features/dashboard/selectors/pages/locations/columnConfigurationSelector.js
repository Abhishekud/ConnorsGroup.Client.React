import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import pluralize from 'pluralize';
import {
  departmentNameSelector,
  locationNameSelector,
  isLaborHoursEnabledSelector,
} from '../../../../shared/selectors/components/settings';
import {TwoDecimalNumericCell, DefaultTableHeaderCell, DefaultTableCell, DefaultTableNumericCell} from '../../../../customizableGrid/components';

export default createSelector(
  departmentNameSelector,
  locationNameSelector, isLaborHoursEnabledSelector,
  (departmentName, locationName, isLaborHoursEnabled) => {

    const columns =
    fromJS([{
      width: 400,
      field: 'name',
      title: locationName.toUpperCase(),
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableCell,
    }, {
      width: 200,
      field: 'description',
      title: `${locationName.toUpperCase()} DESCRIPTION`,
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableCell,
    }, {
      width: 200,
      field: 'locationProfileName',
      title: `${locationName.toUpperCase()} PROFILE`,
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableCell,
    }, {
      width: 200,
      field: 'departmentCount',
      title: `# ${pluralize(departmentName).toUpperCase()}`,
      filterable: true,
      sortable: true,
      filter: 'numeric',
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    }, {
      width: 200,
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

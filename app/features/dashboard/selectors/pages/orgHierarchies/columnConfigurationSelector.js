import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import levelNameSelector from './levelNameSelector';
import pluralize from 'pluralize';
import {
  departmentNameSelector,
  locationNameSelector,
  isLaborHoursEnabledSelector,
} from '../../../../shared/selectors/components/settings';
import {TwoDecimalNumericCell, DefaultTableHeaderCell, DefaultTableCell, DefaultTableNumericCell} from '../../../../customizableGrid/components';

export default createSelector(
  departmentNameSelector,
  locationNameSelector,
  levelNameSelector, isLaborHoursEnabledSelector,
  (departmentName, locationName, levelName, isLaborHoursEnabled) => {

    const columns =
    fromJS([{
      width: 400,
      field: 'name',
      title: levelName.toUpperCase(),
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableCell,
    }, {
      width: 200,
      field: `# ${pluralize(locationName).toUpperCase()}`,
      title: 'LOCATION DESCRIPTION',
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

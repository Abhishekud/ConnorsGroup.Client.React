import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import sortedStandardsSelector from './sortedStandardsSelector';
import headerSelectionValueSelector from './headerSelectionValueSelector';
import {NameWrapCell, NumericFilterCell, FixedVariableCell, FixedVariableFilterCell} from '../../../../customizableGrid/components';
import StandardIdCellWithHyperLink from '../../../components/StandardIdCellWithHyperLink';

const staticColumns =
fromJS([
  {field: 'id', width: 100, title: 'ID', included: true, sortable: true, filterable: true, filter: 'numeric', filterCell: NumericFilterCell, cell: StandardIdCellWithHyperLink},
  {field: 'name', width: 400, title: 'Name', included: true, sortable: true, cell: NameWrapCell, filterable: true},
  {field: 'departmentName', width: 200, title: 'Department', included: true, sortable: true, filterable: true},
  {field: 'jobClassName', width: 200, title: 'Job Class', included: true, sortable: true, filterable: true},
  {field: 'laborCategoryName', width: 200, title: 'Labor Category', included: true, sortable: true, filterable: true},
  {field: 'classificationName', width: 200, title: 'Classification', included: true, sortable: true, filterable: true},
  {field: 'allowanceName', width: 200, title: 'Allowance', included: true, sortable: true, filterable: true},
  {field: 'attributeName', width: 200, title: 'Attribute', included: true, sortable: true, filterable: true},
  {field: 'fixed', width: 200, title: 'Fixed/Variable', included: true, sortable: true, filterable: true, filterCell: FixedVariableFilterCell, cell: FixedVariableCell},
  {field: 'applicatorEmail', width: 200, title: 'Applicator', included: true, sortable: true, filterable: true},
  {field: 'status', width: 200, title: 'Status', included: true, sortable: true, filterable: true},
]);
export default createSelector(
  sortedStandardsSelector,
  headerSelectionValueSelector,
  (data, headerCheckbox) => {

    const activeColumns =
    fromJS([{
      width: 50,
      field: 'selected',
      headerSelectionValue: headerCheckbox,
      filterable: false,
    }]);

    const columns = activeColumns
      .concat(staticColumns);
    return columns;
  }
);

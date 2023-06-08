import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import headerSelectionValueSelector from './headerSelectionValueSelector';
import {NumericFilterCell, NameWrapCell} from '../../../../customizableGrid/components';
import {IndustryElementApplicatorInstructionsCell} from '../../../components';
import {canStandardsEditSelector} from '../../../../authentication/selectors/currentUser';
import departmentNameSelector from '../../../../shared/selectors/components/settings/departmentNameSelector';

export default createSelector(
  headerSelectionValueSelector,
  canStandardsEditSelector,
  departmentNameSelector,
  (headerCheckbox, canStandardsEdit, departmentName) => {

    const activeColumns = canStandardsEdit
      ? fromJS([{
        width: 50,
        field: 'selected',
        required: true,
        headerSelectionValue: headerCheckbox,
        filterable: false,
      }])
      : fromJS([]);

    const staticColumns =
fromJS([{
  width: 100,
  field: 'id',
  title: 'ID',
  filterable: true,
  filter: 'numeric',
  filterCell: NumericFilterCell,
  sortable: true,
}, {
  width: 120,
  field: 'existingId',
  title: 'Existing',
  filterable: true,
  sortable: true,
  filter: 'numeric',
  filterCell: NumericFilterCell,
}, {
  width: 500,
  field: 'name',
  title: 'Name',
  cell: NameWrapCell,
  filterable: true,
  sortable: true,
}, {
  width: 200,
  field: 'departmentName',
  title: departmentName,
  filterable: true,
  sortable: true,
}, {
  width: 150,
  field: 'applicatorInstructions',
  title: 'App. Inst.',
  cell: IndustryElementApplicatorInstructionsCell,
  filterable: true,
  sortable: true,
}]);

    const columns = activeColumns
      .concat(staticColumns);


    return columns;
  }
);

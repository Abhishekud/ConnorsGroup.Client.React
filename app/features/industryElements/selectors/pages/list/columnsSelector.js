import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import headerSelectionValueSelector from './headerSelectionValueSelector';
import {NumericFilterCell, NameWrapCell} from '../../../../customizableGrid/components';
import {IndustryElementTimeCell, IndustryElementApplicatorInstructionsCell} from '../../../components';
import {canElementsEditSelector} from '../../../../authentication/selectors/currentUser';

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
  filter: 'numeric',
  filterCell: NumericFilterCell,
  filterable: true,
  sortable: true,
}, {
  width: 500,
  field: 'name',
  title: 'Name',
  cell: NameWrapCell,
  filterable: true,
  sortable: true,
}, {
  width: 250,
  field: 'elementUnitOfMeasureName',
  title: 'Unit of Measure',
  filterable: true,
  sortable: true,
}, {
  width: 150,
  field: 'measuredTimeMeasurementUnits',
  title: 'Time',
  filterable: true,
  filter: 'numeric',
  cell: IndustryElementTimeCell,
  sortable: true,
}, {
  width: 150,
  field: 'applicatorInstructions',
  title: 'App. Inst.',
  cell: IndustryElementApplicatorInstructionsCell,
  filterable: true,
  sortable: true,
}]);

export default createSelector(
  headerSelectionValueSelector,
  canElementsEditSelector,
  (headerCheckbox, canElementsEdit) => {

    const activeColumns = canElementsEdit
      ? fromJS([{
        width: 50,
        field: 'selected',
        required: true,
        headerSelectionValue: headerCheckbox,
        filterable: false,
      }])
      : fromJS([]);

    const columns = activeColumns
      .concat(staticColumns);


    return columns;
  }
);

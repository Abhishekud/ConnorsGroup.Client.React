import {fromJS} from 'immutable';
import {
  LOAD_ELEMENTS_LIST_PENDING,
  LOAD_ELEMENTS_LIST_FULFILLED,
  LOAD_ELEMENTS_LIST_REJECTED,
} from '../../../elements/actions';
import {ElementTimeCell, ElementIdCell, ElementTypeCell, ElementApplicatorInstructionsCell} from '../../../elements/components';
import {NameWrapCell, NumericFilterCell} from '../../../customizableGrid/components';


const initialState = fromJS({
  loading: false,
  columns:
([{
  width: 100,
  field: 'id',
  title: 'ID',
  filterable: true,
  filter: 'numeric',
  cell: ElementIdCell,
  filterCell: NumericFilterCell,
  sortable: true,
}, {
  width: 150,
  field: 'elementTypeAbbreviated',
  title: 'Type',
  cell: ElementTypeCell,
  filterable: true,
  sortable: true,
}, {
  width: 400,
  field: 'name',
  title: 'Name',
  cell: NameWrapCell,
  filterable: true,
  sortable: true,
}, {
  width: 150,
  field: 'elementUnitOfMeasureName',
  title: 'Unit of Measure',
  filterable: true,
  sortable: true,
}, {
  width: 300,
  field: 'elementActivityName',
  title: 'Activity',
  filterable: true,
  sortable: true,
}, {
  width: 150,
  field: 'status',
  title: 'Status',
  filterable: true,
  sortable: true,
}, {
  width: 150,
  field: 'measuredTimeMeasurementUnits',
  title: 'Time',
  filterable: true,
  filter: 'numeric',
  cell: ElementTimeCell,
  sortable: true,
}, {
  width: 150,
  field: 'applicatorInstructions',
  title: 'App. Inst.',
  cell: ElementApplicatorInstructionsCell,
  filterable: true,
  sortable: true,
}]),

});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ELEMENTS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_ELEMENTS_LIST_FULFILLED:
      return state.set('loading', false);

    case LOAD_ELEMENTS_LIST_REJECTED:
      return initialState;

    default:
      return state;
  }
}

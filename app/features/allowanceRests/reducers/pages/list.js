import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS, List} from 'immutable';
import {
  LOAD_ALLOWANCE_RESTS_LIST_PENDING,
  LOAD_ALLOWANCE_RESTS_LIST_FULFILLED,
  LOAD_ALLOWANCE_RESTS_LIST_REJECTED,
  SORT_ALLOWANCE_RESTS_LIST,
  FILTER_ALLOWANCE_REST_LIST,
  CREATE_ALLOWANCE_REST_FULFILLED,
  DELETE_ALLOWANCE_REST_FULFILLED,
  UPDATE_ALLOWANCE_REST_FULFILLED,
  SELECT_ALLOWANCE_REST,
  CLEAR_SELECTED_ALLOWANCE_REST,
  CLOSE_ALLOWANCE_RESTS_LIST_EDIT_SIDEBAR,
} from '../../actions';
import {PoundsHandledFilterCell, PercentUnderLoadFilterCell, DefaultTableNumericCell, DefaultTableHeaderCell, DefaultTableCell, TwoDecimalNumericCell} from '../../../customizableGrid/components';

const initialState = Map({
  loading: false,
  allowanceRests: Map(),
  sort: new List(),
  filter: null,
  selectedAllowanceRestId: null,
  columns: fromJS([
    {
      width: 200,
      field: 'name',
      title: 'Name',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableCell,
    },
    {
      width: 200,
      field: 'poundsHandled',
      title: 'Pounds Handled',
      filterable: true,
      sortable: true,
      filterCell: PoundsHandledFilterCell,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'percentUnderLoad',
      title: 'Percent Under Load',
      filterable: true,
      sortable: true,
      filterCell: PercentUnderLoadFilterCell,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'muscularForce',
      title: 'Muscular Force',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'conditionalMultiplier',
      title: 'Conditional Multiplier',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'positionalMultiplier',
      title: 'Positional Multiplier',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'visualStrain',
      title: 'Visual Strain',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'noise',
      title: 'Noise',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: TwoDecimalNumericCell,
    },
    {
      width: 200,
      field: 'safetyDevices',
      title: 'Safety Devices',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: TwoDecimalNumericCell,
    },
    {
      width: 200,
      field: 'concentration',
      title: 'Concentration',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'totalRestPercent',
      title: 'Total Rest %',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'allowancesCount',
      title: '# of Allowances',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    }]),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ALLOWANCE_RESTS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_ALLOWANCE_RESTS_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('allowanceRests', modelsArrayToMapById(action.payload.data))
          .set('selectedAllowanceRestId', null));

    case LOAD_ALLOWANCE_RESTS_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_ALLOWANCE_REST_FULFILLED:
    case UPDATE_ALLOWANCE_REST_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['allowanceRests', data.id], fromJS(data));
    }

    case DELETE_ALLOWANCE_REST_FULFILLED:
      return state.deleteIn(['allowanceRests', action.payload.data]);

    case FILTER_ALLOWANCE_REST_LIST:
      return state.set('filter', action.payload);

    case SORT_ALLOWANCE_RESTS_LIST:
      return state.set('sort', action.payload);

    case SELECT_ALLOWANCE_REST:
      return state.set('selectedAllowanceRestId', action.payload.get('id'));

    case CLEAR_SELECTED_ALLOWANCE_REST:
    case CLOSE_ALLOWANCE_RESTS_LIST_EDIT_SIDEBAR:
      return state.set('selectedAllowanceRestId', null);

    default:
      return state;
  }
}

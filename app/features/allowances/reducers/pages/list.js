import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS, List} from 'immutable';
import {
  LOAD_ALLOWANCES_LIST_PENDING,
  LOAD_ALLOWANCES_LIST_FULFILLED,
  LOAD_ALLOWANCES_LIST_REJECTED,
  FILTER_ALLOWANCES_LIST,
  SORT_ALLOWANCES_LIST,
  DELETE_ALLOWANCE_FULFILLED,
  UPDATE_ALLOWANCE_FULFILLED,
} from '../../actions';
import {TwoDecimalNumericCell, DefaultTableHeaderCell, DefaultTableNumericCell, DefaultTableCell} from '../../../customizableGrid/components';

const initialState = Map({
  loading: false,
  allowances: Map(),
  sort: new List(),
  filter: null,
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
      field: 'paidTimeMinutes',
      title: 'Paid Time (Mins)',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'excludedPaidBreaksMinutes',
      title: 'Excluded Paid Breaks (Mins)',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'reliefTimeMinutes',
      title: 'Relief Time (Mins)',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'includedPaidBreaksMinutes',
      title: 'Included Paid Breaks (Mins)',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'minorUnavoidableDelayPercent',
      title: 'Minor Unavoidable Delay %',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'additionalDelayPercent',
      title: 'Additional Delay %',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'machineAllowancePercent',
      title: 'Incentive Opportunity Allowance %',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'allowancePercent',
      title: 'Allowance %',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: TwoDecimalNumericCell,
    },
    {
      width: 200,
      field: 'allowanceFactor',
      title: 'Calculated PR&D Allowance Factor',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: TwoDecimalNumericCell,
    },
    {
      width: 200,
      field: 'standardsCount',
      title: '# of Standards',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    },
    {
      width: 200,
      field: 'standardHistoriesCount',
      title: '# of Standard Revisions',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    }]),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ALLOWANCES_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_ALLOWANCES_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('allowances', modelsArrayToMapById(action.payload.data))
          .set('selectedAllowanceId', null));

    case LOAD_ALLOWANCES_LIST_REJECTED:
      return state.set('loading', false);

    case UPDATE_ALLOWANCE_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['allowances', data.id], fromJS(data));
    }

    case DELETE_ALLOWANCE_FULFILLED:
      return state.deleteIn(['allowances', action.payload.data]);

    case SORT_ALLOWANCES_LIST:
      return state.set('sort', action.payload);

    case FILTER_ALLOWANCES_LIST:
      return state.set('filter', action.payload);

    default:
      return state;
  }
}

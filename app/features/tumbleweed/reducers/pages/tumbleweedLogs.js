import {List, fromJS} from 'immutable';
import {DefaultTableCell, DefaultTableHeaderCell} from '../../../customizableGrid/components';
import {
  LOAD_TUMBLEWEED_LOGS_PENDING,
  LOAD_TUMBLEWEED_LOGS_FULFILLED,
  LOAD_TUMBLEWEED_LOGS_REJECTED,
  SORT_TUMBLEWEED_LOGS_LIST,
  FILTER_TUMBLEWEED_LOGS_LIST,
} from '../../actions';

const initialState = fromJS({
  logs: new List(),
  loading: true,
  sort: [{field: 'timeInZone', dir: 'desc'}],
  filter: null,
  columns:
      [{
        width: 150,
        field: 'timeInZone',
        title: 'Time',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }, {
        width: 170,
        field: 'status',
        title: 'Status',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }, {
        width: 300,
        field: 'filename',
        title: 'File',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }, {
        width: 300,
        field: 'email',
        title: 'User',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }, {
        width: 350,
        field: 'serverFingerprint',
        title: 'Fingerprint',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }, {
        width: 600,
        field: 'exception',
        title: 'Exception',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }],

});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TUMBLEWEED_LOGS_PENDING:
      return state.set('loading', true);
    case LOAD_TUMBLEWEED_LOGS_REJECTED:
      return state.set('loading', false);
    case LOAD_TUMBLEWEED_LOGS_FULFILLED: {
      return state.set('logs', fromJS(action.payload.data))
        .set('loading', false);
    }
    case SORT_TUMBLEWEED_LOGS_LIST: {
      return state.set('sort', action.payload);
    }
    case FILTER_TUMBLEWEED_LOGS_LIST: {
      return state.set('filter', action.payload);
    }
    default:
      return state;
  }
}

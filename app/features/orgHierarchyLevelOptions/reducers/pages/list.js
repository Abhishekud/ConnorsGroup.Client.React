import {modelsArrayToMapById, modelsArrayToRecordMapById} from '../../../shared/services';
import {Map, fromJS, List} from 'immutable';
import {
  LOAD_ORG_HIERARCHY_LEVELS_LIST_PENDING,
  LOAD_ORG_HIERARCHY_LEVELS_LIST_FULFILLED,
  LOAD_ORG_HIERARCHY_LEVELS_LIST_REJECTED,
} from '../../../orgHierarchyLevels/actions';
import {OrgHierarchyLevelModel} from '../../../orgHierarchyLevels/models';
import {
  LOAD_ALL_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_PENDING,
  LOAD_ALL_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_FULFILLED,
  LOAD_ALL_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_REJECTED,
  LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_PENDING,
  LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_FULFILLED,
  LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_REJECTED,
  SORT_ORG_HIERARCHY_LEVEL_OPTIONS_LIST,
  FILTER_ORG_HIERARCHY_LEVEL_OPTIONS_LIST,
  CREATE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED,
  DELETE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED,
  UPDATE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED,
  SELECT_ORG_HIERARCHY_LEVEL_OPTION,
  CLEAR_SELECTED_ORG_HIERARCHY_LEVEL_OPTION,
  CLOSE_EDIT_ORG_HIERARCHY_LEVEL_OPTION_SIDEBAR,
} from '../../actions';
import {DefaultTableHeaderCell, DefaultTableCell} from '../../../customizableGrid/components';

const initialState = Map({
  loading: false,
  orgHierarchyLevels: Map(),
  orgHierarchyLevelOptions: Map(),
  allOrgHierarchyLevelOptions: Map(),
  sort: new List(),
  filter: null,
  selectedOrgHierarchyLevelId: null,
  selectedOrgHierarchyLevelOptionId: null,
  secondaryLevelColumn: fromJS([{
    field: 'value',
    title: 'Value',
    filterable: true,
    sortable: true,
    headerCell: DefaultTableHeaderCell,
    cell: DefaultTableCell,
  },
  {
    field: 'parentOrgHierarchyLevelOptionValue',
    title: 'Parent Value',
    filterable: true,
    sortable: true,
    headerCell: DefaultTableHeaderCell,
    cell: DefaultTableCell,
  }]),
  primaryLevelColumn: fromJS([{
    field: 'value',
    title: 'Value',
    filterable: true,
    sortable: true,
    headerCell: DefaultTableHeaderCell,
    cell: DefaultTableCell,
  }]),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ORG_HIERARCHY_LEVELS_LIST_PENDING:
    case LOAD_ALL_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_PENDING:
    case LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_PENDING:
      return state.withMutations(map =>
        map.set('loading', true)
          .set('selectedOrgHierarchyLevelId', initialState.get('selectedOrgHierarchyLevelId')));

    case LOAD_ORG_HIERARCHY_LEVELS_LIST_FULFILLED:
      return state.set('orgHierarchyLevels', modelsArrayToRecordMapById(action.payload.data.levels, OrgHierarchyLevelModel));

    case LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_FULFILLED: {
      const {orgHierarchyLevelId, orgHierarchyLevelOptions} = action.payload.data;

      return state.withMutations(map =>
        map.set('loading', false)
          .set('orgHierarchyLevelOptions', modelsArrayToMapById(orgHierarchyLevelOptions))
          .set('selectedOrgHierarchyLevelId', orgHierarchyLevelId)
          .set('selectedOrgHierarchyLevelOptionId', null));
    }

    case LOAD_ALL_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_FULFILLED:
      return state.set('allOrgHierarchyLevelOptions', modelsArrayToMapById(action.payload.data));

    case LOAD_ORG_HIERARCHY_LEVELS_LIST_REJECTED:
    case LOAD_ALL_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_REJECTED:
    case LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED:
    case UPDATE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED: {
      const {data} = action.payload;
      const orgHierarchyLevelOption = fromJS(data);

      return state.withMutations(map =>
        map.setIn(['orgHierarchyLevelOptions', data.id], orgHierarchyLevelOption)
          .setIn(['allOrgHierarchyLevelOptions', data.id], orgHierarchyLevelOption)
          .setIn(['locationParents', data.id], orgHierarchyLevelOption));
    }

    case DELETE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED: {
      const id = action.payload.data;

      return state.withMutations(map =>
        map.deleteIn(['orgHierarchyLevelOptions', id])
          .deleteIn(['allOrgHierarchyLevelOptions', id])
          .deleteIn(['locationParents', id]));
    }

    case SORT_ORG_HIERARCHY_LEVEL_OPTIONS_LIST:
      return state.set('sort', action.payload);

    case FILTER_ORG_HIERARCHY_LEVEL_OPTIONS_LIST:
      return state.set('filter', action.payload);

    case SELECT_ORG_HIERARCHY_LEVEL_OPTION: {
      const {orgHierarchyLevelOption} = action.payload;
      return state.set('selectedOrgHierarchyLevelOptionId', orgHierarchyLevelOption.get('id'));
    }

    case CLEAR_SELECTED_ORG_HIERARCHY_LEVEL_OPTION:
    case CLOSE_EDIT_ORG_HIERARCHY_LEVEL_OPTION_SIDEBAR:
      return state.set('selectedOrgHierarchyLevelOptionId', null);

    default:
      return state;
  }
}

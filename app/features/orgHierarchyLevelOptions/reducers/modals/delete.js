import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_ORG_HIERARCHY_LEVEL_OPTION,
  SHOW_DELETE_ORG_HIERARCHY_LEVEL_OPTION,
  DELETE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED,
  DELETE_ORG_HIERARCHY_LEVEL_OPTION_PENDING,
  DELETE_ORG_HIERARCHY_LEVEL_OPTION_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  validationErrors: Map(),
  model: new Map({
    id: null,
    value: null,
  }),
  orgHierarchyLevelId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_ORG_HIERARCHY_LEVEL_OPTION: {
      const {orgHierarchyLevelId, orgHierarchyLevelOption} = action.payload;
      const model = Map({
        id: orgHierarchyLevelOption.get('id'),
        value: orgHierarchyLevelOption.get('value'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model)
          .set('orgHierarchyLevelId', orgHierarchyLevelId));
    }

    case DELETE_ORG_HIERARCHY_LEVEL_OPTION_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_ORG_HIERARCHY_LEVEL_OPTION:
    case DELETE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED:
      return initialState;

    case DELETE_ORG_HIERARCHY_LEVEL_OPTION_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}

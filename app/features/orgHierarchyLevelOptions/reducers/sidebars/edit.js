import {fromJS, Map} from 'immutable';
import {
  LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_FULFILLED,
  SELECT_ORG_HIERARCHY_LEVEL_OPTION,
  CLEAR_SELECTED_ORG_HIERARCHY_LEVEL_OPTION,
  CLOSE_EDIT_ORG_HIERARCHY_LEVEL_OPTION_SIDEBAR,
  SET_EDIT_ORG_HIERARCHY_LEVEL_OPTION_MODEL_PROPERTY,
  UPDATE_ORG_HIERARCHY_LEVEL_OPTION_PENDING,
  UPDATE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED,
  UPDATE_ORG_HIERARCHY_LEVEL_OPTION_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  saving: false,
  model: Map(),
  validationErrors: Map(),
  orgHierarchyLevelId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_ORG_HIERARCHY_LEVEL_OPTION:
    case CLOSE_EDIT_ORG_HIERARCHY_LEVEL_OPTION_SIDEBAR:
    case LOAD_ORG_HIERARCHY_LEVEL_OPTIONS_LIST_FULFILLED:
    case UPDATE_ORG_HIERARCHY_LEVEL_OPTION_FULFILLED:
      return initialState;

    case SELECT_ORG_HIERARCHY_LEVEL_OPTION: {
      const {orgHierarchyLevelId, orgHierarchyLevelOption} = action.payload;

      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', orgHierarchyLevelOption)
          .set('orgHierarchyLevelId', orgHierarchyLevelId)
          .set('validationErrors', Map()));
    }

    case SET_EDIT_ORG_HIERARCHY_LEVEL_OPTION_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case UPDATE_ORG_HIERARCHY_LEVEL_OPTION_PENDING:
      return state.set('saving', true);

    case UPDATE_ORG_HIERARCHY_LEVEL_OPTION_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}

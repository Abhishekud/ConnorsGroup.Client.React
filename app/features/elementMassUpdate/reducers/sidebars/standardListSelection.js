import {fromJS, Map, List} from 'immutable';
import {
  SET_EDIT_MASS_UPDATE_ELEMENT_WORKING_MODEL_PROPERTY,
  ELEMENT_WHERE_USED_STANDARDS_LIST_PENDING,
  MASS_UPDATE_REPLACE_ELEMENT_PENDING,
  MASS_UPDATE_REPLACE_ELEMENT_REJECTED,
  OPEN_MASS_UPDATE_ELEMENT_SEARCH,
  CLOSE_MASS_UPDATE_ELEMENT_SEARCH,
  SELECT_ELEMENT_WHERE_USED_STANDARD,
  SELECT_ELEMENT_WHERE_USED_ALL_STANDARDS,
} from '../../actions';

const initialState = Map({
  show: false,
  editing: false,
  saving: false,
  workingModel: Map({
    newElementId: null,
    standardIds: List(),
    standardRevisionComment: '',
  }),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case ELEMENT_WHERE_USED_STANDARDS_LIST_PENDING:
      return initialState;

    case SET_EDIT_MASS_UPDATE_ELEMENT_WORKING_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['workingModel', name], value);
    }

    case SELECT_ELEMENT_WHERE_USED_STANDARD:
      return state.withMutations(map => {
        map.updateIn(['workingModel', 'standardIds'], x => {
          const index = x.indexOf(action.payload);
          if (index >= 0) {
            return x.delete(index);
          }
          return x.push(action.payload);
        });
      });

    case SELECT_ELEMENT_WHERE_USED_ALL_STANDARDS: {
      const {ids, selected} = action.payload;
      return state.withMutations(map => {
        ids.forEach(id => {
          map.updateIn(['workingModel', 'standardIds'], x => {
            const index = x.indexOf(id);
            if (index >= 0 && !selected) return x.delete(index);
            if (index === -1 && selected) return x.push(id);
            return x;
          });
        });
      });
    }

    case OPEN_MASS_UPDATE_ELEMENT_SEARCH:
      return state.set('searchElements', true);

    case CLOSE_MASS_UPDATE_ELEMENT_SEARCH:
      return state.set('searchElements', false);

    case MASS_UPDATE_REPLACE_ELEMENT_PENDING:
      return state.set('saving', true);

    case MASS_UPDATE_REPLACE_ELEMENT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}

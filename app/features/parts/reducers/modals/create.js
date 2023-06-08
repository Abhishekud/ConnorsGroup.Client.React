import {Map, List, fromJS} from 'immutable';
import {
  CANCEL_CREATE_PART,
  CREATE_PART_FULFILLED,
  CREATE_PART_PENDING,
  CREATE_PART_REJECTED,
  SET_CREATE_PART_MODEL_PROPERTY,
  SET_CREATE_PART_FIELD_VALUE_MODEL_PROPERTY,
  SHOW_CREATE_PART,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
    partFieldValues: List(),
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_PART:
      return initialState.set('show', true);

    case SET_CREATE_PART_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_CREATE_PART_FIELD_VALUE_MODEL_PROPERTY: {
      const {id, value} = action.payload;
      const partFields = state.getIn(['model', 'partFieldValues']);
      const index = partFields.findIndex(y => y.get('partFieldId') === id);

      return state.updateIn(['model', 'partFieldValues'], x => {
        if (index === -1) {
          if (value === null) return x;
          return x.push(fromJS({partFieldId: id, value}));
        }
        if (value === null || value === '') {
          return x.delete(index);
        }
        return x.set(index, fromJS({partFieldId: id, value}));
      });
    }

    case CREATE_PART_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_PART:
    case CREATE_PART_FULFILLED:
      return initialState;

    case CREATE_PART_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}

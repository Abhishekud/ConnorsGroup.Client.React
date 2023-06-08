import {Map} from 'immutable';
import {
  CONFIRM_DELETE_STANDARD_ITEM,
  CANCEL_DELETE_STANDARD_ITEM,
  DELETE_STANDARD_ELEMENTS_PENDING,
  DELETE_STANDARD_ELEMENTS_FULFILLED,
  DELETE_STANDARD_ELEMENTS_REJECTED,
  DELETE_STANDARD_ELEMENT_GROUP_PENDING,
  DELETE_STANDARD_ELEMENT_GROUP_FULFILLED,
  DELETE_STANDARD_ELEMENT_GROUP_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  processing: false,
  standardId: 0,
  model: new Map({
    id: 0,
    name: '',
    type: '',
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CONFIRM_DELETE_STANDARD_ITEM: {
      const {standardId, standardItem} = action.payload;

      return state.withMutations(map =>
        map.set('show', true)
          .set('standardId', Number(standardId))
          .setIn(['model', 'id'], standardItem.get('id'))
          .setIn(['model', 'name'], standardItem.get('name'))
          .setIn(['model', 'type'], standardItem.get('type'))
      );
    }

    case DELETE_STANDARD_ELEMENTS_PENDING:
    case DELETE_STANDARD_ELEMENT_GROUP_PENDING:
      return state.set('processing', true);

    case CANCEL_DELETE_STANDARD_ITEM:
    case DELETE_STANDARD_ELEMENTS_FULFILLED:
    case DELETE_STANDARD_ELEMENT_GROUP_FULFILLED:
      return initialState;

    case DELETE_STANDARD_ELEMENTS_REJECTED:
    case DELETE_STANDARD_ELEMENT_GROUP_REJECTED:
      return state.set('processing', false);

    default:
      return state;
  }
}

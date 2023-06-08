import {fromJS} from 'immutable';
import {
  LOAD_ATTRIBUTES_PENDING,
  LOAD_ATTRIBUTES_FULFILLED,
  LOAD_ATTRIBUTES_REJECTED,
  DELETE_REFLEXIS_ATTRIBUTE_FULFILLED,
  FILTER_ATTRIBUTES,
  SORT_ATTRIBUTES,
  SELECT_ATTRIBUTE,
  TOGGLE_SELECT_ALL_ATTRIBUTES,
  OPEN_ATTRIBUTE_SIDEBAR,
  CLOSE_ATTRIBUTE_SIDEBAR,
  UPDATE_REFLEXIS_ATTRIBUTE_FULFILLED,
} from '../../actions';

const initialState = fromJS({
  attributes: [],
  selected: {},
  allSelected: false,
  sort: [],
  filter: null,
  numberOfSidebarsOpen: 0,
  loading: false,
  selectedAttributeId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case (LOAD_ATTRIBUTES_PENDING):
      return state.withMutations(map =>
        map.set('loading', true)
          .set('sort', initialState.get('sort'))
          .set('filter', initialState.get('filter'))
      );

    case (LOAD_ATTRIBUTES_REJECTED):
      return state.set('loading', false);

    case (LOAD_ATTRIBUTES_FULFILLED): {
      if (action.payload.status === 200) {
        return state
          .set('loading', false)
          .set('attributes', fromJS(action.payload.data.attributes));
      }
      return state.set('loading', false);
    }

    case (OPEN_ATTRIBUTE_SIDEBAR):
      return state.set('selectedAttributeId', action.payload.get('id')).update('numberOfSidebarsOpen', n => n + 1);

    // All the cases that will cause the edit sidebar to close.
    case (CLOSE_ATTRIBUTE_SIDEBAR):
    case (UPDATE_REFLEXIS_ATTRIBUTE_FULFILLED):
    case (DELETE_REFLEXIS_ATTRIBUTE_FULFILLED):
      return state.set('selectedAttributeId', null).update('numberOfSidebarsOpen', n => n - 1);

    case (SELECT_ATTRIBUTE): {
      if (state.get('allSelected') !== true) {
        return state.hasIn(['selected', action.payload.id]) ? state.deleteIn(['selected', action.payload.id]) : state.setIn(['selected', action.payload.id], true);
      }
      return state;
    }

    case (TOGGLE_SELECT_ALL_ATTRIBUTES):
      return state.set('selected', initialState.get('selected'))
        .update('allSelected', s => !s);

    case (FILTER_ATTRIBUTES):
      return state.set('filter', action.payload).set('allSelected', false).set('selected', initialState.get('selected'));

    case (SORT_ATTRIBUTES):
      return state.set('sort', action.payload);
  }

  return state;
}


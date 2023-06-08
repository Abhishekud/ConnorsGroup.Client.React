import {fromJS, List, Map} from 'immutable';
import {
  TOGGLE_SHOW_ELEMENT_MASS_UPDATE,
  ELEMENT_WHERE_USED_STANDARDS_LIST_PENDING,
  ELEMENT_WHERE_USED_STANDARDS_LIST_FULFILLED,
  ELEMENT_WHERE_USED_STANDARDS_LIST_REJECTED,
  SORT_ELEMENT_WHERE_USED_STANDARDS_LIST,
  SELECT_ELEMENT_WHERE_USED_STANDARD,
  SELECT_ELEMENT_WHERE_USED_ALL_STANDARDS,
  FILTER_ELEMENT_WHERE_USED_STANDARDS_LIST,
} from '../../actions';
import {
  createStandardStates,
} from '../../../standards/services';

const initialState = Map({
  show: false,
  loading: false,
  headerSelectionValue: false,
  sort: new List(),
  standards: new List(),
  standardStates: Map(),
  filter: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SHOW_ELEMENT_MASS_UPDATE:
      return state.withMutations(map =>
        map.set('show', !state.get('show'))
          .set('elementType', action.payload)
      );

    case ELEMENT_WHERE_USED_STANDARDS_LIST_PENDING:
      return state.set('loading', true);

    case ELEMENT_WHERE_USED_STANDARDS_LIST_FULFILLED: {
      const standards = fromJS(action.payload.data);
      const newStandards = action.payload.data.map(obj => ({...obj, selected: false}));
      return state.withMutations(map =>
        map.set('loading', false)
          .set('headerSelectionValue', false)
          .set('standards', fromJS(newStandards))
          .set('standardStates', createStandardStates(standards)));
    }

    case ELEMENT_WHERE_USED_STANDARDS_LIST_REJECTED:
      return state.set('loading', false);

    case SELECT_ELEMENT_WHERE_USED_STANDARD: {
      const index = state.get('standards').findIndex(s => s.get('id') === action.payload);
      if (index === -1) throw new Error('Unknown standard selected');

      return state
        .updateIn(['standards', index, 'selected'], v => !v)
        .withMutations(map => {
          map.setIn(['headerSelectionValue'], !map.get('standards').some(s => !s.get('selected')));
          map.setIn(['standardStates', action.payload, 'selected'],
            !map.getIn(['standardStates', action.payload, 'selected']));
        });
    }

    case SELECT_ELEMENT_WHERE_USED_ALL_STANDARDS: {
      return state.withMutations(map => {
        map.setIn(['headerSelectionValue'], action.payload.selected);
        map.update('standards', standards => standards.map(standards => {
          if (action.payload.ids.includes(standards.get('id'))) {
            return standards.set('selected', action.payload.selected);
          }
          return standards.set('selected', false);
        }));
      });
    }

    case SORT_ELEMENT_WHERE_USED_STANDARDS_LIST:
      return state.set('sort', action.payload);

    case FILTER_ELEMENT_WHERE_USED_STANDARDS_LIST: {
      return state.withMutations(map =>
        map.set('filter', action.payload)
          .set('skip', 0)
          .update('standards', standards => standards.map(standards => standards.set('selected', false)))
          .set('headerSelectionValue', false));
    }
    default:
      return state;
  }
}

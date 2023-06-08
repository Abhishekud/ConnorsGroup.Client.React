import {fromJS, List, Map} from 'immutable';
import {
  SAVE_EDIT,
  CANCEL_EDIT,
  SORT_LABOR_DRIVERS,
  FILTER_LABOR_DRIVERS,
  DELETE_FULFILLED,

  CREATE_FULFILLED,
  CREATE_REJECTED,
  CREATE_PENDING,

  LOAD_LABOR_DRIVERS_LIST_PENDING,
  LOAD_LABOR_DRIVERS_LIST_FULFILLED,
  LOAD_LABOR_DRIVERS_LIST_REJECTED,

  LOAD_LABOR_DRIVER_PENDING,
  LOAD_LABOR_DRIVER_FULFILLED,
  LOAD_LABOR_DRIVER_REJECTED,

  SAVE_EDIT_FULFILLED,
  CLEAR_LABOR_DRIVER_LIST_FILTERS,
  CLEAR_LABOR_DRIVER_LIST_SORTS,
} from '../../actions';

const initialState = fromJS({
  laborDrivers: new List(),
  selectedLaborDriver: new Map(),
  sort: new List(),
  filter: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_FULFILLED:
      if (action.payload.status === 200) {
        return state.withMutations(s =>
          s.update('laborDrivers', lds => lds.push(fromJS(
            {
              id: action.payload.data.id,
              name: action.payload.data.name,
              laborDriverTypeName: action.payload.data.laborDriverTypeName,
            })))
            .set('loading', false)
            .set('selectedLaborDriver', fromJS(action.payload.data))
        );
      }
      return state;
    case CREATE_PENDING:
      return state.set('loading', true);
    case CREATE_REJECTED:
      return state.set('loading', false);

    case CANCEL_EDIT:
      return state.set('selectedLaborDriver', new Map());
    case SAVE_EDIT: {
      const index = state.get('laborDrivers').findIndex(d => d.get('id') === action.payload.get('id'));
      return state.setIn(['laborDrivers', index], action.payload).set('selectedLaborDriver', null);
    }
    case SORT_LABOR_DRIVERS:
      return state.set('sort', action.payload);
    case FILTER_LABOR_DRIVERS:
      return state.set('filter', action.payload);

    case LOAD_LABOR_DRIVERS_LIST_FULFILLED:
      return state.set('loading', false).set('laborDrivers', fromJS(action.payload.data.laborDrivers));
    case LOAD_LABOR_DRIVERS_LIST_PENDING:
      return state.set('loading', true);
    case LOAD_LABOR_DRIVERS_LIST_REJECTED:
      return state.set('loading', false);

    case LOAD_LABOR_DRIVER_FULFILLED:
      return state.set('loading', false)
        .set('selectedLaborDriver', fromJS(action.payload.data));
    case LOAD_LABOR_DRIVER_PENDING:
      return state.set('loading', true);
    case LOAD_LABOR_DRIVER_REJECTED:
      return state.set('loading', false);

    case DELETE_FULFILLED: {
      const index = state.get('laborDrivers').findIndex(d => d.get('id') === action.payload.data.id);
      return state.deleteIn(['laborDrivers', index]).set('selectedLaborDriver', new Map());
    }
    case SAVE_EDIT_FULFILLED: {
      const index = state.get('laborDrivers').findIndex(d => d.get('id') === action.payload.data.id);
      return state.setIn(['laborDrivers', index], fromJS(action.payload.data)).set('selectedLaborDriver', new Map());
    }

    case CLEAR_LABOR_DRIVER_LIST_FILTERS:
      return state.set('filter', initialState.get('filter'));

    case CLEAR_LABOR_DRIVER_LIST_SORTS:
      return state.set('sort', initialState.get('sort'));
  }
  return state;
}

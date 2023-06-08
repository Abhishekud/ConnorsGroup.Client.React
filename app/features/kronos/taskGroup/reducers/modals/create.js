import {fromJS, Map} from 'immutable';
import {
  SHOW_CREATE_MODAL,
  HIDE_CREATE_MODAL,
  SET_PROPERTY_FOR_CREATE,
  CREATE_FULFILLED,
  CREATE_PENDING,
  CREATE_REJECTED,
} from '../../actions';
import {
  KRONOS_LABOR_HOUR_ALLOCATION_ENUM_INDEX,
} from '../../../constants/LaborHourAllocations';

const initialState = fromJS({
  show: false,
  saving: false,
  model: {
    name: null,
    genericDepartment: null,
    combinedDistribution: null,
    allocateLaborHours: null,
    skipBreaksInLabor: false,
    maximumBreakDuration: null,
    breakPlacementWindow: null,
    jobName: null,
  },
  validationErrors: {},
});

const ActualAllocationModel = fromJS({
  skipBreaksInLabor: false,
  maximumBreakDuration: null,
  breakPlacementWindow: null,
});

const NoSkipBreaksInLaborModel = fromJS({
  maximumBreakDuration: null,
  breakPlacementWindow: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_MODAL:
      return state.set('show', true).set('model', new Map({id: action.payload}));
    case HIDE_CREATE_MODAL:
      return initialState;
    case CREATE_PENDING:
      return state.set('saving', true);
    case CREATE_FULFILLED:
      return initialState;
    case CREATE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : new Map());
      });
    case SET_PROPERTY_FOR_CREATE: {
      if (action.payload.id === 'allocateLaborHours') {
        return state.withMutations(map => {
          map.setIn(['model', action.payload.id], action.payload.value);

          //When switching to Actual or empty Labor Allocation, we need to reset hidden data.
          if (!action.payload.value || parseInt(action.payload.value, 10) === KRONOS_LABOR_HOUR_ALLOCATION_ENUM_INDEX.ACTUAL) {
            map.set('model', map.get('model').merge(ActualAllocationModel));
          }
        });
      }

      if (action.payload.id === 'skipBreaksInLabor') {
        return state.withMutations(map => {
          map.setIn(['model', action.payload.id], action.payload.value);

          //If not skipping breaks in labor, reset the now hidden max break duration and break placement window
          if (!action.payload.value) {
            map.set('model', map.get('model').merge(NoSkipBreaksInLaborModel));
          }
        });
      }

      return state.setIn(['model', action.payload.id], action.payload.value);
    }
  }
  return state;
}

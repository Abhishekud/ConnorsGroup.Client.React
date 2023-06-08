import {fromJS} from 'immutable';
import {
  SET_PROPERTY_FOR_EDIT,
  SAVE_EDIT_FULFILLED,
  SAVE_EDIT_REJECTED,
  SAVE_EDIT_PENDING,
  CANCEL_EDIT,
  DELETE_FULFILLED,

  LOAD_TASK_GROUP_FULFILLED,

  CREATE_FULFILLED,
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
    message: null,
    succesS: null,
  },
  dirty: false,
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
    case CANCEL_EDIT:
    case DELETE_FULFILLED:
    case SAVE_EDIT_FULFILLED:
      return initialState;
    case SAVE_EDIT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : new Map());
      });
    case SAVE_EDIT_PENDING:
      return state.set('saving', true);

    case SET_PROPERTY_FOR_EDIT: {
      if (action.payload.id === 'allocateLaborHours') {
        return state.withMutations(map => {
          map.setIn(['model', action.payload.id], action.payload.value).set('dirty', true);

          //When switching to Actual or empty Labor Allocation, we need to reset hidden data.
          if (!action.payload.value || parseInt(action.payload.value, 10) === KRONOS_LABOR_HOUR_ALLOCATION_ENUM_INDEX.ACTUAL) {
            map.set('model', map.get('model').merge(ActualAllocationModel));
          }
        });
      }

      if (action.payload.id === 'skipBreaksInLabor') {
        return state.withMutations(map => {
          map.setIn(['model', action.payload.id], action.payload.value).set('dirty', true);

          //If not skipping breaks in labor, reset the now hidden max break duration and break placement window
          if (!action.payload.value) {
            map.set('model', map.get('model').merge(NoSkipBreaksInLaborModel));
          }
        });
      }
      return state.setIn(['model', action.payload.id], action.payload.value).set('dirty', true);
    }

    case CREATE_FULFILLED:
    case LOAD_TASK_GROUP_FULFILLED:
      return state.set('model', fromJS(action.payload.data)).set('show', true).set('dirty', false);
  }
  return state;
}


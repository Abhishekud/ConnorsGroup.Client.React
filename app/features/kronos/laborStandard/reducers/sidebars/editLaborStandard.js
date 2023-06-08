import {fromJS, Map} from 'immutable';
import {LOAD_KRONOS_LABOR_PERIODS_LIST_FULFILLED} from '../../actions/loadKronosLaborPeriodsList';
import {LOAD_KRONOS_LABOR_DRIVERS_LIST_FULFILLED} from '../../actions/loadKronosLaborDriverList';
import {LOAD_TASKS_LIST_FULFILLED} from '../../actions/loadKronosTaskList';
import {SELECT_KRONOS_LABOR_STANDARD} from '../../actions/selectKronosLaborStandard';
import {CLEAR_EDIT_KRONOS_LABOR_STANDARD_SIDEBAR} from '../../actions/clearEditLaborStandardSidebar';
import {SET_EDIT_KRONOS_LABOR_STANDARD_MODEL_PROPERTY} from '../../actions/setEditLaborStandardModelProperty';
import {
  UPDATE_LABOR_STANDARD_REJECTED,
  UPDATE_LABOR_STANDARD_PENDING,
  UPDATE_LABOR_STANDARD_FULFILLED,
} from '../../actions';

const initialState = fromJS({
  model: {
    taskId: null,
    id: null,
    laborDriverId: null,
    laborPeriodId: null,
    genericDepartment: '',
    combinedDistribution: false,
    message: '',
    success: false,
  },
  dirty: false,
  saving: false,
  laborPeriods: [],
  laborDrivers: [],
  tasks: [],
  validationErrors: {},
  show: false,
});

const cancelState = fromJS({
  model: {
    taskId: null,
    id: null,
    laborDriverId: null,
    laborPeriodId: null,
    genericDepartment: '',
    combinedDistribution: false,
    message: '',
    success: false,
  },
  dirty: false,
  saving: false,
  validationErrors: {},
  show: false,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_KRONOS_LABOR_PERIODS_LIST_FULFILLED:
      return state.set('laborPeriods', fromJS(action.payload.data.laborPeriods));

    case LOAD_KRONOS_LABOR_DRIVERS_LIST_FULFILLED:
      return state.set('laborDrivers', fromJS(action.payload.data.laborDrivers));

    case LOAD_TASKS_LIST_FULFILLED:
      return state.set('tasks', fromJS(action.payload.data.tasks));

    case SELECT_KRONOS_LABOR_STANDARD: {
      const {laborStandard} = action.payload;
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', laborStandard)
          .set('validationErrors', Map())
      );
    }

    case SET_EDIT_KRONOS_LABOR_STANDARD_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value).set('dirty', true);
    }

    case CLEAR_EDIT_KRONOS_LABOR_STANDARD_SIDEBAR:
      return state.merge(cancelState);

    case UPDATE_LABOR_STANDARD_PENDING:
      return state.set('saving', true);

    case UPDATE_LABOR_STANDARD_FULFILLED:
      return initialState.withMutations(map => {
        map.set('laborPeriods', state.get('laborPeriods'))
          .set('laborDrivers', state.get('laborDrivers'))
          .set('tasks', state.get('tasks'));
      });

    case UPDATE_LABOR_STANDARD_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : new Map());
      });

    default:
      return state;
  }
}

import {fromJS, Map} from 'immutable';
import {SET_LABOR_STANDARDS_LIST_BULK_EDIT_MODEL_PROPERTY} from '../../actions/setLaborStandardsListBulkEditModelProperty';
import {LOAD_KRONOS_LABOR_PERIODS_LIST_FULFILLED} from '../../actions/loadKronosLaborPeriodsList';
import {LOAD_KRONOS_LABOR_DRIVERS_LIST_FULFILLED} from '../../actions/loadKronosLaborDriverList';
import {LOAD_TASKS_LIST_FULFILLED} from '../../actions/loadKronosTaskList';
import {
  BULK_UPDATE_LABOR_STANDARDS_FULFILLED,
  BULK_UPDATE_LABOR_STANDARDS_REJECTED,
  BULK_UPDATE_LABOR_STANDARDS_PENDING,
} from '../../actions/bulkUpdateLaborStandards';

const initialState = fromJS({
  model: {
    updateLaborPeriod: false,
    updateLaborDriver: false,
    updateGenericDepartment: false,
    updateTask: false,
    updateCombinedDistribution: false,
    combinedDistribution: false,
  },
  dirty: false,
  saving: false,
  laborPeriods: [],
  laborDrivers: [],
  tasks: [],
  validationErrors: {},
});

export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_KRONOS_LABOR_PERIODS_LIST_FULFILLED:
      return state.set('laborPeriods', fromJS(action.payload.data.laborPeriods));

    case LOAD_KRONOS_LABOR_DRIVERS_LIST_FULFILLED:
      return state.set('laborDrivers', fromJS(action.payload.data.laborDrivers));

    case LOAD_TASKS_LIST_FULFILLED:
      return state.set('tasks', fromJS(action.payload.data.tasks));

    case BULK_UPDATE_LABOR_STANDARDS_FULFILLED:
      return initialState.withMutations(map => {
        map.set('laborPeriods', state.get('laborPeriods'))
          .set('laborDrivers', state.get('laborDrivers'))
          .set('tasks', state.get('tasks'));
      });

    case BULK_UPDATE_LABOR_STANDARDS_PENDING:
      return state.set('saving', true);

    case BULK_UPDATE_LABOR_STANDARDS_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : new Map());
      });

    case SET_LABOR_STANDARDS_LIST_BULK_EDIT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value).set('dirty', true);
    }

    default:
      return state;
  }
}

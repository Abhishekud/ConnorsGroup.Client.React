import {fromJS, Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  LOAD_MOST_ELEMENT_PENDING,
  LOAD_MOST_ELEMENT_FULFILLED,
  EDIT_MOST_ELEMENT,
  CANCEL_EDIT_MOST_ELEMENT,
  SET_EDIT_MOST_ELEMENT_WORKING_MODEL_PROPERTY,
  UPDATE_MOST_ELEMENT_PENDING,
  UPDATE_MOST_ELEMENT_FULFILLED,
  UPDATE_MOST_ELEMENT_REJECTED,
  TOGGLE_MOST_ELEMENT_PROFILE_SIDEBAR,
  TOGGLE_MOST_ELEMENT_STATUS_LOG_COMMENT,
} from '../../actions';
import {
  UPDATE_MOST_STEP_FULFILLED,
  DELETE_MOST_STEPS_FULFILLED,
} from '../../../mostAnalysis/actions';

const initialState = Map({
  show: false,
  editing: false,
  saving: false,
  pristineModel: Map(),
  workingModel: Map(),
  validationErrors: Map(),
  statusLogs: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_MOST_ELEMENT_PENDING:
      return initialState;

    case LOAD_MOST_ELEMENT_FULFILLED: {
      const {
        id, name, elementUnitOfMeasureId, elementActivityId, status, elementStatusLogs, measuredTimeMeasurementUnits,
        elementUnitOfMeasureName, elementActivityName, applicatorId, applicatorName, lastEditorName,
        applicatorInstructions, productionStandardsCount,
      } = action.payload.data;
      const model = Map({
        id, name, elementUnitOfMeasureId, elementActivityId, status, measuredTimeMeasurementUnits,
        elementUnitOfMeasureName, elementActivityName, applicatorId, applicatorName, lastEditorName,
        applicatorInstructions, productionStandardsCount,
      });

      return state.withMutations(map => {
        map.set('workingModel', model)
          .set('pristineModel', model)
          .set('statusLogs', modelsArrayToMapById(elementStatusLogs));
      });
    }

    case DELETE_MOST_STEPS_FULFILLED:
    case UPDATE_MOST_STEP_FULFILLED:
      return state.setIn(['pristineModel', 'measuredTimeMeasurementUnits'],
        action.payload.data.parentMeasuredTimeMeasurementUnits);

    case EDIT_MOST_ELEMENT:
      return state.set('editing', true);

    case CANCEL_EDIT_MOST_ELEMENT:
      return state.withMutations(map =>
        map.set('editing', false)
          .set('workingModel', state.get('pristineModel'))
          .set('validationErrors', Map()));

    case SET_EDIT_MOST_ELEMENT_WORKING_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['workingModel', name], value);
    }

    case UPDATE_MOST_ELEMENT_PENDING:
      return state.set('saving', true);

    case UPDATE_MOST_ELEMENT_FULFILLED: {
      const {
        id, name, elementUnitOfMeasureId, elementActivityId, status, elementStatusLogs, measuredTimeMeasurementUnits,
        elementUnitOfMeasureName, elementActivityName, applicatorId, applicatorName, lastEditorName,
        applicatorInstructions,
      } = action.payload.data;
      const model = Map({
        id, name, elementUnitOfMeasureId, elementActivityId, status, measuredTimeMeasurementUnits,
        elementUnitOfMeasureName, elementActivityName, applicatorId, applicatorName, lastEditorName,
        applicatorInstructions,
      });

      return initialState.withMutations(map =>
        map.set('saving', false)
          .set('editing', false)
          .set('pristineModel', model)
          .set('workingModel', model)
          .set('statusLogs', modelsArrayToMapById(elementStatusLogs))
          .set('validationErrors', Map()));
    }

    case UPDATE_MOST_ELEMENT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case TOGGLE_MOST_ELEMENT_PROFILE_SIDEBAR: {
      if (state.get('show')) {
        return state.withMutations(map =>
          map.set('show', false)
            .set('editing', false)
            .set('workingModel', state.get('pristineModel'))
            .set('validationErrors', Map()));
      }

      return state.set('show', true);
    }

    case TOGGLE_MOST_ELEMENT_STATUS_LOG_COMMENT: {
      const {commentId} = action.payload;
      const showComment = state.getIn(['statusLogs', commentId, 'showComment']);

      return state.setIn(['statusLogs', commentId, 'showComment'], !showComment);
    }

    default:
      return state;
  }
}

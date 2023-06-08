import {fromJS, Map} from 'immutable';
import {modelsArrayToMapById, modelsArrayToRecordMapById} from '../../../shared/services';
import {
  createOrgHierarchyLevelState,
  createOrgHierarchyLevelStates,
} from '../../services';
import {
  LOAD_ORG_HIERARCHY_LEVELS_LIST_PENDING,
  LOAD_ORG_HIERARCHY_LEVELS_LIST_FULFILLED,
  LOAD_ORG_HIERARCHY_LEVELS_LIST_REJECTED,
  CREATE_ORG_HIERARCHY_LEVEL_PENDING,
  CREATE_ORG_HIERARCHY_LEVEL_FULFILLED,
  CREATE_ORG_HIERARCHY_LEVEL_REJECTED,
  EDIT_ORG_HIERARCHY_LEVEL,
  CANCEL_EDIT_ORG_HIERARCHY_LEVEL,
  SET_ORG_HIERARCHY_LEVEL_MODEL_PROPERTY,
  UPDATE_ORG_HIERARCHY_LEVEL_PENDING,
  UPDATE_ORG_HIERARCHY_LEVEL_FULFILLED,
  UPDATE_ORG_HIERARCHY_LEVEL_REJECTED,
  DELETE_ORG_HIERARCHY_LEVEL_FULFILLED,
  MOVE_ORG_HIERARCHY_LEVEL_PENDING,
  MOVE_ORG_HIERARCHY_LEVEL_FULFILLED,
  MOVE_ORG_HIERARCHY_LEVEL_REJECTED,
} from '../../actions';
import {OrgHierarchyLevelModel} from '../../models';

const initialState = Map({
  loading: false,
  creating: false,
  updating: false,
  moving: false,
  orgHierarchyLevels: Map(),
  pristineOrgHierarchyLevels: Map(),
  orgHierarchyLevelStates: Map(),
  orgHierarchyLevelsValidationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ORG_HIERARCHY_LEVELS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_ORG_HIERARCHY_LEVELS_LIST_FULFILLED: {
      const {levels, hasData} = action.payload.data;
      const orgHierarchyLevelMax = Math.max(...levels.map(ohl => ohl.number));
      const locationParent = levels.find(level => level.number === orgHierarchyLevelMax);

      return state.withMutations(map =>
        map.set('loading', false)
          .set('orgHierarchyLevels', modelsArrayToRecordMapById(levels, OrgHierarchyLevelModel))
          .set('orgHierarchyLevelStates', createOrgHierarchyLevelStates(levels))
          .set('hasData', hasData)
          .set('locationParentName', locationParent ? locationParent.name : null))
        .set('orgHierarchyLevelsValidationErrors', initialState.get('orgHierarchyLevelsValidationErrors'));
    }

    case LOAD_ORG_HIERARCHY_LEVELS_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_ORG_HIERARCHY_LEVEL_PENDING:
      return state.set('creating', true);

    case CREATE_ORG_HIERARCHY_LEVEL_FULFILLED: {
      const {orgHierarchyLevelNumbers, orgHierarchyLevel} = action.payload.data;
      const orgHierarchyLevelModel = new OrgHierarchyLevelModel(orgHierarchyLevel);
      const orgHierarchyLevelNumbersMap = modelsArrayToMapById(orgHierarchyLevelNumbers);

      return state.withMutations(map => {
        map.set('creating', false)
          .setIn(['orgHierarchyLevels', orgHierarchyLevel.id], orgHierarchyLevelModel)
          .setIn(['orgHierarchyLevels', orgHierarchyLevel.id, 'name'], '')
          .setIn(['pristineOrgHierarchyLevels', orgHierarchyLevel.id], orgHierarchyLevelModel)
          .setIn(['orgHierarchyLevelStates', orgHierarchyLevel.id], createOrgHierarchyLevelState())
          .setIn(['orgHierarchyLevelStates', orgHierarchyLevel.id, 'editing'], true)
          .mergeDeepIn(['orgHierarchyLevels'], orgHierarchyLevelNumbersMap);

        map.update('pristineOrgHierarchyLevels', pohls =>
          pohls.map(pohl => pohl.merge(orgHierarchyLevelNumbersMap.get(pohl.id))));
      });
    }

    case CREATE_ORG_HIERARCHY_LEVEL_REJECTED:
      return state.set('creating', false);

    case EDIT_ORG_HIERARCHY_LEVEL: {
      const orgHierarchyLevelId = action.payload;

      return state.withMutations(map => {
        map.setIn(['orgHierarchyLevelStates', orgHierarchyLevelId, 'editing'], true)
          .setIn(['pristineOrgHierarchyLevels', orgHierarchyLevelId],
            map.getIn(['orgHierarchyLevels', orgHierarchyLevelId]));
      });
    }

    case CANCEL_EDIT_ORG_HIERARCHY_LEVEL: {
      const orgHierarchyLevelId = action.payload;

      return state.withMutations(map => {
        map.setIn(['orgHierarchyLevelStates', orgHierarchyLevelId, 'editing'], false)
          .setIn(['orgHierarchyLevels', orgHierarchyLevelId],
            map.getIn(['pristineOrgHierarchyLevels', orgHierarchyLevelId]))
          .deleteIn(['pristineOrgHierarchyLevels', orgHierarchyLevelId])
          .deleteIn(['orgHierarchyLevelsValidationErrors', orgHierarchyLevelId])
          .deleteIn(['orgHierarchyLevelsParametersValidationErrors', orgHierarchyLevelId]);
      });
    }

    case SET_ORG_HIERARCHY_LEVEL_MODEL_PROPERTY: {
      const {orgHierarchyLevelId, name, value} = action.payload;
      return state.setIn(['orgHierarchyLevels', orgHierarchyLevelId, name], value);
    }

    case UPDATE_ORG_HIERARCHY_LEVEL_PENDING:
      return state.set('updating', true);

    case UPDATE_ORG_HIERARCHY_LEVEL_FULFILLED: {
      const orgHierarchyLevelId = action.payload.data;
      return state.withMutations(map => {
        map.set('updating', false)
          .setIn(['orgHierarchyLevelStates', orgHierarchyLevelId, 'editing'], false)
          .deleteIn(['pristineOrgHierarchyLevels', orgHierarchyLevelId])
          .deleteIn(['orgHierarchyLevelsValidationErrors', orgHierarchyLevelId]);
      });
    }

    case UPDATE_ORG_HIERARCHY_LEVEL_REJECTED: {
      const {payload} = action;
      const {status, data} = payload.response || {};
      const orgHierarchyLevelId = Number(/\d+$/.exec(payload.config.url)[0]);

      return state.withMutations(map => {
        map.set('updating', false);

        if (status === 400) {
          map.setIn(['orgHierarchyLevelsValidationErrors', orgHierarchyLevelId], fromJS(data));
        } else {
          map.deleteIn(['orgHierarchyLevelsValidationErrors', orgHierarchyLevelId]);
        }
      });
    }

    case DELETE_ORG_HIERARCHY_LEVEL_FULFILLED: {
      const {number} = action.payload.data;
      const orgHierarchyLevelIds = state.get('orgHierarchyLevels').filter(num => num.get('number') >= number).map(id => id.get('id'));

      return state.withMutations(map => {
        orgHierarchyLevelIds.forEach(id => {
          map.deleteIn(['orgHierarchyLevels', id])
            .deleteIn(['pristineOrgHierarchyLevels', id])
            .deleteIn(['orgHierarchyLevelsValidationErrors', id]);
        });
      });
    }

    case MOVE_ORG_HIERARCHY_LEVEL_PENDING:
      return state.set('moving', true);

    case MOVE_ORG_HIERARCHY_LEVEL_FULFILLED: {
      const orgHierarchyLevelNumbersMap = modelsArrayToMapById(action.payload.data);

      return state.withMutations(map => {
        map.set('moving', false)
          .mergeDeepIn(['orgHierarchyLevels'], orgHierarchyLevelNumbersMap);

        map.update('pristineOrgHierarchyLevels', pohls =>
          pohls.map(pohl => pohl.merge(orgHierarchyLevelNumbersMap.get(pohl.id))));
      });
    }

    case MOVE_ORG_HIERARCHY_LEVEL_REJECTED:
      return state.set('moving', false);

    default:
      return state;
  }
}

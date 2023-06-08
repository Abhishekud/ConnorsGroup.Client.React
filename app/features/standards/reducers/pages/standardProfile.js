import {modelsArrayToMapById, formatTMUsNumericOnly} from '../../../shared/services';
import {elementTypes} from '../../../elements/constants';
import {Map, fromJS} from 'immutable';
import {CHANGE_TIME_FORMAT} from '../../../shared/actions';
import {
  UPDATE_MOST_STEP_FULFILLED,
  DELETE_MOST_STEPS_FULFILLED,
} from '../../../mostAnalysis/actions';
import {
  UPDATE_NON_MOST_STEP_FULFILLED,
  DELETE_NON_MOST_STEPS_FULFILLED,
} from '../../../nonMOSTAnalysis/actions';
import {
  ADD_ELEMENTS_FULFILLED,
  ADD_ELEMENTS_PENDING,
  ADD_ELEMENTS_REJECTED,
  BULK_DELETE_SELECTED_STANDARD_ITEMS_FULFILLED,
  BULK_UPDATE_STANDARD_ELEMENTS_FULFILLED,
  CANCEL_CREATE_STANDARD_ELEMENT_COMMENT,
  CANCEL_EDIT_STANDARD_ELEMENT,
  CANCEL_EDIT_STANDARD_ELEMENT_GROUP,
  CLOSE_ELEMENT_SEARCH,
  CLOSE_STANDARD_MOST_ELEMENT_EDIT,
  CLOSE_STANDARD_NON_MOST_ELEMENT_EDIT,
  CREATE_STANDARD_ELEMENT_COMMENT_FULFILLED,
  CREATE_STANDARD_ELEMENT_COMMENT_PENDING,
  CREATE_STANDARD_ELEMENT_COMMENT_REJECTED,
  CREATE_STANDARD_ELEMENT_FULFILLED,
  CREATE_STANDARD_ELEMENT_GROUP_FULFILLED,
  CREATE_STANDARD_ELEMENT_GROUP_PENDING,
  CREATE_STANDARD_ELEMENT_GROUP_REJECTED,
  CREATE_STANDARD_REVISION_PENDING,
  DELETE_STANDARD_ELEMENTS_FULFILLED,
  DELETE_STANDARD_ELEMENT_GROUP_FULFILLED,
  EDIT_STANDARD_ELEMENT,
  EDIT_STANDARD_ELEMENT_GROUP,
  LOAD_STANDARD_FOR_REPORT_FULFILLED,
  LOAD_STANDARD_FOR_REPORT_PENDING,
  LOAD_STANDARD_FOR_REPORT_REJECTED,
  LOAD_STANDARD_FULFILLED,
  LOAD_STANDARD_PENDING,
  LOAD_STANDARD_REJECTED,
  LOAD_STANDARD_REVISION_FOR_REPORT_FULFILLED,
  LOAD_STANDARD_REVISION_FOR_REPORT_PENDING,
  LOAD_STANDARD_REVISION_FOR_REPORT_REJECTED,
  LOAD_STANDARD_REVISION_FULFILLED,
  LOAD_STANDARD_REVISION_PENDING,
  MOVE_STANDARD_ELEMENT_TO_GROUP_FULFILLED,
  MOVE_STANDARD_ELEMENT_TO_GROUP_PENDING,
  MOVE_STANDARD_ELEMENT_TO_GROUP_REJECTED,
  MOVE_STANDARD_ITEM_FULFILLED,
  MOVE_STANDARD_ITEM_PENDING,
  MOVE_STANDARD_ITEM_REJECTED,
  OPEN_ELEMENT_SEARCH,
  OPEN_STANDARD_MOST_ELEMENT_EDIT,
  OPEN_STANDARD_NON_MOST_ELEMENT_EDIT,
  PROMOTE_TO_LIST_ELEMENT_FULFILLED,
  REFRESH_STANDARD_TIME_FULFILLED,
  REGISTER_STANDARD_ITEM_SCROLL_NODE,
  REMOVE_STANDARD_ELEMENT_FROM_GROUP_FULFILLED,
  REMOVE_STANDARD_ELEMENT_FROM_GROUP_PENDING,
  REMOVE_STANDARD_ELEMENT_FROM_GROUP_REJECTED,
  SET_STANDARD_ITEM_MODEL_PROPERTY,
  SELECT_ALL_STANDARD_ELEMENTS_FOR_BULK_EDIT,
  TOGGLE_ADD_STANDARD_ITEM,
  TOGGLE_SELECT_STANDARD_ELEMENT,
  TOGGLE_SELECT_STANDARD_ELEMENTS_WITH_GROUP,
  TOGGLE_STANDARD_ELEMENT_COMMENT,
  TOGGLE_STANDARD_ELEMENT_GROUP,
  UPDATE_STANDARD_ELEMENT_FULFILLED,
  UPDATE_STANDARD_ELEMENT_GROUP_FULFILLED,
  UPDATE_STANDARD_ELEMENT_GROUP_PENDING,
  UPDATE_STANDARD_ELEMENT_GROUP_REJECTED,
  UPDATE_STANDARD_ELEMENT_PENDING,
  UPDATE_STANDARD_ELEMENT_REJECTED,
  UPDATE_STANDARD_FULFILLED,
  SET_STANDARD_ELEMENT_EDITOR_PROPERTY,
  BULK_PASTE_STANDARD_ITEMS_PENDING,
  BULK_PASTE_STANDARD_ITEMS_FULFILLED,
  BULK_PASTE_STANDARD_ITEMS_REJECTED,
  TOGGLE_STANDARD_ELEMENT_GROUPS_COLLAPSE,
  REORDER_STANDARDS_ITEMS_FULFILLED,
  REORDER_STANDARDS_ITEMS_PENDING,
  REORDER_STANDARDS_ITEMS_REJECTED,
  SHOW_CREATE_STANDARD_ELEMENT,
} from '../../actions';
import {parentTypes as mostStepParentTypes} from '../../../mostAnalysis/constants';
import {parentTypes as nonMOSTStepParentTypes} from '../../../nonMOSTAnalysis/constants';
import {PRODUCTION} from '../../constants/standardStatuses';
import {
  standardItemModelsArrayToMapById,
  createStandardItemState,
  createStandardItemStates,
  extractStandardElementValidationErrors,
} from '../../services';
import {timeFormats} from '../../../shared/constants';
import {standardElementValidationErrorKeyRegExp} from '../../constants';
import {StandardElementModel, StandardElementGroupModel} from '../../models';
import {STANDARD_ELEMENT_GROUP} from '../../constants/standardItemTypes';

const initialState = Map({
  id: null,
  name: null,
  standardItems: Map(),
  pristineStandardItems: Map(),
  standardItemsStates: Map(),
  standardItemsValidationErrors: Map(),
  loading: false,
  saving: false,
  moving: false,

  searchElements: false,
  editStandardMOSTElementId: null,
  editStandardNonMOSTElementId: null,
  timeFormat: timeFormats.SECONDS,

  scrollNodes: Map(),
  standardElementEditorProperties: Map(),
  selectedStandardElementGroupIds: [],
  totalRevisions: 0,
  standardElementGroupsCollapse: false,
  defaultCharacteristicSetName: null,
});

function processStandardElementGroupCollapse(map) {
  const standardItemsStates = map.get('standardItemsStates');
  const standardElementGroupsCount = standardItemsStates.filter(standardItemsState => standardItemsState.get('type') === STANDARD_ELEMENT_GROUP).size;
  const collapsedGroupCount = standardItemsStates.filter(standardItemsState => standardItemsState.get('type') === STANDARD_ELEMENT_GROUP && standardItemsState.get('collapsed')).size;
  if (collapsedGroupCount === standardElementGroupsCount) {
    map.set('standardElementGroupsCollapse', true);
  }
  if (collapsedGroupCount === 0) {
    map.set('standardElementGroupsCollapse', false);
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BULK_PASTE_STANDARD_ITEMS_FULFILLED: {
      const {standardElementGroups, standardElements, standardItemIndexesAndTimes} = action.payload.data;
      const standardItemIndexesAndTimesMap = modelsArrayToMapById(standardItemIndexesAndTimes);

      return state.withMutations(map => {
        map.set('saving', false);
        standardElementGroups.forEach(standardElementGroup =>
          map.setIn(['standardItems', standardElementGroup.id], new StandardElementGroupModel(standardElementGroup))
            .setIn(['standardItemsStates', standardElementGroup.id], createStandardItemState(standardElementGroup)));

        standardElements.forEach(se =>
          map.setIn(['standardItems', se.id], new StandardElementModel(se))
            .setIn(['standardItemsStates', se.id], createStandardItemState(se)));

        return map.update('pristineStandardItems', pristineStandardItems =>
          pristineStandardItems.map(psi => psi.merge(standardItemIndexesAndTimesMap.get(psi.get('id')))))
          .update('standardItems', standardItems => standardItems.mergeDeep(standardItemIndexesAndTimesMap))
          .set('selectedStandardElementGroupIds', [])
          .update('standardItemsStates', standardItemsStates => standardItemsStates.map(
            sis => sis.withMutations(map => map.set('addStandardItemAboveCollapsed', true).set('addStandardItemBelowCollapsed', true).set('selected', false))));
      });
    }

    case CHANGE_TIME_FORMAT:
      return state.set('timeFormat', action.payload);

    case LOAD_STANDARD_REVISION_PENDING:
    case LOAD_STANDARD_PENDING:
      return initialState.withMutations(map =>
        map.set('timeFormat', state.get('timeFormat'))
          .set('loading', true));

    case LOAD_STANDARD_REVISION_FULFILLED:
    case LOAD_STANDARD_FULFILLED: {
      const {id, name, details, hasRevisions, revision, standardItems, isPreviousRevision, maxRevision, currentInProcessRevision, totalRevisions, defaultCharacteristicSetName} = action.payload.data;
      const standardItemsMap = standardItemModelsArrayToMapById(standardItems);
      return state.withMutations(map =>
        map.set('loading', false)
          .set('loadingForReport', false)
          .set('id', id)
          .set('name', name)
          .set('status', details.status)
          .set('hasRevisions', hasRevisions)
          .set('revision', revision)
          .set('currentInProcessRevision', currentInProcessRevision)
          .set('isPreviousRevision', isPreviousRevision)
          .set('maxRevision', maxRevision)
          .set('totalRevisions', totalRevisions)
          .set('standardItems', standardItemsMap)
          .set('standardItemsStates', createStandardItemStates(standardItems))
          .set('defaultCharacteristicSetName', defaultCharacteristicSetName ?? null));
    }

    case LOAD_STANDARD_REJECTED:
      return initialState.set('timeFormat', state.get('timeFormat'));

    case UPDATE_STANDARD_FULFILLED: {
      const {name, status} = action.payload.data.details;
      return state.withMutations(map =>
        map.set('name', name)
          .set('hasRevisions', map.get('hasRevisions') || status === PRODUCTION)
          .set('status', status));
    }

    case OPEN_ELEMENT_SEARCH:
      return state.set('searchElements', true);

    case CLOSE_ELEMENT_SEARCH:
      return state.set('searchElements', false);

    case ADD_ELEMENTS_PENDING:
      return state.set('saving', true);

    case ADD_ELEMENTS_FULFILLED: {
      const {standardElements, standardItemIndexesAndTimes} = action.payload.data;
      const standardItemIndexesAndTimesMap = modelsArrayToMapById(standardItemIndexesAndTimes);

      return state.withMutations(map =>
        map.set('saving', false)
          .update('standardItems', standardItems => standardItems.merge(standardItemModelsArrayToMapById(standardElements)))
          .update('standardItemsStates', standardItemsStates => standardItemsStates.merge(createStandardItemStates(standardElements)))

          .update('pristineStandardItems', pristineStandardItems =>
            pristineStandardItems.map(psi => psi.merge(standardItemIndexesAndTimesMap.get(psi.get('id')))))
          .update('standardItems', standardItems => standardItems.mergeDeep(standardItemIndexesAndTimesMap))

          .update('standardItemsStates', standardItemsStates => standardItemsStates.map(
            sis => sis.withMutations(map => map.set('addStandardItemAboveCollapsed', true).set('addStandardItemBelowCollapsed', true))))
      );
    }

    case ADD_ELEMENTS_REJECTED:
      return state.set('saving', false);


    case OPEN_STANDARD_MOST_ELEMENT_EDIT:
      return state.set('editStandardMOSTElementId', action.payload);

    case CLOSE_STANDARD_MOST_ELEMENT_EDIT:
      return state.set('editStandardMOSTElementId', null);

    case UPDATE_MOST_STEP_FULFILLED:
    case DELETE_MOST_STEPS_FULFILLED: {
      const {mostStepParentType, mostStepParentId, parentMeasuredTimeMeasurementUnits} = action.payload.data;

      if (mostStepParentType !== mostStepParentTypes.STANDARD_ELEMENT) return state;

      return state.withMutations(map => {
        if (map.hasIn(['pristineStandardItems', mostStepParentId])) {
          map.setIn(['pristineStandardItems', mostStepParentId, 'measuredTimeMeasurementUnits'], parentMeasuredTimeMeasurementUnits);
        }

        if (map.hasIn(['standardItems', mostStepParentId])) {
          map.setIn(['standardItems', mostStepParentId, 'measuredTimeMeasurementUnits'], parentMeasuredTimeMeasurementUnits);
        }
      });
    }


    case OPEN_STANDARD_NON_MOST_ELEMENT_EDIT:
      return state.set('editStandardNonMOSTElementId', action.payload);

    case CLOSE_STANDARD_NON_MOST_ELEMENT_EDIT:
      return state.set('editStandardNonMOSTElementId', null);

    case UPDATE_NON_MOST_STEP_FULFILLED:
    case DELETE_NON_MOST_STEPS_FULFILLED: {
      const {nonMOSTStepParentType, nonMOSTStepParentId, parentMeasuredTimeMeasurementUnits} = action.payload.data;

      if (nonMOSTStepParentType !== nonMOSTStepParentTypes.STANDARD_ELEMENT) return state;

      return state.withMutations(map => {
        if (map.hasIn(['pristineStandardItems', nonMOSTStepParentId])) {
          map.setIn(['pristineStandardItems', nonMOSTStepParentId, 'measuredTimeMeasurementUnits'], parentMeasuredTimeMeasurementUnits);
        }

        if (map.hasIn(['standardItems', nonMOSTStepParentId])) {
          map.setIn(['standardItems', nonMOSTStepParentId, 'measuredTimeMeasurementUnits'], parentMeasuredTimeMeasurementUnits);
        }
      });
    }

    case TOGGLE_STANDARD_ELEMENT_GROUP: {
      return state.withMutations(map => {
        map.updateIn(['standardItemsStates', action.payload, 'collapsed'], collapsed => !collapsed);
        processStandardElementGroupCollapse(map);
      });
    }

    case TOGGLE_STANDARD_ELEMENT_GROUPS_COLLAPSE: {
      const allStandardElementGroupIds = action.payload;
      const standardElementGroupsCollapse = state.get('standardElementGroupsCollapse');

      return state.withMutations(map => {
        allStandardElementGroupIds.forEach(standardElementGroupId =>
          map.setIn(['standardItemsStates', standardElementGroupId, 'collapsed'], !standardElementGroupsCollapse)
            .set('standardElementGroupsCollapse', !standardElementGroupsCollapse)
        );
      });
    }

    case TOGGLE_SELECT_STANDARD_ELEMENT: {
      const {standardElementId, standardElementGroupId, standardElementGroupSelectedFlag} = action.payload;

      return state.withMutations(map => {
        map.updateIn(['standardItemsStates', standardElementId, 'selected'], selected => !selected);
        if (standardElementGroupSelectedFlag !== null && standardElementGroupId !== null) {
          map.update('selectedStandardElementGroupIds', items => (standardElementGroupSelectedFlag
            ? items.concat(standardElementGroupId) : items.filter(i => i !== standardElementGroupId)));
          map.setIn(['standardItemsStates', standardElementGroupId, 'selected'], standardElementGroupSelectedFlag);
        }
      });
    }

    case SELECT_ALL_STANDARD_ELEMENTS_FOR_BULK_EDIT:
    case TOGGLE_SELECT_STANDARD_ELEMENTS_WITH_GROUP: {
      const {ids, selected, standardElementGroupId} = action.payload;

      return state.withMutations(map => {
        ids.forEach(id => {
          map.setIn(['standardItemsStates', id, 'selected'], selected);
        });

        if (action.type === TOGGLE_SELECT_STANDARD_ELEMENTS_WITH_GROUP) {
          // Here received ids are the child elements of the group. If there are no childs, just toggle the group.
          const selectedValue = ids.length === 0 ? !map.getIn(['standardItemsStates', standardElementGroupId, 'selected']) : selected;
          const selectedStandardElementGroupIds = state.get('selectedStandardElementGroupIds');
          map.set('selectedStandardElementGroupIds', selectedValue ? selectedStandardElementGroupIds.concat(standardElementGroupId) : selectedStandardElementGroupIds.filter(item => item !== standardElementGroupId));
          map.setIn(['standardItemsStates', standardElementGroupId, 'selected'], selectedValue);
        }

        if (action.type === SELECT_ALL_STANDARD_ELEMENTS_FOR_BULK_EDIT) {
          map.set('selectedStandardElementGroupIds', selected ? state.get('standardItems')?.filter(si => si.get('type') === STANDARD_ELEMENT_GROUP).keySeq().toArray() : []);
        }
      });
    }

    case BULK_UPDATE_STANDARD_ELEMENTS_FULFILLED:
      return state.withMutations(map =>
        map.update('standardItemsStates', standardItemsStates => standardItemsStates.map(
          sis => sis.set('selected', false))));

    case TOGGLE_STANDARD_ELEMENT_COMMENT:
      return state.updateIn(['standardItemsStates', action.payload, 'commentCollapsed'], collapsed => !collapsed);

    case CREATE_STANDARD_ELEMENT_COMMENT_PENDING:
      return state.set('saving', true);

    case CREATE_STANDARD_ELEMENT_COMMENT_FULFILLED: {
      const {standardElementId, standardElementConcurrencyToken, standardElementGroupId, standardElementGroupConcurrencyToken} = action.payload.data;
      return state.withMutations(map => {
        map.set('saving', false)
          .setIn(['standardItemsStates', standardElementId, 'commentEntered'], true)
          .setIn(['standardItemsStates', standardElementId, 'commentCollapsed'], true)
          .setIn(['standardItems', standardElementId, 'concurrencyToken'], standardElementConcurrencyToken);
        if (standardElementGroupId !== null) {
          map.setIn(['standardItems', standardElementGroupId, 'concurrencyToken'], standardElementGroupConcurrencyToken);
        }
      });
    }

    case CREATE_STANDARD_ELEMENT_COMMENT_REJECTED:
      return state.set('saving', false);

    case CANCEL_CREATE_STANDARD_ELEMENT_COMMENT: {
      const standardElementId = action.payload;
      return state.withMutations(map =>
        map.setIn(['standardItemsStates', standardElementId, 'commentCollapsed'], true)
          .setIn(['standardItems', standardElementId, 'comment'], ''));
    }


    case TOGGLE_ADD_STANDARD_ITEM: {
      const {standardItemId, position} = action.payload;

      return state.updateIn(['standardItemsStates', standardItemId, `addStandardItem${position}Collapsed`],
        collapsed => !collapsed);
    }


    case CREATE_STANDARD_ELEMENT_GROUP_PENDING:
    case BULK_PASTE_STANDARD_ITEMS_PENDING:
      return state.set('saving', true);

    case CREATE_STANDARD_ELEMENT_GROUP_FULFILLED: {
      const {standardElementGroup, standardItemIndexes} = action.payload.data;
      const standardItemIndexesMap = modelsArrayToMapById(standardItemIndexes);

      return state.withMutations(map =>
        map.set('saving', false)
          .setIn(['standardItems', standardElementGroup.id], new StandardElementGroupModel(standardElementGroup))
          .setIn(['standardItemsStates', standardElementGroup.id], createStandardItemState(standardElementGroup))

          .update('pristineStandardItems', pristineStandardItems =>
            pristineStandardItems.map(psi => psi.merge(standardItemIndexesMap.get(psi.get('id')))))
          .update('standardItems', standardItems => standardItems.mergeDeep(standardItemIndexesMap))

          .update('standardItemsStates', standardItemsStates => standardItemsStates.map(
            sis => sis.withMutations(map => map.set('addStandardItemAboveCollapsed', true).set('addStandardItemBelowCollapsed', true)))));
    }

    case CREATE_STANDARD_ELEMENT_GROUP_REJECTED:
    case BULK_PASTE_STANDARD_ITEMS_REJECTED:
      return state.set('saving', false);

    case CREATE_STANDARD_ELEMENT_FULFILLED: {
      const {standardElement, standardItemIndexesAndTimes} = action.payload.data;
      const editStandardMOSTElementId = standardElement.elementType === elementTypes.MOST ? standardElement.id : null;
      const editStandardNonMOSTElementId = standardElement.elementType === elementTypes.TIMED ? standardElement.id : null;
      const standardItemIndexesAndTimesMap = modelsArrayToMapById(standardItemIndexesAndTimes);

      return state.withMutations(map =>
        map.set('saving', false)
          .set('editStandardMOSTElementId', editStandardMOSTElementId)
          .set('editStandardNonMOSTElementId', editStandardNonMOSTElementId)

          .setIn(['standardItems', standardElement.id], new StandardElementModel(standardElement))
          .setIn(['standardItemsStates', standardElement.id], createStandardItemState(standardElement))

          .update('pristineStandardItems', pristineStandardItems =>
            pristineStandardItems.map(psi => psi.merge(standardItemIndexesAndTimesMap.get(psi.get('id')))))
          .update('standardItems', standardItems => standardItems.mergeDeep(standardItemIndexesAndTimesMap))

          .update('standardItemsStates', standardItemsStates => standardItemsStates.map(
            sis => sis.withMutations(map => map.set('addStandardItemAboveCollapsed', true).set('addStandardItemBelowCollapsed', true)))));
    }


    case EDIT_STANDARD_ELEMENT_GROUP: {
      const standardElementGroupId = action.payload;
      const timeFormat = state.get('timeFormat');

      const childStandardItems = state.get('standardItems')
        .filter(si => si.get('standardElementGroupId') === standardElementGroupId);

      return state.withMutations(map => {
        map.setIn(['standardItemsStates', standardElementGroupId, 'editing'], true)
          .setIn(['standardItemsStates', standardElementGroupId, 'collapsed'], false)
          .setIn(['pristineStandardItems', standardElementGroupId], map.getIn(['standardItems', standardElementGroupId]));

        childStandardItems.forEach(csi => {
          const childStandardItemId = csi.get('id');

          map.setIn(['pristineStandardItems', childStandardItemId], csi);

          if (csi.get('elementType') === elementTypes.ESTIMATE) {
            const updatedMTMUs = formatTMUsNumericOnly(csi.get('measuredTimeMeasurementUnits'), timeFormat);
            map.setIn(['standardItems', childStandardItemId, 'measuredTimeMeasurementUnits'], updatedMTMUs);
          }
        });
      });
    }

    case CANCEL_EDIT_STANDARD_ELEMENT_GROUP: {
      const standardElementGroupId = action.payload;

      const childPristineStandardItems = state.get('pristineStandardItems')
        .filter(si => si.get('standardElementGroupId') === standardElementGroupId);

      return state.withMutations(map => {
        map.setIn(['standardItemsStates', standardElementGroupId, 'editing'], false)
          .setIn(['standardItems', standardElementGroupId], map.getIn(['pristineStandardItems', standardElementGroupId]))
          .deleteIn(['pristineStandardItems', standardElementGroupId])
          .deleteIn(['standardItemsValidationErrors', standardElementGroupId]);

        childPristineStandardItems.forEach(csi => {
          const childStandardItemId = csi.get('id');
          map.setIn(['standardItems', childStandardItemId], csi)
            .deleteIn(['pristineStandardItems', childStandardItemId])
            .deleteIn(['standardItemsValidationErrors', childStandardItemId]);
        });
      });
    }


    case EDIT_STANDARD_ELEMENT: {
      const standardElementId = action.payload;
      const standardElement = state.getIn(['standardItems', standardElementId]);
      const timeFormat = state.get('timeFormat');

      return state.withMutations(map => {
        map.setIn(['standardItemsStates', standardElementId, 'editing'], true)
          .setIn(['pristineStandardItems', standardElementId], standardElement);

        if (standardElement.get('elementType') === elementTypes.ESTIMATE) {
          const updatedMTMUs = formatTMUsNumericOnly(standardElement.get('measuredTimeMeasurementUnits'), timeFormat);
          map.setIn(['standardItems', standardElementId, 'measuredTimeMeasurementUnits'], updatedMTMUs);
        }
      });
    }

    case CANCEL_EDIT_STANDARD_ELEMENT: {
      const standardElementId = action.payload;

      return state.withMutations(map =>
        map.setIn(['standardItemsStates', standardElementId, 'editing'], false)
          .setIn(['standardItems', standardElementId], map.getIn(['pristineStandardItems', standardElementId]))
          .deleteIn(['pristineStandardItems', standardElementId])
          .deleteIn(['standardItemsValidationErrors', standardElementId]));
    }


    case SET_STANDARD_ITEM_MODEL_PROPERTY: {
      const {standardItemId, name, value} = action.payload;
      return state.setIn(['standardItems', standardItemId, name], value);
    }


    case UPDATE_STANDARD_ELEMENT_GROUP_PENDING:
      return state.set('saving', true);

    case UPDATE_STANDARD_ELEMENT_GROUP_FULFILLED: {
      const {standardElementGroup, standardElements, standardItemIndexesAndTimes} = action.payload.data;

      return state.withMutations(map => {
        map.set('saving', false)
          .setIn(['standardItemsStates', standardElementGroup.id, 'editing'], false)
          .setIn(['standardItems', standardElementGroup.id], new StandardElementGroupModel(standardElementGroup))
          .update('standardItems', standardItems => standardItems.merge(standardItemModelsArrayToMapById(standardElements)))
          .update('standardItems', standardItems => standardItems.mergeDeep(modelsArrayToMapById(standardItemIndexesAndTimes)))
          .deleteIn(['pristineStandardItems', standardElementGroup.id])
          .deleteIn(['standardItemsValidationErrors', standardElementGroup.id]);

        standardElements.forEach(se =>
          map.deleteIn(['pristineStandardItems', se.id])
            .deleteIn(['standardItemsValidationErrors', se.id])
            .setIn(['standardItemsStates', se.id, 'commentEntered'], Boolean(se.comment)));
      });
    }

    case UPDATE_STANDARD_ELEMENT_GROUP_REJECTED: {
      const {payload} = action;
      const matches = /\/(\d+)$/.exec(payload.config.url);
      const standardElementGroupId = Number(matches[1]);
      const {status, data} = payload.response || {};

      const childStandardItems = state.get('standardItems')
        .filter(si => si.get('standardElementGroupId') === standardElementGroupId);

      return state.withMutations(map => {
        map.set('saving', false);

        childStandardItems.forEach(csi => map.deleteIn(['standardItemsValidationErrors', csi.get('id')]));

        if (status === 400) {
          const validationErrors = fromJS(data);

          const groupValidationErrors = validationErrors.filter(
            (_, key) => !standardElementValidationErrorKeyRegExp.test(key));

          map.setIn(['standardItemsValidationErrors', standardElementGroupId], groupValidationErrors);
          map.update('standardItemsValidationErrors', sive =>
            sive.merge(extractStandardElementValidationErrors(validationErrors)));
        } else {
          map.deleteIn(['standardItemsValidationErrors', standardElementGroupId]);
        }
      });
    }

    case CREATE_STANDARD_REVISION_PENDING:
    case UPDATE_STANDARD_ELEMENT_PENDING:
      return state.set('saving', true);

    case UPDATE_STANDARD_ELEMENT_FULFILLED: {
      const {standardElement, standardItemIndexesAndTimes} = action.payload.data;

      return state.withMutations(map => {
        map.set('saving', false)
          .setIn(['standardItemsStates', standardElement.id, 'editing'], false)
          .setIn(['standardItemsStates', standardElement.id, 'commentEntered'], Boolean(standardElement.comment))
          .setIn(['standardItems', standardElement.id], new StandardElementModel(standardElement))
          .update('standardItems', standardItems => standardItems.mergeDeep(modelsArrayToMapById(standardItemIndexesAndTimes)))
          .deleteIn(['pristineStandardItems', standardElement.id])
          .deleteIn(['standardItemsValidationErrors', standardElement.id])
          .set('standardElementEditorProperties', initialState.get('standardElementEditorProperties'));
      });
    }

    case PROMOTE_TO_LIST_ELEMENT_FULFILLED: {
      const {standardElement, standardElementGroupId, standardElementGroupConcurrencyToken} = action.payload.data;

      return state.withMutations(map => {
        map.set('saving', false)
          .setIn(['standardItems', standardElement.id], new StandardElementModel(standardElement));
        if (standardElementGroupId !== null) {
          map.setIn(['standardItems', standardElementGroupId, 'concurrencyToken'], standardElementGroupConcurrencyToken);
        }
      });
    }

    case UPDATE_STANDARD_ELEMENT_REJECTED: {
      const {payload} = action;
      const {id: standardElementId} = JSON.parse(payload.config.data);
      const {status, data} = payload.response || {};

      return state.withMutations(map => {
        map.set('saving', false);

        if (status === 400) {
          const validationErrors = fromJS(data);

          map.setIn(['standardItemsValidationErrors', standardElementId], validationErrors);
        } else {
          map.deleteIn(['standardItemsValidationErrors', standardElementId]);
        }
      });
    }

    case DELETE_STANDARD_ELEMENT_GROUP_FULFILLED: {
      const {standardItemIds, standardItemIndexesAndTimes} = action.payload.data;
      const standardItemIndexesAndTimesMap = modelsArrayToMapById(standardItemIndexesAndTimes);

      return state.withMutations(map => {
        standardItemIds.forEach(standardItemId => {
          map.deleteIn(['standardItems', standardItemId])
            .deleteIn(['pristineStandardItems', standardItemId])
            .deleteIn(['standardItemsStates', standardItemId])
            .deleteIn(['standardItemsValidationErrors', standardItemId]);
        });
        processStandardElementGroupCollapse(map);

        map.update('standardItems', standardItems => standardItems.mergeDeep(standardItemIndexesAndTimesMap))
          .update('pristineStandardItems', pristineStandardItems =>
            pristineStandardItems.map(psi => psi.merge(standardItemIndexesAndTimesMap.get(psi.get('id')))));
      });
    }


    case DELETE_STANDARD_ELEMENTS_FULFILLED:
    case BULK_DELETE_SELECTED_STANDARD_ITEMS_FULFILLED: {
      const standardItemIndexesAndTimes = action.payload.data.standardItemIndexesAndTimes;

      let standardElementIds;
      if (action.type === DELETE_STANDARD_ELEMENTS_FULFILLED) {
        standardElementIds = action.payload.data.standardElementIds;
      } else {
        standardElementIds = action.payload.data.deletedStandardItemIds;
      }

      const standardItemIndexesAndTimesMap = modelsArrayToMapById(standardItemIndexesAndTimes);

      return state.withMutations(map => {
        standardElementIds.forEach(standardElementId => {
          map.deleteIn(['standardItems', standardElementId])
            .deleteIn(['pristineStandardItems', standardElementId])
            .deleteIn(['standardItemsStates', standardElementId])
            .deleteIn(['standardItemsValidationErrors', standardElementId]);
        });
        map.update('standardItems', standardItems => standardItems.mergeDeep(standardItemIndexesAndTimesMap))
          .update('pristineStandardItems', pristineStandardItems =>
            pristineStandardItems.map(psi => psi.merge(standardItemIndexesAndTimesMap.get(psi.get('id')))));
        if (action.type === BULK_DELETE_SELECTED_STANDARD_ITEMS_FULFILLED) {
          map.set('selectedStandardElementGroupIds', initialState.get('selectedStandardElementGroupIds'));
        }
      });
    }

    case REORDER_STANDARDS_ITEMS_PENDING:
    case MOVE_STANDARD_ITEM_PENDING:
      return state.set('moving', true);

    case REORDER_STANDARDS_ITEMS_FULFILLED:
    case MOVE_STANDARD_ITEM_FULFILLED: {
      const standardItemIndexes = action.payload.data;
      const standardItemIndexesMap = modelsArrayToMapById(standardItemIndexes);

      return state.withMutations(map =>
        map.set('moving', false)
          .update('standardItems', standardItems => standardItems.mergeDeep(standardItemIndexesMap))
          .update('pristineStandardItems', pristineStandardItems =>
            pristineStandardItems.map(psi => psi.merge(standardItemIndexesMap.get(psi.get('id'))))));
    }

    case REORDER_STANDARDS_ITEMS_REJECTED:
    case MOVE_STANDARD_ITEM_REJECTED:
      return state.set('moving', false);


    case MOVE_STANDARD_ELEMENT_TO_GROUP_PENDING:
      return state.set('moving', true);

    case MOVE_STANDARD_ELEMENT_TO_GROUP_FULFILLED: {
      const {standardElementId, standardElementGroupId, standardItemIndexesAndTimes} = action.payload.data;
      const standardItemIndexesAndTimesMap = modelsArrayToMapById(standardItemIndexesAndTimes);

      return state.withMutations(map => {
        map.set('moving', false)
          .setIn(['standardItems', standardElementId, 'standardElementGroupId'], standardElementGroupId)
          .update('standardItems', standardItems => standardItems.mergeDeep(standardItemIndexesAndTimesMap))
          .update('pristineStandardItems', pristineStandardItems =>
            pristineStandardItems.map(psi => psi.merge(standardItemIndexesAndTimesMap.get(psi.get('id')))));

        const pristineStandardItems = state.get('pristineStandardItems');
        if (pristineStandardItems.has(standardElementId)) {
          pristineStandardItems.setIn([standardElementId, 'standardElementGroupId'], standardElementGroupId);
        }
      });
    }

    case MOVE_STANDARD_ELEMENT_TO_GROUP_REJECTED:
      return state.set('moving', false);


    case REMOVE_STANDARD_ELEMENT_FROM_GROUP_PENDING:
      return state.set('moving', true);

    case REMOVE_STANDARD_ELEMENT_FROM_GROUP_FULFILLED: {
      const {standardElementId, standardItemIndexesAndTimes} = action.payload.data;
      const standardItemIndexesAndTimesMap = modelsArrayToMapById(standardItemIndexesAndTimes);

      return state.withMutations(map => {
        map.set('moving', false)
          .setIn(['standardItems', standardElementId, 'standardElementGroupId'], null)
          .update('standardItems', standardItems => standardItems.mergeDeep(standardItemIndexesAndTimesMap))
          .update('pristineStandardItems', pristineStandardItems =>
            pristineStandardItems.map(psi => psi.merge(standardItemIndexesAndTimesMap.get(psi.get('id')))));

        const pristineStandardItems = state.get('pristineStandardItems');
        if (pristineStandardItems.has(standardElementId)) {
          pristineStandardItems.setIn([standardElementId, 'standardElementGroupId'], null);
        }
      });
    }

    case REMOVE_STANDARD_ELEMENT_FROM_GROUP_REJECTED:
      return state.set('moving', false);


    case REFRESH_STANDARD_TIME_FULFILLED: {
      const {standardItemTimes} = action.payload.data;
      const standardItemTimesMap = modelsArrayToMapById(standardItemTimes);

      return state
        .update('standardItems', standardItems => standardItems.mergeDeep(standardItemTimesMap))
        .update('pristineStandardItems', pristineStandardItems =>
          pristineStandardItems.map(psi => psi.merge(standardItemTimesMap.get(psi.get('id')))));
    }

    case REGISTER_STANDARD_ITEM_SCROLL_NODE: {
      const {nodeId, node} = action.payload;

      return state.setIn(['scrollNodes', nodeId], node);
    }

    case LOAD_STANDARD_FOR_REPORT_PENDING:
    case LOAD_STANDARD_REVISION_FOR_REPORT_PENDING:
      return state.set('loadingForReport', true);

    case LOAD_STANDARD_REVISION_FOR_REPORT_FULFILLED:
    case LOAD_STANDARD_REVISION_FOR_REPORT_REJECTED:
    case LOAD_STANDARD_FOR_REPORT_FULFILLED:
    case LOAD_STANDARD_FOR_REPORT_REJECTED:
      return state.set('loadingForReport', false);
    case SET_STANDARD_ELEMENT_EDITOR_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['standardElementEditorProperties', name], value);
    }

    case SHOW_CREATE_STANDARD_ELEMENT:
      return state.set('standardElementEditorProperties', initialState.get('standardElementEditorProperties'));

    default:
      return state;
  }
}

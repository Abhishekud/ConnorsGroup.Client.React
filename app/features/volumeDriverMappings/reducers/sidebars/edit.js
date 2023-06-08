import {fromJS, List, Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  addValueToVolumeDriverMapping,
  deleteValueFromVolumeDriverMapping,
} from '../../services';
import {
  SELECT_VOLUME_DRIVER_MAPPING,
  CLEAR_SELECTED_VOLUME_DRIVER_MAPPING,
  CLOSE_VOLUME_DRIVER_MAPPINGS_LIST_EDIT_SIDEBAR,
  SET_EDIT_VOLUME_DRIVER_MAPPING_MODEL_SET_VALUE,
  SET_EDIT_VOLUME_DRIVER_MAPPING_MODEL_PROPERTY,
  UPDATE_VOLUME_DRIVER_MAPPING_PENDING,
  UPDATE_VOLUME_DRIVER_MAPPING_FULFILLED,
  UPDATE_VOLUME_DRIVER_MAPPING_REJECTED,
  CREATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED,
  DELETE_VOLUME_DRIVER_MAPPING_SET_FULFILLED,
  UPDATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED,
  LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_FULFILLED,
} from '../../actions';

const initialState = Map({
  show: false,
  saving: false,
  model: Map(),
  validationErrors: Map(),
  volumeDriverMappingSets: List(),
  columnClickTarget: '',
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_VOLUME_DRIVER_MAPPING:
    case CLOSE_VOLUME_DRIVER_MAPPINGS_LIST_EDIT_SIDEBAR:
    case UPDATE_VOLUME_DRIVER_MAPPING_FULFILLED:
      return initialState.set('volumeDriverMappingSets', state.get('volumeDriverMappingSets'));

    case LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_FULFILLED: {
      const {volumeDriverMappingSets} = action.payload.data;
      return state.withMutations(map => {
        map.set('volumeDriverMappingSets', fromJS(volumeDriverMappingSets));
        map.set('show', false);
      });
    }

    case SELECT_VOLUME_DRIVER_MAPPING: {
      const {columnClickTarget} = action.payload;
      let {volumeDriverMapping} = action.payload;
      let volumeDriverMappingSetValues = [];

      /**
       * We need to prepare a list of volumeDriveSetValues from the selected volumeDriverMapping,
       * and clean up all vdm sets to reduce payload size
       */
      const setValues = volumeDriverMapping.filter((vdm, index) => !isNaN(index));
      setValues.forEach((vdm, index) => {
        volumeDriverMappingSetValues.push({volumeDriverMappingSetId: Number(index), value: Number(vdm)});
        volumeDriverMapping = volumeDriverMapping.delete(index.toString());
      });

      // Values are returned after creating volumeDriverMapping
      if (volumeDriverMapping.get('values')) {
        volumeDriverMappingSetValues = volumeDriverMapping.get('values');
      }

      const rowObject = volumeDriverMapping.setIn(['rowModel'], true)
        .set('values', fromJS(volumeDriverMappingSetValues));
      return state.withMutations(map =>
        map
          .set('show', true)
          .set('columnClickTarget', columnClickTarget)
          .set('saving', false)
          .set('model', rowObject)
          .set('validationErrors', Map())
          .setIn(['model', 'values'], rowObject.get('values'))
      );
    }


    case SET_EDIT_VOLUME_DRIVER_MAPPING_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_EDIT_VOLUME_DRIVER_MAPPING_MODEL_SET_VALUE: {
      const {volumeDriverMappingSetId, value} = action.payload;
      const values = fromJS(state.getIn(['model', 'values']));

      const valueIndex = values.findIndex(v => Number(v.get('volumeDriverMappingSetId')) === Number(volumeDriverMappingSetId));
      if (valueIndex < 0) {
        return state.setIn(['model', 'values', values.push(Map({volumeDriverMappingSetId, value}))]);
      }
      return state.setIn(['model', 'values', valueIndex, 'value'], value);
    }

    case UPDATE_VOLUME_DRIVER_MAPPING_PENDING:
      return state.set('saving', true);

    case UPDATE_VOLUME_DRIVER_MAPPING_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case CREATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED: {
      const {volumeDriverMappingSet, volumeDriverMappingValues} = action.payload.data;

      return state.withMutations(map => {
        map.update('volumeDriverMappingSets', vdms => vdms.push(fromJS(volumeDriverMappingSet)));

        const volumeDriverMappingValuesByVolumeDriverMappingId = modelsArrayToMapById(volumeDriverMappingValues, 'volumeDriverMappingId');

        if (map.get('model').size) {
          map.update('model', volumeDriverMapping =>
            addValueToVolumeDriverMapping(volumeDriverMapping, volumeDriverMappingValuesByVolumeDriverMappingId));
        }
      });
    }

    case UPDATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED: {
      const volumeDriverMappingSet = action.payload.data;

      return state.withMutations(map => {
        map.update('volumeDriverMappingSets', vdmss => {
          const index = vdmss.findIndex(vdms => vdms.get('id') === volumeDriverMappingSet.id);
          return vdmss.set(index, fromJS(volumeDriverMappingSet));
        });
      });
    }

    case DELETE_VOLUME_DRIVER_MAPPING_SET_FULFILLED: {
      const {volumeDriverMappingSetId: vdmsId} = action.payload.data;

      return state.withMutations(map => {
        if (map.get('model').size) {
          map.update('model', volumeDriverMapping => deleteValueFromVolumeDriverMapping(volumeDriverMapping, vdmsId));
        }

        map.update('volumeDriverMappingSets', vdmss => {
          const deletedIndex = vdmss.findIndex(vdms => vdms.get('id') === vdmsId);
          return vdmss.delete(deletedIndex);
        });
      });
    }

    default:
      return state;
  }
}

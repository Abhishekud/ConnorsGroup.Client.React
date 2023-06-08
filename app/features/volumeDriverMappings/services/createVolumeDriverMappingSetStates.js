import {Map} from 'immutable';
import createVolumeDriverMappingSetState from './createVolumeDriverMappingSetState';

export default function (volumeDriverMappingSets) {
  return Map(volumeDriverMappingSets.map(cc => [cc.id, createVolumeDriverMappingSetState()]));
}

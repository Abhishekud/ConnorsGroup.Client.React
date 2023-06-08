export default function (volumeDriverMapping, volumeDriverMappingValuesByVolumeDriverMappingsId) {
  const volumeDriverMappingValue = volumeDriverMappingValuesByVolumeDriverMappingsId.get(volumeDriverMapping.id);
  volumeDriverMapping[volumeDriverMappingValue.get('volumeDriverMappingSetId')] = volumeDriverMappingValue.get('value');
  return volumeDriverMapping;
}

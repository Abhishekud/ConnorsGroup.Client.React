export default function (volumeDriverMapping, volumeDriverMappingValuesByVolumeDriverMappingId) {
  return volumeDriverMapping.update('values', values => {
    const volumeDriverMappingId = volumeDriverMapping.get('id');
    const volumeDriverMappingValue = volumeDriverMappingValuesByVolumeDriverMappingId.get(volumeDriverMappingId);
    return values.push(volumeDriverMappingValue);
  });
}

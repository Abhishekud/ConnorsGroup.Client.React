export default function (volumeDriverMapping, volumeDriverMappingSetId) {
  return volumeDriverMapping.update('values', values => {
    const index = values.findIndex(cc => cc.get('volumeDriverMappingSetId') === volumeDriverMappingSetId);
    return index >= 0 ? values.delete(index) : values;
  });
}

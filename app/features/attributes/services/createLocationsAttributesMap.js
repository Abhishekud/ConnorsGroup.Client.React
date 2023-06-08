import {Map, Set} from 'immutable';

export default function (locationsAttributesArray) {
  const locationsAttributesMap = new Map().asMutable();

  for (const locationAttributes of locationsAttributesArray) {
    locationsAttributesMap.set(locationAttributes.locationId, Set(locationAttributes.attributeIds));
  }

  return locationsAttributesMap.asImmutable();
}

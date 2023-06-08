/**
 * Description: Accepts location, standard and element details and returns the route for navigation
 * @param {*} location - Router object based on the built-in browser's window.location object
 * @param {*} defaultRoute - Default route to return to based on the module.
 * @param {*} additionalParams - Additional parameters consisting of the element ID, standard ID and scroll ID.
 * @returns the route string.
 * Note: This service is currently used only for Kronos Labor Standards and rest is todo.
 */

import {elementTypes} from '../../elements/constants';

export default function getDynamicRoute(location, defaultRoute = null, additionalParams = null) {
  let newRoute;
  if (additionalParams?.standardElementType) {
    if (additionalParams.standardElementType === elementTypes.MOST) {
      newRoute = `/elements/most/${additionalParams.elementId}?standardId=${additionalParams.standardId}&scrollId=${additionalParams.standardElementId}`;
    } else if (additionalParams.standardElementType === elementTypes.TIMED) {
      newRoute = `/elements/non-most/${additionalParams.elementId}?standardId=${additionalParams.standardId}&scrollId=${additionalParams.standardElementId}`;
    }
    if (location.query.kronosstandards && newRoute) {
      newRoute = newRoute.concat('&kronosstandards=true');
    }
    if (location.query.element && newRoute) {
      newRoute = newRoute.concat('&element=', location.query.element, '&elementType=', location.query.elementType, '&elementId=', location.query.elementId);
    }
    return newRoute;
  }
  if (defaultRoute === '/elements' && location.query.standardId) {
    newRoute = `/standards/${location.query.standardId}?scrollId=${location.query.scrollId}`;
    if (location.query.kronosstandards) {
      newRoute = newRoute.concat('&kronosstandards=true');
    }
    if (location.query.element) {
      newRoute = newRoute.concat('&element=', location.query.element, '&elementType=', location.query.elementType, '&elementId=', location.query.elementId);
    }
    return newRoute;
  } else if (defaultRoute === '/standards') {
    newRoute = defaultRoute;
    if (location.query.element) {
      if (location.query.elementType.toLowerCase() === 'timed') {
        newRoute = `/elements/non-most/${location.query.elementId}?showMassUpdate=true`;
      } else if (location.query.elementType.toLowerCase() === 'most') {
        newRoute = `/elements/most/${location.query.elementId}?showMassUpdate=true`;
      }
    }
    if (location.query.kronosstandards) {
      newRoute = '/kronos/laborstandards';
    } else if (location.query.return) {
      newRoute = `/${location.query.return}`;
    }
    return newRoute;
  }
  return defaultRoute;
}

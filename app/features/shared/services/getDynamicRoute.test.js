import {getDynamicRoute} from '../services';
const {describe, test, expect} = global;

/**
 * Scenario: 01. User navigates from Kronos Labor Standards to the Element details page
 * Given: User is on the Kronos Labor Standards page
 * When: User navigates to the Element details page by clicking on the element name or ID via the Standard Details page
 * Then: The user can navigate back from the Element details page to the Kronos Labor Standards
 * Note: The appropriate routes for navigating to the previous page will be dynamically created based on the params provided
 */
describe('01. User navigates from Kronos Labor Standards to the Element details page', () => {
  let location;
  let defaultRoute;
  let additionalParams;
  let receivedRoute;

  test('Verify the path when user navigates from the Kronos Labor Standards to the Standard Details page', () => {
    defaultRoute = '/standards';
    additionalParams = null;
    location = {
      'pathname': '/standards/100999',
      'search': '?kronosstandards=true',
      'query': {
        'kronosstandards': 'true',
      },
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    const expectedRoute = '/kronos/laborstandards';
    expect(receivedRoute).toEqual(expectedRoute);
  });

  test('Verify the path when user navigates from the Kronos Labor Standards to the Element details page through the Standard Details page', () => {
    defaultRoute = '';
    additionalParams = {
      'standardElementType': 'MOST',
      'elementId': 100467,
      'standardId': '100999',
      'standardElementId': 66652,
    };
    location = {
      'pathname': '/standards/100999',
      'search': '?kronosstandards=true',
      'query': {
        'kronosstandards': 'true',
      },
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    const expectedRoute = `/elements/most/${additionalParams.elementId}?standardId=${additionalParams.standardId}&scrollId=${additionalParams.standardElementId}&kronosstandards=true`;
    expect(receivedRoute).toEqual(expectedRoute);
  });

  test('Verify the path when user navigates from the Element details page to the Kronos Labor Standards page', () => {
    defaultRoute = '/elements';
    additionalParams = null;
    location = {
      'pathname': '/elements/most/100467',
      'search': '?standardId=100999&scrollId=66652&kronosstandards=true',
      'query': {
        'kronosstandards': 'true',
        'scrollId': '66652',
        'standardId': '100999',
      },
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    const expectedRoute = `/standards/${location.query.standardId}?scrollId=${location.query.scrollId}&kronosstandards=true`;
    expect(receivedRoute).toEqual(expectedRoute);
  });
});

/**
 * Scenario: 02. User navigates from Standards to the Element details page
 * Given: User is on the Standards page
 * When: User navigates to the Element details page by clicking on the element name or ID via the Standard Details page
 * Then: The user can navigate back from the Element details page to Standards
 * Note: The appropriate routes for navigating to the previous page will be dynamically created based on the params provided
 */
describe('02. User navigates from Standards to the Element details page', () => {
  let location;
  let defaultRoute;
  let additionalParams;
  let receivedRoute;

  test('Verify the path when user navigates from Standards page to the Standard Details page', () => {
    defaultRoute = '/standards';
    additionalParams = null;
    location = {
      'pathname': '/standards/103737',
      'search': '',
      'query': {},
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    expect(receivedRoute).toEqual(defaultRoute);
  });

  test('Verify the path when user navigates from the Standard Details page to the Element details page', () => {
    defaultRoute = '/standards';
    additionalParams = null;
    location = {
      'pathname': '/standards/103737',
      'search': '',
      'query': {},
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    expect(receivedRoute).toEqual(defaultRoute);
  });

  test('Verify the path when user navigates from the Element details page to the Standards details page', () => {
    defaultRoute = '/elements';
    additionalParams = null;
    location = {
      'pathname': '/elements/most/101406',
      'search': '?standardId=103737&scrollId=61327',
      'query': {
        'scrollId': '61327',
        'standardId': '103737',
      },
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    const expectedRoute = `/standards/${location.query.standardId}?scrollId=${location.query.scrollId}`;
    expect(receivedRoute).toEqual(expectedRoute);
  });
});

/**
 * Scenario: 03. User navigates from Dashboard Standards to the Element details page
 * Given: User is on the Dashboard Standards page
 * When: User navigates to the Element details page by clicking on the element name or ID via the Standard Details page
 * Then: The user can navigate back from the Element details page to the Dashboard Standards
 * Note: The appropriate routes for navigating to the previous page will be dynamically created based on the params provided
 */
describe('03. User navigates from Dashboard Standards to the Element details page', () => {
  let location;
  let defaultRoute;
  let additionalParams;
  let receivedRoute;

  test('Verify the path when user navigates from Dashboard Standards page to the Standard Details page', () => {
    defaultRoute = '/standards';
    additionalParams = null;
    location = {
      'pathname': '/standards/101437',
      'search': '?return=dashboard%3Freturn%3Dtrue',
      'query': {
        'return': 'dashboard?return=true',
      },
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    const expectedRoute = `/${location.query.return}`;
    expect(receivedRoute).toEqual(expectedRoute);
  });

  test('Verify the path when user navigates from the Standard Details page to the Element details page', () => {
    defaultRoute = '/standards';
    additionalParams = null;
    location = {
      'pathname': '/standards/103737',
      'search': '',
      'query': {},
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    expect(receivedRoute).toEqual(defaultRoute);
  });
});

/**
 * Scenario: 04. User navigates from Characteristics Standards List Page to the Element details page
 * Given: User is on the Characteristics Standards List Page
 * When: User navigates to the Element details page by clicking on the element name or ID via the Standard Details page
 * Then: The user can navigate back from the Standard Details page to the Characteristics Standards List Page.
 * Note: The appropriate routes for navigating to the previous page will be dynamically created based on the params provided
 * If the user has navigated to the Element details page then on navigating back they will be directed to the Standards page.
 */
describe('04. User navigates from Characteristics Standards List Page to the Element details page', () => {
  let location;
  let defaultRoute;
  let additionalParams;
  let receivedRoute;

  test('Verify the path when user navigates from Characteristics Standards List Page page to the Standard Details page', () => {
    defaultRoute = '/standards';
    additionalParams = null;
    location = {
      'pathname': '/standards/109276',
      'search': '?return=characteristics-where-used/3026%3Freturn=characteristics%3Freturn%3Dtrue',
      'query': {
        'return': 'characteristics-where-used/3026?return=characteristics?return=true',
      },
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    const expectedRoute = `/${location.query.return}`;
    expect(receivedRoute).toEqual(expectedRoute);
  });

  test('Verify the path when user navigates from the Standard Details page to the Element details page', () => {
    defaultRoute = '/standards';
    additionalParams = null;
    location = {
      'pathname': '/standards/103737',
      'search': '',
      'query': {},
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    expect(receivedRoute).toEqual(defaultRoute);
  });
});

/**
 * Scenario: 05. User navigates from Unit Of Measure Standards List Page to the Element details page
 * Given: User is on the Unit Of Measure Standards List Page
 * When: User navigates to the Element details page by clicking on the element name or ID via the Standard Details page
 * Then: The user can navigate back from the Standard Details page to the Unit Of Measure Standards List Page
 * Note: The appropriate routes for navigating to the previous page will be dynamically created based on the params provided
 * If the user has navigated to the Element details page then on navigating back they will be directed to the Standards page.
 */
describe('05. User navigates from Unit Of Measure Standards List Page to the Element details page', () => {
  let location;
  let defaultRoute;
  let additionalParams;
  let receivedRoute;

  test('Verify the path when user navigates from Unit Of Measure Standards List Page to the Standard Details page', () => {
    defaultRoute = '/standards';
    additionalParams = null;
    location = {
      'pathname': '/standards/109276',
      'search': '?return=characteristics-where-used/3026%3Freturn=characteristics%3Freturn%3Dtrue',
      'query': {
        'return': 'characteristics-where-used/3026?return=characteristics?return=true',
      },
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    const expectedRoute = `/${location.query.return}`;
    expect(receivedRoute).toEqual(expectedRoute);
  });

  test('Verify the path when user navigates from the Standard Details page to the Element details page', () => {
    defaultRoute = '/standards';
    additionalParams = null;
    location = {
      'pathname': '/standards/103737',
      'search': '',
      'query': {},
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    expect(receivedRoute).toEqual(defaultRoute);
  });
});

/**
 * Scenario: 06. User navigates from Elements Standards List Page to the Standard profile page
 * Given: User is on the Elements Standards List Page
 * When: User navigates to the Standard profile page by clicking on the standard ID via the Elements Standard List page
 * Then: The user can navigate back from the Standard Profile page to the Elements Standards List Page.
 * Note: The appropriate routes for navigating to the previous page will be dynamically created based on the params provided
 * If the user has navigated to the Standard profile page then on navigating back they will be directed to the Elements Standard List Page.
 */
describe('06. User navigates from Elements Standards List Page to the Standard profile page', () => {
  let location;
  let defaultRoute;
  let additionalParams;
  let receivedRoute;

  test('Verify the path when user navigates from Timed Elements Standards List Page page to the Standard Profile page', () => {
    defaultRoute = '/standards';
    additionalParams = null;
    location = {
      'pathname': '/standards/101112',
      'search': '?element=true&elementType=Timed&elementId=100220',
      'query': {
        'element': 'true',
        'elementType': 'Timed',
        'elementId': '10020',
      },
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    const expectedRoute = `/elements/non-most/${location.query.elementId}?showMassUpdate=true`;
    expect(receivedRoute).toEqual(expectedRoute);
  });

  test('Verify the path when user navigates from Most Elements Standards List Page page to the Standard Profile page', () => {
    defaultRoute = '/standards';
    additionalParams = null;
    location = {
      'pathname': '/standards/101112',
      'search': '?element=true&elementType=MOST&elementId=100220',
      'query': {
        'element': 'true',
        'elementType': 'MOST',
        'elementId': '10020',
      },
    };
    receivedRoute = getDynamicRoute(location, defaultRoute, additionalParams);
    const expectedRoute = `/elements/most/${location.query.elementId}?showMassUpdate=true`;
    expect(receivedRoute).toEqual(expectedRoute);
  });
});

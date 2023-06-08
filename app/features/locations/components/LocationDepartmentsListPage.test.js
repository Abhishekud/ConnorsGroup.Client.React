import {mergeLocationData} from '../services';
const {describe, test, expect, beforeEach} = global;


describe('Test location, department, orgHierarchy data merging result on locationDepartmentListPage', () => {
  let locationData;
  let locationDepartmentsList;
  let mergedLocationData;
  const skip = 0;


  beforeEach(() => {
    locationDepartmentsList = {
      'locations': [{
        'id': 2323,
        'name': '11867',
        'description': 'Test',
        'locationProfileId': 4,
        'locationProfileName': 'AJ_Loc_Profile',
        'parentOrgHierarchyLevelOptionId': '29',
        'parentOrgHierarchyLevelOptionValue': null,
        'activeDate': null,
        'inactiveDate': null,
        'kronosSitePath': null,
        'departments': null,
        'active': true,
        'locationOrgHierarchyLevels': {
          'orgHierarchyLevel_1': null,
        },
      }, {
        'id': 2322,
        'name': '11866',
        'description': '',
        'locationProfileId': 4,
        'locationProfileName': 'AJ_Loc_Profile',
        'parentOrgHierarchyLevelOptionId': '29',
        'parentOrgHierarchyLevelOptionValue': null,
        'activeDate': null,
        'inactiveDate': null,
        'kronosSitePath': '',
        'departments': null,
        'active': true,
        'locationOrgHierarchyLevels': {
          'orgHierarchyLevel_1': null,
          'orgHierarchyLevel_3': 'Org Hierarchy 3',
          'orgHierarchyLevel_4': 'Org Hierarchy 4',
        },
      }, {
        'id': 2321,
        'name': '11865',
        'description': '',
        'locationProfileId': 4,
        'locationProfileName': 'AJ_Loc_Profile',
        'parentOrgHierarchyLevelOptionId': '30',
        'parentOrgHierarchyLevelOptionValue': null,
        'activeDate': null,
        'inactiveDate': null,
        'kronosSitePath': '',
        'departments': null,
        'active': true,
        'locationOrgHierarchyLevels': {
          'orgHierarchyLevel_1': null,
          'orgHierarchyLevel_4': null,
          'orgHierarchyLevel_5': 'Org Hierarchy 5',
          'orgHierarchyLevel_6': 'Org Hierarchy 5',
          'orgHierarchyLevel_7': null,
        },
      }, {
        'id': 2320,
        'name': '11864',
        'description': '',
        'locationProfileId': 4,
        'locationProfileName': 'AJ_Loc_Profile',
        'parentOrgHierarchyLevelOptionId': null,
        'parentOrgHierarchyLevelOptionValue': null,
        'activeDate': null,
        'inactiveDate': null,
        'kronosSitePath': '',
        'departments': null,
        'active': true,
        'locationOrgHierarchyLevels': {
          'orgHierarchyLevel_1': null,
        },
      }, {
        'id': 2319,
        'name': '11863',
        'description': 'In geography, location or place are used to denote a region (point, line, or area)',
        'locationProfileId': 4,
        'locationProfileName': 'AJ_Loc_Profile',
        'parentOrgHierarchyLevelOptionId': '29',
        'parentOrgHierarchyLevelOptionValue': null,
        'activeDate': '2021-12-15T00:00:00+00:00',
        'inactiveDate': '2022-06-15T00:00:00+00:00',
        'kronosSitePath': null,
        'departments': null,
        'active': true,
        'locationOrgHierarchyLevels': {
          'orgHierarchyLevel_1': null,
        },
      }],
      'departments': [{
        'id': 19,
        'name': 'AJ_Dept_2021',
        'selectedLocationsCount': 686,
      }, {
        'id': 7,
        'name': 'AK Department',
        'selectedLocationsCount': 9,
      },
      {
        'id': 8,
        'name': 'Bakery',
        'selectedLocationsCount': 5279,
      }, {
        'id': 18,
        'name': 'Apparel',
        'selectedLocationsCount': 7,
      }],
      'locationsDepartments': [{
        'locationId': 2319,
        'departmentIds': [6, 19, 18],
      }, {
        'locationId': 2320,
        'departmentIds': [7, 19],
      }, {
        'locationId': 2321,
        'departmentIds': [6, 7, 19, 18],
      }, {
        'locationId': 2322,
        'departmentIds': [6, 19, 7],
      }, {
        'locationId': 2323,
        'departmentIds': [18, 6, 7],
      }],
      'locationProfiles': [{
        'id': 4,
        'name': 'AJ_Loc_Profile',
        'departments': [{
          'id': 19,
          'name': 'AJ_Dept_2021',
          'standardsCount': 0,
        }],
      }, {
        'id': 1,
        'name': 'AK Location Profile 1',
        'departments': [{
          'id': 6,
          'name': 'AJ Dept',
          'standardsCount': 0,
        }, {
          'id': 7,
          'name': 'AK Department',
          'standardsCount': 0,
        }, {
          'id': 18,
          'name': 'Apparel',
          'standardsCount': 0,
        }],
      }],
      'total': 6,
    };
    locationData = new Array(locationDepartmentsList.total).fill().map((e, i) => ({index: i}));
    mergedLocationData = mergeLocationData(locationDepartmentsList, locationData, skip);
  });

  // Checks if 5 location rows contains department 18 after merging and has correct values
  test('Check if department_18 exists and has correct value after Merging', () => {
    expect(mergedLocationData[0]).toHaveProperty('department_18', true);
    expect(mergedLocationData[1]).toHaveProperty('department_18', false);
    expect(mergedLocationData[2]).toHaveProperty('department_18', true);
    expect(mergedLocationData[3]).toHaveProperty('department_18', false);
    expect(mergedLocationData[4]).toHaveProperty('department_18', true);
  });

  // Checks if 4 location rows contains orgHierarchyLevel_1 after merging
  test('Check if orgHierarchyLevel_1 is present after Merging', () => {
    expect(mergedLocationData[0]).toHaveProperty('orgHierarchyLevel_1');
    expect(mergedLocationData[1]).toHaveProperty('orgHierarchyLevel_4');
    expect(mergedLocationData[2]).toHaveProperty('orgHierarchyLevel_6');
    expect(mergedLocationData[4]).toHaveProperty('orgHierarchyLevel_1');
  });

  // Checks if 5 location rows contains index after merging
  test('Check if index is present after Merging', () => {
    expect(mergedLocationData[0]).toHaveProperty('index');
    expect(mergedLocationData[1]).toHaveProperty('index');
    expect(mergedLocationData[2]).toHaveProperty('index');
    expect(mergedLocationData[3]).toHaveProperty('index');
    expect(mergedLocationData[4]).toHaveProperty('index');
  });

  // Checks if last location row does not contains id, name, active attributes after merging
  test('Check if last location row does not contain location data', () => {
    expect(mergedLocationData[5]).not.toHaveProperty('id');
    expect(mergedLocationData[5]).not.toHaveProperty('name');
    expect(mergedLocationData[5]).not.toHaveProperty('active');
  });
});

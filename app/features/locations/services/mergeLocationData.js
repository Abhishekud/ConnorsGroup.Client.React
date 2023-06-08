/**
 * Description: Accept locationDepartmentList, orgHierarchies, locationData array and skip,
 * merges location data with orgHierarchies and departments and returns locationData after merging.
 * @param {*} locationDepartmentsList - Contains list of departments and locations.
 * @param {*} locationData - Array of locationData with length equal to the total number of location records.
 * @param {*} orgHierarchies - Contains organisation information.
 * @param {*} skip - The position in the array where the location rows will be added.
 * @returns Array of locations data merged with orghierarchylevel and departments.
 */
export default function (locationDepartmentsList, locationData, skip) {
  locationDepartmentsList.locations.forEach(location => {
    const locationOrgHierarchyLevels = location.locationOrgHierarchyLevels;
    if (locationOrgHierarchyLevels) {
      for (const id in locationOrgHierarchyLevels) {
        if (id) {
          location[id] = locationOrgHierarchyLevels[id];
        }
      }
    }

    const deptSettings = locationDepartmentsList.locationsDepartments.find(obj => obj.locationId === location.id);
    locationDepartmentsList.departments
      .forEach(dept => {
        location[`department_${dept.id}`] = deptSettings.departmentIds.indexOf(dept.id) > -1;
      });
    location.inEdit = true;
  });
  locationDepartmentsList.locations.forEach((location, i) => {
    locationData[i + skip] = {index: i + skip, ...location};
  });
  return locationData;
}

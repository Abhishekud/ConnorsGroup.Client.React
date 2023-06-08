import React from 'react';
import {PropTypes} from 'prop-types';
import LaborProjectionsLocations from './LaborProjectionsLocations';
import LaborProjectionsOrgHierarchies from './LaborProjectionsOrgHierarchies';
import LaborProjectionsDepartments from './LaborProjectionsDepartments';
import LaborProjectionsStandards from './LaborProjectionsStandards';

export default function LaborProjections({selectedLocationId, selectedDepartmentId, selectedLevelOptionId}) {
  if (selectedLocationId && selectedDepartmentId) {
    return <LaborProjectionsStandards selectedLocationId={selectedLocationId} selectedDepartmentId={selectedDepartmentId} />;
  }

  if (selectedLocationId) {
    return <LaborProjectionsDepartments selectedLocationId={selectedLocationId} />;
  }

  if (selectedLevelOptionId !== null && selectedLevelOptionId >= 0) {
    return <LaborProjectionsLocations selectedLevelOptionId={selectedLevelOptionId} />;
  }

  return <LaborProjectionsOrgHierarchies />;
}

LaborProjections.propTypes = {
  selectedLocationId: PropTypes.number,
  selectedDepartmentId: PropTypes.number,
  selectedLevelOptionId: PropTypes.number,
};

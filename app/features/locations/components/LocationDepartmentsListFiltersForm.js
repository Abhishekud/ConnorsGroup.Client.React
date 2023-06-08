import React from 'react';
import {PropTypes} from 'prop-types';
import {Map} from 'immutable';
import {TextInput, Select, HiddenSubmitButton} from '../../forms/components';

export default function LocationDepartmentsListFiltersForm({
  model, locationProfiles, locationParents, departmentName, departments,
  locationName, locationParentName, applying, onFieldChange, onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={applying}>
        <TextInput id="name" label="Name" value={model.get('name')} onChange={onFieldChange} />
        <Select id="locationProfileId" label={`${locationName} Profile`} value={model.get('locationProfileId')}
          onChange={onFieldChange} options={locationProfiles} />
        <Select id="parentOrgHierarchyLevelOptionId" label={locationParentName}
          value={model.get('parentOrgHierarchyLevelOptionId')}
          onChange={onFieldChange} options={locationParents} />
        <Select id="departmentId" label={`${departmentName}`} value={model.get('departmentId')}
          onChange={onFieldChange} options={departments} />
        <HiddenSubmitButton />
      </fieldset>
    </form>
  );
}

LocationDepartmentsListFiltersForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  locationProfiles: PropTypes.array.isRequired,
  departmentName: PropTypes.string.isRequired,
  departments: PropTypes.array.isRequired,
  locationParents: PropTypes.array.isRequired,
  locationName: PropTypes.string.isRequired,
  locationParentName: PropTypes.string.isRequired,
  applying: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

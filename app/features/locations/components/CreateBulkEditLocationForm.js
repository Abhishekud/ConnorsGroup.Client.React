import autoBind from 'react-autobind';
import moment from 'moment';
import {HiddenSubmitButton, Select, withAutoFocusOnEdit, Date} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Checkbox} from 'react-bootstrap';

class CreateEditLocationForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors, onCheckboxChange,
      saving,
      onFieldChange, onSubmit,
      locationParents, locationProfiles,
      locationName, locationParentName, onActiveDateChange, onInactiveDateChange,
    } = this.props;

    const activeDate = model.get('activeDate');
    const inactiveDate = model.get('inactiveDate');
    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          <Checkbox
            id="updateLocationProfileId" disabled={saving}
            checked={model.get('updateLocationProfileId')} onChange={onCheckboxChange}><strong>Update Location Profile</strong></Checkbox>
          <Select
            id="locationProfileId" label={`${locationName} Profile`} value={model.get('locationProfileId')}
            disabled={saving || !model.get('updateLocationProfileId')}
            onChange={onFieldChange}
            options={locationProfiles}
            formValidationErrors={validationErrors} />
          {locationParentName
            ? <div>
              <Checkbox
                id="updateParentOrgHierarchyLevelOptionId" disabled={saving}
                checked={model.get('updateParentOrgHierarchyLevelOptionId')} onChange={onCheckboxChange}><strong>Update {locationParentName}</strong></Checkbox>
              <Select
                id="parentOrgHierarchyLevelOptionId" label={locationParentName}
                value={model.get('parentOrgHierarchyLevelOptionId')}
                disabled={saving || !model.get('updateParentOrgHierarchyLevelOptionId')}
                onChange={onFieldChange}
                options={locationParents}
                formValidationErrors={validationErrors} /></div>
            : null}
          <Checkbox
            id="updateActiveDate" disabled={saving}
            checked={model.get('updateActiveDate')} onChange={onCheckboxChange}><strong>Update Active Date</strong></Checkbox>
          <Date id="activeDate" label="Active Date" value={activeDate === null ? moment(new Date()) : moment(activeDate)}
            onChange={onActiveDateChange} disabled={saving || !model.get('updateActiveDate')}
            formValidationErrors={validationErrors} />
          <Checkbox
            id="updateInactiveDate" disabled={saving}
            checked={model.get('updateInactiveDate')} onChange={onCheckboxChange}><strong>Update Inactive Date</strong></Checkbox>
          <Date id="inactiveDate" label="Inactive Date" value={inactiveDate === null ? moment(new Date()) : moment(inactiveDate)}
            onChange={onInactiveDateChange} disabled={saving || !model.get('updateInactiveDate')}
            formValidationErrors={validationErrors} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateEditLocationForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  locationProfiles: PropTypes.array.isRequired,
  locationName: PropTypes.string.isRequired,
  locationParents: PropTypes.array.isRequired,
  onActiveDateChange: PropTypes.func.isRequired,
  onInactiveDateChange: PropTypes.func.isRequired,
};

export default withAutoFocusOnEdit()(CreateEditLocationForm);

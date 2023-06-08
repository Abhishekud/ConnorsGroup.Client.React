import autoBind from 'react-autobind';
import moment from 'moment';
import {HiddenSubmitButton, TextInput, Select, withAutoFocusOnEdit, Date, TextArea} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class CreateEditLocationForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      saving,
      onFieldChange, onSubmit,
      primaryInputRef, locationParents, locationProfiles,
      locationName, locationParentName, onActiveDateChange, onInactiveDateChange,
      kronosEnabled,
      disabled,
    } = this.props;

    const activeDate = model.get('activeDate');
    const inactiveDate = model.get('inactiveDate');
    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled || saving}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          <TextArea
            id="description" label="Description" maxLength={256} value={model.get('description')}
            onChange={onFieldChange} rows={5}
            formValidationErrors={validationErrors} />
          <Select
            id="locationProfileId" label={`${locationName} Profile`} value={model.get('locationProfileId')}
            onChange={onFieldChange}
            options={locationProfiles}
            formValidationErrors={validationErrors} />
          {locationParentName
            ? <Select
              id="parentOrgHierarchyLevelOptionId" label={locationParentName}
              value={model.get('parentOrgHierarchyLevelOptionId')}
              onChange={onFieldChange}
              options={locationParents}
              formValidationErrors={validationErrors} />
            : null}
          <Date id="activeDate" label="Active Date" value={activeDate === null ? null : moment(activeDate)}
            onChange={onActiveDateChange} disabled={saving}
            formValidationErrors={validationErrors} />
          <Date id="inactiveDate" label="Inactive Date" value={inactiveDate === null ? null : moment(inactiveDate)}
            onChange={onInactiveDateChange} disabled={saving}
            formValidationErrors={validationErrors} />
          {kronosEnabled &&
            <TextArea
              id="kronosSitePath" label="Kronos Site Path" value={model.get('kronosSitePath')}
              onChange={onFieldChange} rows={3}
              formValidationErrors={validationErrors} />}
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
  primaryInputRef: PropTypes.func,
  locationProfiles: PropTypes.array.isRequired,
  locationName: PropTypes.string.isRequired,
  locationParents: PropTypes.array.isRequired,
  onActiveDateChange: PropTypes.func.isRequired,
  onInactiveDateChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default withAutoFocusOnEdit()(CreateEditLocationForm);

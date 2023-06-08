import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, Select, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class CreateEditOrgHierarchyLevelOptionForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      saving,
      onFieldChange, onSubmit,
      selectedOrgHierarchyLevelNumber,
      parentOrgHierarchyLevelOptionSelectListOptions,
      primaryInputRef,
      disabled,
    } = this.props;

    let parentOrgHierarchyLevelOptionSelect = null;

    if (selectedOrgHierarchyLevelNumber > 1) {
      parentOrgHierarchyLevelOptionSelect = (
        <Select
          id="parentOrgHierarchyLevelOptionId" label="Parent Hierarchy Level Option"
          value={model.get('parentOrgHierarchyLevelOptionId')}
          onChange={onFieldChange}
          formValidationErrors={validationErrors}
          options={parentOrgHierarchyLevelOptionSelectListOptions} />
      );
    }

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled || saving}>
          <TextInput
            id="value" label="Value" maxLength={256} value={model.get('value')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          {parentOrgHierarchyLevelOptionSelect}
          <HiddenSubmitButton disabled={disabled} />
        </fieldset>
      </form>
    );
  }
}

CreateEditOrgHierarchyLevelOptionForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  selectedOrgHierarchyLevelNumber: PropTypes.number.isRequired,
  parentOrgHierarchyLevelOptionSelectListOptions: PropTypes.array.isRequired,
  primaryInputRef: PropTypes.func,
};

export default withAutoFocusOnEdit()(CreateEditOrgHierarchyLevelOptionForm);

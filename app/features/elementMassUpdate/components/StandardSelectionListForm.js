import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import {NumericInput, HiddenSubmitButton, TextArea} from '../../forms/components';
import {Checkbox} from 'react-bootstrap';

export default function StandardSelectionListForm({
  model, saving, hasProductionStandards, onFieldChange, onSubmit, onSearch, onCheckboxChange, validationErrors, canManageProduction,
}) {
  const addOn = (<i className="fa fa-search" onClick={onSearch} />);
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={saving}>
        <NumericInput id="newElementId" label="Replacement Element ID"
          value={model.get('newElementId')} autoFocus onChange={onFieldChange}
          formValidationErrors={validationErrors} addOns={addOn} />
        <Checkbox id="replaceDescription" disabled={saving}
          checked={model.get('replaceDescription')} onChange={onCheckboxChange}>
          <strong>Replace description in Standards</strong>
        </Checkbox>
        {hasProductionStandards && !canManageProduction
          ? <div className="warning">
            <strong>Your current permissions prevent the ability to make changes to production and archive standards.</strong>
          </div>
          : null}
        {hasProductionStandards && canManageProduction
          ? <div>
            <p>One or more of the selected Standards are in production.
              This action will create new revisions for these Standards.
              Please supply a revision comment below.</p>
            <TextArea
              id="standardRevisionComment"
              label="Standard Revision Comment"
              value={model.get('standardRevisionComment')}
              disabled={saving}
              maxLength={256}
              onChange={onFieldChange}
              formValidationErrors={validationErrors} />
          </div>
          : null}
        <HiddenSubmitButton />
      </fieldset>
    </form>
  );
}

StandardSelectionListForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  saving: PropTypes.bool.isRequired,
  hasProductionStandards: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  canManageProduction: PropTypes.bool,
};

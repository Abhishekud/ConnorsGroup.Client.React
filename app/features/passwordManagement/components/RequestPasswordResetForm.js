import {LinkContainer} from 'react-router-bootstrap';
import {Button, Panel} from 'react-bootstrap';
import {EmailInput} from '../../forms/components';
import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function RequestPasswordResetForm({model, onFieldChange, onSubmit, submitting, validationErrors}) {
  return (
    <Panel bsStyle="primary" className="request-password-reset-form-panel">
      <form method="POST" onSubmit={onSubmit}>
        <fieldset disabled={submitting}>
          <EmailInput id="email" label="Enter your email address" maxLength={256} value={model.get('email')}
            onChange={onFieldChange} formValidationErrors={validationErrors} />
          <Button bsStyle="primary" type="submit"
            disabled={submitting}>{submitting ? 'Processing...' : 'Submit'}</Button>
          {' '}
          <LinkContainer to="/login">
            <Button disabled={submitting}>Cancel</Button>
          </LinkContainer>
        </fieldset>
      </form>
    </Panel>
  );
}

RequestPasswordResetForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
};

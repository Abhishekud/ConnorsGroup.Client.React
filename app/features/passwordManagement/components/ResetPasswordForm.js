import {LinkContainer} from 'react-router-bootstrap';
import {Button, Panel} from 'react-bootstrap';
import {Map} from 'immutable';
import {PasswordInput} from '../../forms/components';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function ResetPasswordForm({model, onFieldChange, onSubmit, submitting, validationErrors}) {
  return (
    <Panel bsStyle="primary" className="reset-password-form-panel">
      <form method="POST" onSubmit={onSubmit}>
        <fieldset disabled={submitting}>
          <PasswordInput id="password" label="Password" maxLength={50} value={model.get('password')}
            onChange={onFieldChange} formValidationErrors={validationErrors} />
          <PasswordInput id="confirmPassword" label="Confirm Password" maxLength={50} value={model.get('confirmPassword')}
            onChange={onFieldChange} formValidationErrors={validationErrors} />
          <Button bsStyle="primary" type="submit"
            disabled={submitting}>{submitting ? 'Processing...' : 'Reset Password'}</Button>
          {' '}
          <LinkContainer to="/login">
            <Button disabled={submitting}>Cancel</Button>
          </LinkContainer>
        </fieldset>
      </form>
    </Panel>
  );
}

ResetPasswordForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
};

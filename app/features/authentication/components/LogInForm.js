import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import {EmailInput, PasswordInput} from '../../forms/components';
import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function LogInForm({model, onFieldChange, onSubmit, submitting, validationErrors}) {
  return (
    <form method="POST" onSubmit={onSubmit} className="log-in-form">
      <fieldset disabled={submitting}>
        <EmailInput id="email" label="Email" maxLength={256} value={model.get('email')} onChange={onFieldChange}
          formValidationErrors={validationErrors} />
        <PasswordInput id="password" label="Password" maxLength={50} value={model.get('password')}
          onChange={onFieldChange}
          formValidationErrors={validationErrors} />
        <Button bsStyle="primary" type="submit" className="log-in-button"
          disabled={submitting}>{submitting ? 'Logging In...' : 'Log In'}</Button>
        <div className="forgot-password-text">
          <Link to="/request-password-reset">Forgot your password?</Link>
        </div>
      </fieldset>
    </form>
  );
}

LogInForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
};

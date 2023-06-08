import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {Map} from 'immutable';
import {PasswordInput} from '../../forms/components';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class ChangePasswordForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.router.goBack();
  }

  render() {
    const {
      model,
      onFieldChange,
      onSubmit,
      submitting,
      validationErrors,
    } = this.props;

    return (
      <div className="change-password-form-panel">
        <form method="POST" onSubmit={onSubmit}>
          <fieldset disabled={submitting}>
            <PasswordInput id="currentPassword" label="Current Password" maxLength={50} formValidationErrors={validationErrors}
              value={model.get('currentPassword')} onChange={onFieldChange} />
            <PasswordInput id="newPassword" label="New Password" maxLength={50} value={model.get('newPassword')} formValidationErrors={validationErrors}
              onChange={onFieldChange} />
            <PasswordInput id="confirmNewPassword" label="Confirm New Password" maxLength={50} formValidationErrors={validationErrors}
              value={model.get('confirmNewPassword')} onChange={onFieldChange} />
            <Button bsStyle="primary" type="submit"
              disabled={submitting}>{submitting ? 'Processing...' : 'Change Password'}</Button>
            {' '}
            <Button disabled={submitting} onClick={this.handleCancel}>Cancel</Button>
          </fieldset>
        </form>
      </div>
    );
  }
}

ChangePasswordForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  router: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
};

export default withRouter(ChangePasswordForm);
